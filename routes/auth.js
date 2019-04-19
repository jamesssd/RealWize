var authController = require("../controllers/authcontroller.js");
var passport = require("../config/passport.js");

module.exports = function (app, passport) {

  app.post("/signup", passport.authenticate("local-signup", {

    successRedirect: "./index",
    failureRedirect: "./failed"
  }
  ));


  // app.get('/signin', authController.signin);

  app.post("/", passport.authenticate("local-signin", {
    successRedirect: "/index",
    failureRedirect: "/failed"
  }
  ));

  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/index",
    failureRedirect: "/failed"
  }
  ));


  app.get("/", isLoggedIn, authController.index);

  app.get("/index", isLoggedIn, authController.index);


  // app.get('/logout',authController.logout);

  // app.get('/failed', 

<<<<<<< HEAD
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/'
  }
  ));
=======
  app.get("/", authController.signin), {
>>>>>>> 2bab68e4d5873d08e11db2bdae8a8bdc1222a558

    successRedirect: "index",
    failureRedirect: "/failed"
  };



  app.get("/", authController.logout), {

    successRedirect: "index",
    failureRedirect: "/failed"
  };

  app.get("/username",
  
    function (req, res) {
      if (req.user) {

        res.json(req.user.firstname);

      }
    
      else {res.json("false");
    
        // db.User.findOne ()

      }

    });

};


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect("/index");
}

