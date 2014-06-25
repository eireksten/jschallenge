"use strict";

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

userSchema.methods.generateHash = function (password, next) {
  bcrypt.hash(password, bcrypt.genSaltSync(8), null, next);
};

userSchema.methods.isValidPassword = function (password, next) {
  bcrypt.compare(password, this.password, next);
};


module.exports = mongoose.model('User', userSchema);