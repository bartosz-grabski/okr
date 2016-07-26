var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
module.exports = function(env, passport, db) {

  var User = require('../../model/user')(db);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {

    User.findOne({
      id : user.id
    }, function(err,user) {
      if (err || !user) {
        done(err,null);
      }
      done(null,user);
    })
  });

  var strategy = new GoogleStrategy({
      clientID: "1065784269880-bh19km3ms01ldplp7gisst8hgc5drfov.apps.googleusercontent.com",
      clientSecret: "VxUgs--ownKIYbNyqfYaoyp9",
      callbackURL: "http://127.0.0.1:8080/auth/google/callback",
      accessType: 'offline',
      approvalPrompt : "force"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        id : profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            id : profile.id,
            accessToken : accessToken,
            refreshToken : refreshToken
          });
          user.save();
        }
        done(err,user);
      });
    }
  );



  passport.use(strategy);


};
