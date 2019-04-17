var db = require("../models");
const url = require("url");    


module.exports = function(app) {
  //   // Get all examples
  app.get("/", function(req, res) {
      // if req.user is true, that means that the user is logged in
      if(req.user){
        console.log("REQ.USER ", req.user);
        var hbsObject = {
          user: req.user
        };
        res.render("index", hbsObject);
      }else{
        res.render("index");
      }
    // console.log("Findall DATA: ", dbExamples)
    // var hbsObject = {
    //   user: "hello",
    //   list: dbExamples
    // };
    
  });//End of app.get(/)

  //********* We need following commented codes for inserting values from api to database*************
  // POST route for saving a new todo
  app.post("/api/homeList", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just pass in object houseDetails
    console.log("inserting values");
    //  console.log("going into db",)
    db.Housing.create({
      // propertyIdDb: req.body.homePropId,
      addressDb: req.body.address,
      cityDb: req.body.citykey,
      priceDb: req.body.priceKey,
      lotDb: req.body.lotkey,
      propertyDb: req.body.propertyClasskey,
      propertySubtypeDb: req.body.propertySubtypekey,
      yearBuiltDb: req.body.yearBuiltkey,
      numberOfLevelsDb: req.body.numberOfLevelskey,
      bathsFullkeyDb:req.body.bathsFullkey,
      bathsHalfDb: req.body.bathsHalf,
      bathDb: req.body.bath,
      bedDb: req.body.bed,
      roomsDb: req.body.rooms,
      heatDb: req.body.heat,
      heatingTypeDb: req.body.heatingTypekey,
      garageDb: req.body.garage,
      parkingSizeDb:req.body.parkingSizekey,
      school1keyDb: req.body.school1key,
      school1RatingkeyDb: req.body.school1Ratingkey,
      school1DistanceDb: req.body.school1Distancekey,
      school2keyDb: req.body.school2key,
      school2RatingkeyDb: req.body.school2Ratingkey,
      school2DistanceDb: req.body.school2Distancekey,
      school3keyDb: req.body.school3key,
      school3RatingkeyDb: req.body.school3Ratingkey,
      school3DistanceDb: req.body.school3Distancekey,
      listedDateDB: req.body.listedDatekey

      // rooms_amenities: req.body.roomsAmenities,
    }).then(function(results) {
      // `results` here would be the newly created row
        
      res.json(results);
    }).catch(err => {
      throw err;
    });//end of catch
  });//end of post /api/homeList"
  //********* Above code - comment until above line*****************************
 
  // GET route for getting all of the homeList
  app.get("/api/homeListBasedCity/:cityName", function(req, res) {
    // findAll returns all entries for a table when used with no options
    // console.log("i am executing"+cityName);
    db.Housing.findAll({
      where: {
        cityDB: req.params.cityName
        // city: "bothell"
        // status: 'active'
      }
    }).then(function(dbProperty) {
      console.log("i am exec"+req.params.cityName);
      // We have access to the homeList as an argument inside of the callback function
      var propertyListObject = {
        list: dbProperty
      };//End of var propertyListObject
     
      
      //  console.log("from db server side",dbProperty);

        // let cleanArray = [];
        // for (let i = 0; i < dbProperty.length; i++) {
        //   cleanArray.push(dbProperty[i].dataValues)
        // }
        // console.log("CLEAN ARRAY: ", cleanArray)
        // res.json(dbProperty);
        // res.render("index",citytest);
         res.render("search",propertyListObject );
        
    });//end of db.Housing.findAll.then
    // {list: cleanArray}
  });//end of app.get(/api/homeListBasedCity/:cityName")

};//end of module.exports