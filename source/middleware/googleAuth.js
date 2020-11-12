// const passport = require('./bearer');

// module.exports = passport.authenticate('bearer', { session: false })

const passport = require('./google');

module.exports = passport.authenticate('google', { scope: ['profile'] });
