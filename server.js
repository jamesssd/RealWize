// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

//require("dotenv").config();
var express = require("express");


// app.listen(5000, function(err) {
 
//     if (!err)
//         console.log("Site is live");
//     else console.log(err)
 
// });


//require passport
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4100;


//Passport requirements
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var exphbs = require("express-handlebars");

// Requiring our models for syncing
var db = require("./models");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
 
app.use(session({ secret: "keyboard cat",resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

//===================================================//
// //Test Passport Database

// //Models
// var models = require("./models");
 
// //Sync Database
// models.sequelize.sync().then(function() {
 
//     console.log('Nice! Database looks fine')
 
// }).catch(function(err) {
 
//     console.log(err, "Something went wrong with the Database Update!")
 
// });

//==========END PASSPORT TEST=============//

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/apiRoutes.js")(app);
require("./routes/auth.js")(app,passport);
require("./config/passport.js")(passport, db.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:"+
      PORT
    );
  });
});

//module.exports = app;



