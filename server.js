var express = require('express');
var routes = require('./routes/index');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var User = require('./models/User');
var passport = require('passport');
var app = express();
var router = express.Router();
var config = require('./config');

var requestProxy = require('express-request-proxy');

app.get('/pfapi/pets', requestProxy({
    url: 'http://api.petfinder.com/pet.find',
    query: {
      key: config.pfAPI,
      format: 'json',
      output: 'full'
    }
}));

app.set('port', config.port);
app.set('env', process.env.NODE_ENV);

app.use((req, res, next) => {
  const url = '*';
  res.header('Access-Control-Allow-Origin', url);
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

app.use(express.static(__dirname + '/www'));

app.use(require('express-session')({
  secret: config.expressSecret,
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

mongoose.connect(config.dbURI);
console.log(config.dbURI);

// Basic routes -- routes/index.js
app.use('/', routes);

app.use(router);

app.listen(config.port, function() {
  console.log('Express server listening on port', config.port);
});
