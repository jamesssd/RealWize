 var db = require("../models");

 module.exports = function(app) {
//   // Get all examples
   app.get("/", function(req, res) {
    //db.Example.findAll({}).then(function(dbExamples) {
        var hbsObject = {
            // value: "hello"
           
          };
        res.render("index", hbsObject);
    //});
  });


  // POST route for saving a new todo
  app.post("/api/homeList", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just pass in object houseDetails
    db.Housing.create({
        address: req.body.homeAddress,
        Year_built: req.body.yearBuilt,
        lot_size: req.body.lotSize,
        propclass: req.body.propClass,
        date_listed: req.body.date_listed,
        rooms_amenities: req.body.roomsAmenities,
     }).then(function(results) {
        // `results` here would be the newly created row
        //res.redirect("/api/homeList");
        //res.end();
        res.json(results);
      }).catch(err => {
        
      })
   });

  // GET route for getting all of the homeList
  app.get("/api/homeList", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Housing.findAll({}).then(function(dbProperty) {
        
      // We have access to the homeList as an argument inside of the callback function
      var propertyListObject = {
        list: dbProperty
       
      };
      
      console.log("from db server side"+dbProperty);
      //res.json(dbProperty);
      res.render("index", propertyListObject);
    });
  });

}


