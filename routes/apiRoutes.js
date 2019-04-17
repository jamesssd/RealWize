 var db = require("../models");
 const url = require('url');    


 module.exports = function(app) {
 //   // Get all examples
 app.get("/", function(req, res) {

      res.render("index");
  // });
});
   app.get("/", function(req, res) {
    // db.Housing.findAll({}).then(function(dbExamples) {
    console.log("REQ.QUERY: ", req.query.list)
    // console.log("Findall DATA: ", dbExamples)
        var hbsObject = {
            // value: "hello"
            //list: dbExamples
          };
        res.render("search", hbsObject);
    // });
  });


  // POST route for saving a new todo
  app.post("/api/homeList", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just pass in object houseDetails
    db.Housing.create({
        address: req.body.homeAddress,
        city: req.body.cityName,
        Year_built: req.body.yearBuilt,
        lot_size: req.body.lotSize,
        propclass: req.body.propClass,
        date_listed: req.body.date_listed,
        rooms_amenities: req.body.roomsAmenities,
     }).then(function(results) {
        // `results` here would be the newly created row
        
        res.json(results);
      }).catch(err => {
        
      })//end of catch
   });//end of post /api/homeList"

  // GET route for getting all of the homeList
  app.get("/api/homeListBasedCity/:cityName", function(req, res) {
    // findAll returns all entries for a table when used with no options
    // console.log("i am executing"+cityName);
    db.Housing.findAll({
      where: {
        city: req.params.cityName
        // city: "bothell"
        // status: 'active'
      }
  }).then(function(dbProperty) {
    console.log("i am exec"+req.params.cityName);
    // var cityPassingTohandleBar = [
    //   { cityInHandlebarname: "seattle"}
    // ]
    // console.log("testing city"+cityPassingTohandleBar);
      // We have access to the homeList as an argument inside of the callback function
      var propertyListObject = {
        citykey: req.params.cityName,
        // citykey: "cityPassingTohandleBar",
        list: dbProperty
         
       
      };
      // var citytest = {
      // citykey: "seattle"
      // }
      
      //  console.log("from db server side",dbProperty);

        // let cleanArray = [];
        // for (let i = 0; i < dbProperty.length; i++) {
        //   cleanArray.push(dbProperty[i].dataValues)
          
        // }

        // console.log("CLEAN ARRAY: ", cleanArray)
        // res.json(dbProperty);
        // res.render("index",citytest);
         res.render("search",propertyListObject );
        
    });
    // {list: cleanArray}
  })

 }