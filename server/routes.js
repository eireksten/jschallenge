"use strict";

module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    res.render('login', {
      message: req.flash('loginmessage')
    });
  });

  app.get('/signup', function (req, res) {
    res.render('signup', {
      message: req.flash('signupmessage')
    });
  });

  app.get('/challenge', isLoggedIn, function (req, res) {
    res.render('challenge', {
      user: req.user
    });
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });


  app.post('/login', passport.authenticate('login', {
    successRedirect: '/challenge',
    failureRedirect: '/'
  }));

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/challenge',
    failureRedirect: '/signup'
  }));

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}