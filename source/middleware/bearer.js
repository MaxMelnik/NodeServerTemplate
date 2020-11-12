const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const db = require('../db'); 

module.exports = passport.use(new Strategy(
    function (token, next) {
        db.users.findByToken(token, function (err, user) {
            if (err) { return next(err); } //catch err
            if (!user) { return next(null, false); } //user with token not found
            return next(null, user); //user found
        });
    }));