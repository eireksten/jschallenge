// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(function(username, password, done) {
    return done(null, {username: username});
  }));

};