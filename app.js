var gaikan = require('gaikan');
var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy

// Facebook app information
const FB_ID = '228372603994396';
const FB_APP_SECRET = '2c1f90d06c463e11f0ddfe4353c96a73';
const FB_CALLBACK_URL = 'http://localhost:3000/auth/facebook/callback';

// Necessary for saving users across sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: FB_ID,
        clientSecret: FB_APP_SECRET,
        callbackURL: FB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, getUser(profile.id) || addUser(profile));
    }
));

// In memory storage for users. Will be changed to a database
var users = {};

// Retrieve a user from storage
function getUser(userID) {
    return users[userID];
}

// Add a user to storage
function addUser(profile) {
    users[profile.id] = profile;
    return getUser(profile.id);
}

var app = express();
app.configure(function(){
    // Use Gaikan as the HTML view renderer
    app.engine('html', gaikan);
    app.set('view engine', 'html');

    // Set up passport magic
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ 'secret': 'whisper' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});

// Authetication routes
app.get('/auth/facebook',
        passport.authenticate('facebook'),
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
    res.locals = {user: req.user};
    res.render('index');
});

app.listen(3000);
