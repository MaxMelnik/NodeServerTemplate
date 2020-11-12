const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../db');

module.exports = passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: config.baseUrl.concat('/auth/google/callback')
},
    function (accessToken, refreshToken, profile, done) {
        db.users.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log('user:', user);
            return done(err, user);
        });
    }
));