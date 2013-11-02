var gaikan = require('gaikan');
var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var graph = require('fbgraph');

// Facebook app information
const FB_ID = '228372603994396';
const FB_APP_SECRET = '2c1f90d06c463e11f0ddfe4353c96a73';
const FB_CALLBACK_URL = 'http://localhost:3000/auth/facebook/callback';

// Necessary for saving users across sessions
passport.serializeUser(function(user, done) {
    done(null,user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FB_ID,
    clientSecret: FB_APP_SECRET,
    callbackURL: FB_CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {
        var user = getUser(profile.id) || addUser(profile);
        graph.setAccessToken(accessToken);
        graph.get(profile.id + '/friends', function(err, res) {
            // At some point, we will have to unpaginate this and filter
            // friends down to those who have registered.
            if (err) {
                console.log(err);
            }
            user.friends = res.data;
            updateUser(user);
            return done(null, user);
        });
    }
));

// In memory storage for users. Will be changed to a database
var users = {};
var post_id = 0;
// Retrieve a user from storage
function getUser(userID) {
    return users[userID];
}

// Add a user to storage
function addUser(profile) {
    users[profile.id] = profile;
    users[profile.id].posts = [];
    return getUser(profile.id);
}

// Updates a users info
function updateUser(profile) {
    users[profile.id] = profile;
}

// Finds user from givenName
function findName(givenName){
    for(var ids in users){
	if(givenName==users[ids].name.givenName)
	    return user2 = users[ids]
    }
}


var app = express();
app.configure(function(){
    // Use Gaikan as the HTML view renderer
    app.engine('html', gaikan);
    // app.set('views', __dirname + '/views');
    app.set('view engine', 'html');

    

    // Set up passport magic
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ 'secret': 'whisper' }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    var path = require('path');
    //indicate directory of static files
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

// Authetication routes
app.get('/auth/facebook',
        passport.authenticate('facebook',{scope: ['user_friends','read_friendlists','user_status']}),
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
    res.render('index', {user: req.user});
});

app.get('/user/:user_id', function(req, res) {
    // FIXME: This needs to work...
    if (!req.user) {
        res.redirect('/');
    }
    var user = getUser(req.params.user_id);
    // TODO: Check if this user is in the friends list of the current user.
    // If not, then we probably want to redirect back to index.
    res.render('profile', {user: user,posts: user.posts});
});
app.post('/wallpost/:user_id', function(req, res) {
     post_id++;
     users[req.params.user_id].posts[post_id]={'time':new Date(),'user':req.user.name.givenName,'text':req.body['post']};
     var user = getUser(req.params.user_id);
     res.redirect('/user/'+user.id);
});

app.listen(3000);
