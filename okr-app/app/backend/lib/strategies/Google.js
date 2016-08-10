var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
module.exports = function(env, passport, config) {


  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null,user);
  });

  var strategy = new GoogleStrategy({
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: config.auth.google.callbackURL
      //responseType : "token"
    },
    function(accessToken, refreshToken, profile, done) {

      console.log(profile);

      var user = {
            displayName : profile.displayName,
            email : profile.emails[0].value,
            accessToken : accessToken
      };

      done(null,user);
    }
  );



  passport.use(strategy);


};
