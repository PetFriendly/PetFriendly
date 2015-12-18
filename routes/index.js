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
    console.log('Received Register POST from CLIENT');
    User.register(new User({
      username : req.body.username,
      zipcode: req.body.zipcode,
      settings: {
        animal: '',
        size: '',
        sex: '',
        age: ''
      }
    }), req.body.password, function(err, account) {
        if (err) {
          console.log('register ERROR....')
          return res.json({'alert':'Sorry. That username already exists. Try again.'});
        } 
        passport.authenticate('local')(req, res, function () {
          //res.json({'message': 'Success'});
          res.send({user: account});
        });
    });
});

// router.get('/login', function(req, res) {
//   if (req.isAuthenticated()) res.redirect('/dashboard');
//   res.render('login', { user: req.user, loginErr: req.session.loginErr });
// });

router.post('/login', function(req, res, next) {
  console.log('Received Login POST from CLIENT');
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
      //return res.end();
      return res.send({user : req.user}); 
    });
  })(req, res, next);
});

router.put('/settings/:id', function(req, res, next) {
  console.log('Received Settings PUT from CLIENT');
  if (!req.isAuthenticated()) {
    console.log('User is NOT logged in; cannot update Settings');
    return res.redirect('/#/login');
  } 
  console.log('user id', req.params.id);
  console.log('settings', req.body.settings);

  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    } else {
      for (var prop in req.body.settings) {
        user.settings[prop] = req.body.settings[prop];
      }

      user.save(function(err) {
        if (err) {
          return next(err);
        } else {
          res.send({user : user});
        }
      });
    }
  });

});

// router.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
