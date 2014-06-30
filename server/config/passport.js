"use strict";

var LocalStrategy   = require('passport-local').Strategy;
var User = require('../model/user.js');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function (req, username, password, done) {
    User.findOne({username: username}, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, false, req.flash('signupmessage', "User already exists!"));
      }

      var newuser = new User();

      newuser.username = username;
      newuser.generateHash(password, function (err, hash) {
        if (err)return done(err);

        newuser.password = hash;
        newuser.save(function (err) {
          if (err)throw err;
          return done(null, newuser);
        });

      });
    });
  }));

  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {

    User.findOne({username: username}, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        user.isValidPassword(password, function (err, valid) {
          if (err)return done(err);
          if (valid) {
            return done(null, user);
          }
          return done(null, false, req.flash('loginmessage', "Invalid user name!"));
        });
      } else {
        return done(null, false, req.flash('loginmessage', "Invalid user name or password!"));  
      }

    });
  }));

};