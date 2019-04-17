//LOCAL SIGNIN
var passport = require ("passport");
var LocalStrategy = require ("passport-local").Strategy;


passport.use("local-signin", new LocalStrategy(
 
  {
 
    // by default, local strategy uses username and password, we will override with email
 
    usernameField: "email",
 
    passwordField: "password",
 
    passReqToCallback: true // allows us to pass back the entire request to the callback
 
  },
 
 
  function(req, email, password, done) {
 
    var User = user;
 
    var isValidPassword = function(userpass, password) {
 
      return bCrypt.compareSync(password, userpass);
 
    };
 
    User.findOne({
      where: {
        email: email
      }
    }).then(function(user) {
 
      if (!user) {
 
        return done(null, false, {
          message: "Email does not exist"
        });
 
      }
 
      if (!isValidPassword(user.password, password)) {
 
        return done(null, false, {
          message: "Incorrect password."
        });
 
      }
 
 
      var userinfo = user.get();
      return done(null, userinfo);
 
 
    }).catch(function(err) {
 
      console.log("Error:", err);
 
      return done(null, false, {
        message: "Something went wrong with your Signin"
      });
 
    });
 
 
  }
 
));

module.exports = passport;

