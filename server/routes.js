"use strict";

module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/challenge', isLoggedIn, function (req, res) {
    res.render('challenge');
  });

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/challenge',
    failureRedirect: '/'
  }));

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/challenge',
    failureRedirect: '/'
  }));

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}