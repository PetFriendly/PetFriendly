var express = require('express');
var routes = require('./routes/index');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Pet = require('./models/Pet');
var User = require('./models/User');
var passport = require('passport');
var app = express();
var router = express.Router();
var dbURI = require('./config').dbURI;
var port = process.env.PORT || 3000;

var requestProxy = require('express-request-proxy');

app.get('/pfapi/pets', requestProxy({
    url: "http://api.petfinder.com/pet.find",
    query: {
      key: 'f7940f8a4ac510a56c2b8bebbd6df0ce',
      format: 'json',
      output: 'full'
    }
}));

app.set('port', port);
app.set('env', process.env.NODE_ENV);

app.use( ( req, res, next ) => {
  const url = '*';
  res.header( 'Access-Control-Allow-Origin', url );
  res.header( 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
  next();
});

var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

app.use(express.static(__dirname + '/www'));

app.use(require('express-session')({
  secret: 'I love pets',
  resave: false,
  saveUninitialized: false,
}));

//Set up Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use(function (req, res, next) {
//     if (req.isAuthenticated()) res.expose(req.user, 'user');
//     next ();
// });

app.use(bodyParser.json());
app.use(methodOverride());

// Set PF_USE_LOCAL_DB=1 for local DB,
// otherwise app will by default use MONGOLAB DB
if (process.env.PF_USE_LOCAL_DB == true) {
  mongoose.connect('mongodb://localhost/pet_app');
  console.log('Connecting to local database...');
} else {
  //mongoose.connect(process.env.MONGOLAB_URI);
  mongoose.connect('mongodb://heroku_vs2nd9mc:73s2p4slp257li6ftg6qh7jjnr@ds029615.mongolab.com:29615/heroku_vs2nd9mc');
  // mongoose.connect(dbURI);
  console.log('Connecting to MongoLab database...');
}

// Basic routes -- index.js
app.use('/', routes);

//Pet is going to send to route '/Pets'. 
//http methods are going to save to db collection pets
restify.serve( router, Pet);

app.use(router);

app.listen(port, function () {
  console.log('Express server listening on port', port)
});
