var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models")

passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  function (username, password, done) {
    

    db.User.findOne({
      where: {
        username: username
      }
    }).then(function (dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      delete dbUser.dataValues.password
      return done(null, dbUser)

    });
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
