var gaikan = require('gaikan');
var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var graph = require('fbgraph');
var path = require('path');
var mongoose = require('mongoose');

// Set up the database
mongoose.connect('mongodb://localhost/photoapp');
var user_schema = mongoose.Schema({
    _id: Number,
    first_name: String,
    last_name: String,
    last_updated: Number,
    friends: [{ _id: String, name: String }],
    posts: [{ text: String}]
});

var User = mongoose.model('User', user_schema);

// Retrieve a user from storage
function getUser(user_id, done) {
    User.findOne({ _id: user_id }, function(err, user) {
        done(null, user);
    });
}

// Add a user to storage
function addUser(profile) {
    var user = {
        _id: profile.id,
        first_name: profile.displayName.firstName,
        last_name: profile.displayName.lastName,
        friends: [],
        posts: [],
    };
    User.save(user);
    return user;
}

// Updates a users info
function updateUser(profile) {
    User.update({ _id: profile.id }, profile, function() {
        // Don't need to do anything
    });
}

// Facebook app information
const FB_ID = '228372603994396';
const FB_APP_SECRET = '2c1f90d06c463e11f0ddfe4353c96a73';
const FB_CALLBACK_URL = 'http://localhost:3000/auth/facebook/callback';

// Necessary for saving users across sessions
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    getUser(id, function(err, user) {
        done(null, user);
    });
});

function updateFriends(user, accessToken, done) {
    // Only update friends once an hour
    const MILLIS_IN_HOUR = 3600000;
    if (new Date() - user.last_updated < MILLIS_IN_HOUR) {
        return done(null, user);
    } else {
        graph.setAccessToken(accessToken);
        graph.get(user._id + '/friends', function(err, res) {
            // At some point, we will have to unpaginate this and filter
            // friends down to those who have registered.
            if (err) {
                return done(err, user);
            }
            user.friends = res.data;
            updateUser(user);
            return done(null, user);
        });
    }

}

passport.use(new FacebookStrategy({
    clientID: FB_ID,
    clientSecret: FB_APP_SECRET,
    callbackURL: FB_CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {
        getUser(profile.id, function(err, user) {
            if (!user) {
                addUser(profile);
            } else {
                return updateFriends(user, accessToken, done);
            }
        });
    }
));


var app = express();
app.configure(function(){
    // Use Gaikan as the HTML view renderer
    app.engine('html', gaikan);
    app.set('view engine', 'html');

    // Set up passport magic
    app.use(express.cookieParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.session({ 'secret': 'whisper' }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Indicate directory of static files
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);

});

// Authetication routes
app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: ['user_friends', 'read_friendlists', 'user_status'] }),
        function(req, res) {
           // This is Facebook's job -- do nothing
        });

app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) {
            res.redirect('/');
        });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Site routes
app.get('/', function(req, res) {
    if (req.user) {
        res.render('index', {user: req.user});
    } else {
        res.render('index');
    }
});

app.get('/user/:user_id', function(req, res) {
    if (req.user) {
        if (req.user._id === req.params.user_id) {
            // Render user profile
            res.render('profile', { user: user, posts: user.posts });
        } else {
            getFriend(user, friend_id, function(err, friend) {
                if (friend) {
                    res.render('profile', { user: friend, posts: friend.posts });
                } else {
                    res.status(404).send('Not found');
                }
            });
        }
    }
    res.redirect('/', 401);
});

app.post('/user/:user_id/', function(req, res) {
    if (!req.user) {
        res.redirect('/', 401);
    } else {
        var post = {
            time: new Date(),
            sender: user._id,
            recipient: req.params.user_id,
            text: req.body['post']
        };
        addPost(post);
        res.redirect('/user/' + user.id);
    }
});

app.listen(3000);
