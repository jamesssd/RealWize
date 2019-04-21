var exports = module.exports = {};
 
 
exports.signup = function(req, res) {
 
  res.render("signup");
 
};
 
exports.signin = function(req, res) {
 
  res.render("main");
 
};
 
 
exports.index = function(req, res) {
 
  res.render("index");
 
};

exports.logout = function(req, res) {
 
  req.session.destroy(function(err) {
 
    res.redirect("index");
 
  });
};

exports.failed = function (req, res) {

  res.redirect("/failed");

};


