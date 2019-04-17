<<<<<<< HEAD
var authController = require("../controllers/authcontroller.js");
var passport = require("../config/passport.js");

module.exports = function (app, passport) {

  app.get('/signup', authController.signup);


  app.get('/signin', authController.signin);


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }
  ));


  app.get('/dashboard', isLoggedIn, authController.dashboard);


  // app.get('/logout',authController.logout);


  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
  }
  ));


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/signin');
  }


=======
var authController = require('../controllers/authcontroller.js');
var passport = require("../config/passport.js");

module.exports = function (app, passport) {
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    })
    );
>>>>>>> 5816a62f7a4ea694b1d950d1957c10c4563cd55a
}
