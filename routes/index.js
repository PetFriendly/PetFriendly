var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   if (req.isAuthenticated()) res.redirect('/dashboard');
//   res.render('index', { user: req.user});
// });

router.get('/#/register', function(req, res, next) {
  console.log('Checking if user is already logged in');
  if (req.isAuthenticated()) {
    console.log('User is already logged in');
    res.redirect('/#/tab/settings');
  }
});

router.post('/register', function(req, res) {
    User.register(new User({
      username : req.body.username,
      zipcode: '97007' 
    }), req.body.password, function(err, account) {
        if (err) {
          console.log('register ERROR....')
          return res.json({'alert':'Sorry. That username already exists. Try again.'});
        } 
        passport.authenticate('local')(req, res, function () {
          //res.json({'message': 'Success'});
          res.end();
        });
    });
});

// router.get('/login', function(req, res) {
//   if (req.isAuthenticated()) res.redirect('/dashboard');
//   res.render('login', { user: req.user, loginErr: req.session.loginErr });
// });

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      console.log('ERROR received POST req');
      return next(err); }
    if (!user) {
      return res.json({'alert':'Sorry. That username or password are invalid. Try again.'});
    }
    req.logIn(user, function(err) {
      if (err) { 
        return res.json({'alert':'Sorry. That username or password are invalid. Try again.'});
      } 
      return res.end();
    });
  })(req, res, next);
});

// router.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
