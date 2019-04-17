var authController = require('../controllers/authcontroller.js');
var passport = require("../config/passport.js");

module.exports = function (app, passport) {
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    })
    );
}
