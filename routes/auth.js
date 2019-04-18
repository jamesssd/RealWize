var authController = require("../controllers/authcontroller.js");
var passport = require("../config/passport.js");

module.exports = function (app, passport) {

app.post('/signup', passport.authenticate('local-signup',  { 
    
    successRedirect: '/dashboard',
    failureRedirect: '/failed'}
                                                    ));


// app.get('/signin', authController.signin);

app.post('/signin', passport.authenticate('local-signin',  { 
    successRedirect: '/dashboard',
    failureRedirect: '/failed'}
                                                    ));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }
  ));


app.get('/dashboard',isLoggedIn, authController.dashboard);

  app.get('/dashboard', isLoggedIn, authController.dashboard);


  // app.get('/logout',authController.logout);

// app.get('/failed', 
                                                    
app.get('/logout',authController.logout), {

successRedirect: "/dashboard",
failureRedirect: "/failed"}

}


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/main');
}

