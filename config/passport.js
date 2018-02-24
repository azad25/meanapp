const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('payload received: ', jwt_payload);
    user.getUserById(jwt_payload, (err, user) => {
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      }else {
        return done(null, false);
      }
    });
  }));
}
