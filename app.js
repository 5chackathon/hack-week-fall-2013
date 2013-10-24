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
    users[profile.id].friends = {
    "data": [
      {
        "name": "Daniel Liam Walsh", 
        "id": "60602230"
      }, 
      {
        "name": "Austin Huang", 
        "id": "501465302"
      }, 
      {
        "name": "Kylan Nieh", 
        "id": "508039156"
      }, 
      {
        "name": "Christine Cheng", 
        "id": "508662523"
      }, 
      {
        "name": "Jennifer Kim", 
        "id": "509661846"
      }, 
      {
        "name": "Stephanie Yi", 
        "id": "511637312"
      }, 
      {
        "name": "Brian Lee", 
        "id": "514213445"
      }, 
      {
        "name": "Joanna Chow", 
        "id": "517010264"
      }, 
      {
        "name": "Jeff Liu", 
        "id": "520096461"
      }, 
      {
        "name": "Arthur Liou", 
        "id": "520329637"
      }, 
      {
        "name": "Cindy Chao", 
        "id": "520412883"
      }, 
      {
        "name": "Richard Ducker", 
        "id": "521108497"
      }, 
      {
        "name": "Soo Song", 
        "id": "522963482"
      }, 
      {
        "name": "Edwin Liao", 
        "id": "523213711"
      }, 
      {
        "name": "Celeste Melamed", 
        "id": "525105846"
      }, 
      {
        "name": "Alyssa Vargas", 
        "id": "526198674"
      }, 
      {
        "name": "Shashank Agrawal", 
        "id": "527917127"
      }, 
      {
        "name": "Kevin Wu", 
        "id": "527931447"
      }, 
      {
        "name": "Nithya Thangaraj", 
        "id": "529007631"
      }, 
      {
        "name": "Marissa Chou", 
        "id": "529162240"
      }, 
      {
        "name": "Ui Iu", 
        "id": "529817543"
      }, 
      {
        "name": "Andy Russell", 
        "id": "530368379"
      }, 
      {
        "name": "Natasha Yeh", 
        "id": "532125387"
      }, 
      {
        "name": "Jonathan Poon", 
        "id": "534858713"
      }, 
      {
        "name": "Mingyu Hu", 
        "id": "537349216"
      }, 
      {
        "name": "Tim Nguyen", 
        "id": "538531667"
      }, 
      {
        "name": "Sid Kathiresan", 
        "id": "541089316"
      }, 
      {
        "name": "Amanda Su", 
        "id": "541763413"
      }, 
      {
        "name": "Warren Lee", 
        "id": "542615304"
      }, 
      {
        "name": "Gary Chang", 
        "id": "542821352"
      }, 
      {
        "name": "Lisa Chang", 
        "id": "545710775"
      }, 
      {
        "name": "Jesse Pollak", 
        "id": "546570578"
      }, 
      {
        "name": "Rebecca Tsai", 
        "id": "546833752"
      }, 
      {
        "name": "Jason Jin", 
        "id": "547099063"
      }, 
      {
        "name": "Tammy Tseng", 
        "id": "547844794"
      }, 
      {
        "name": "Michael Z Hwang", 
        "id": "548159017"
      }, 
      {
        "name": "Obadiah Wright", 
        "id": "549856617"
      }, 
      {
        "name": "Anthony Kang", 
        "id": "551893021"
      }, 
      {
        "name": "Tony Hung", 
        "id": "553016597"
      }, 
      {
        "name": "Tiffany Leong", 
        "id": "553270001"
      }, 
      {
        "name": "Kenta Akaogi", 
        "id": "553300959"
      }, 
      {
        "name": "Daniel Chiou", 
        "id": "553303915"
      }, 
      {
        "name": "Thomas Denq", 
        "id": "555386536"
      }, 
      {
        "name": "Rohan Chandra", 
        "id": "560196631"
      }, 
      {
        "name": "David Nam", 
        "id": "560768470"
      }, 
      {
        "name": "Jennifer Xu", 
        "id": "560943838"
      }, 
      {
        "name": "Joshua Michael", 
        "id": "561847310"
      }, 
      {
        "name": "Jeremy Chua", 
        "id": "562695715"
      }, 
      {
        "name": "Angela Chen", 
        "id": "562872309"
      }, 
      {
        "name": "Grant Lam", 
        "id": "566074785"
      }, 
      {
        "name": "Lakshmi Subbaraj", 
        "id": "566253364"
      }, 
      {
        "name": "Wells Lin", 
        "id": "566353682"
      }, 
      {
        "name": "Leah Tsao", 
        "id": "566747754"
      }, 
      {
        "name": "Leslie Chan", 
        "id": "566761913"
      }, 
      {
        "name": "Diane Yang", 
        "id": "566772665"
      }, 
      {
        "name": "Stepfanie Lam", 
        "id": "566907097"
      }, 
      {
        "name": "Monica Chitre", 
        "id": "567202882"
      }, 
      {
        "name": "Nicholas Murphy", 
        "id": "567281403"
      }, 
      {
        "name": "Caroline Dang", 
        "id": "567393796"
      }, 
      {
        "name": "Vyas Ramasubramani", 
        "id": "567730776"
      }, 
      {
        "name": "Larry Zhong", 
        "id": "568861720"
      }, 
      {
        "name": "Linda Shih", 
        "id": "571187757"
      }, 
      {
        "name": "Kenny Chin", 
        "id": "571234857"
      }, 
      {
        "name": "Yicheng Sun", 
        "id": "571257948"
      }]}
    return getUser(profile.id);
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
    res.locals = {user: req.user};
    res.render('index');
});

app.get('/:user', function(req,res) {
    temp = req.params.user
    var user2 = findName(temp);
    res.locals = {user: user2}
    res.render('profile');
    console.log(user2);
});

app.listen(3000);
