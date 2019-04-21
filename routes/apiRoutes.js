var db = require("../models");
const url = require("url");
module.exports = function (app) {
  //   // Get all examples
  app.get("/", function (req, res) {
    // if req.user is true, that means that the user is logged in
    console.log("REQ.USER ", req.user);
    // if (req.user) {
    console.log("doing login");
    console.log("REQ.USER ", req.user);
    var hbsObject = {
      user: req.user
    };
    res.render("index", hbsObject);
  });//End of app.get(/)

  // POST route for inserting api property data into housings table
  app.post("/api/homeList", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just pass in object houseDetails
    console.log("inserting values");
    //  console.log("going into db",)
    // if(req.body.favouriteKey === 0)
    // {
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
      bathsFullkeyDb: req.body.bathsFullkey,
      bathsHalfDb: req.body.bathsHalf,
      bathDb: req.body.bath,
      bedDb: req.body.bed,
      roomsDb: req.body.rooms,
      heatDb: req.body.heat,
      heatingTypeDb: req.body.heatingTypekey,
      garageDb: req.body.garage,
      parkingSizeDb: req.body.parkingSizekey,
      school1keyDb: req.body.school1key,
      school1RatingkeyDb: req.body.school1Ratingkey,
      school1DistanceDb: req.body.school1Distancekey,
      school2keyDb: req.body.school2key,
      school2RatingkeyDb: req.body.school2Ratingkey,
      school2DistanceDb: req.body.school2Distancekey,
      // school3keyDb: req.body.school3key,
      // school3RatingkeyDb: req.body.school3Ratingkey,
      // school3DistanceDb: req.body.school3Distancekey,
      listedDateDB: req.body.listedDatekey
      // rooms_amenities: req.body.roomsAmenities,
    }).then(function (results) {
      // `results` here would be the newly created row
      res.json(results);
    }).catch(err => {
      throw err;
    });//end of catch
  });//end of post /api/homeList"

  // POST route for inserting favourited homeid and corresponding userid data into users table
  app.post("/api/insertFavourite", function (req, res) {
    db.Favorites.create({
      // propertyIdDb: req.body.homePropId,
      userId: req.body.userId,
      HousingId: req.body.homeId

    }).then(function (resultsFavoriteInsert) {
      // `results` here would be the newly created row
      res.json(resultsFavoriteInsert);
    }).catch(err => {
      throw err;
    });//end of catch

  });//end of post /api/insertFavourite"

  //Delete route for deleting userid and favourited home id from favrite table
  app.delete("/api/deleteFavourite/:user/:house", function (req, res) {
    db.Favorites.destroy({
      where: {
        userId: req.params.user,
        HousingId: req.params.house
      }
    }).then(function (resultsFavoriteDelete) {
      res.json(resultsFavoriteDelete);
    }).catch(err => {
      throw err;
    });//end of catch
  });//end of post /api/deleteFavourite/:id"
  // GET route for getting all of the homeList
  app.get("/api/homeListBasedCity/:cityName", function (req, res) {
    // findAll returns all entries for a table when used with no options
    console.log("i am executing", req.user);
    db.Housing.findAll({
      where: {
        cityDb: req.params.cityName
        // city: "bothell"
        // status: 'active'
      }
    }).then(function (dbProperty) {
      // if the user is logged in
      if (req.user) {
        // console.log("i am exec",dbProperty);
        // We have access to the homeList as an argument inside of the callback function
        var propertyListObject = {
          list: dbProperty,
          user: req.user
        };
        // send back the property list data along with the user object from req.user above
        res.render("search", propertyListObject);
      } else {
        var propertyListObject = {
          list: dbProperty
        };
        // if they're not logged in, only send back the property data object
        res.render("search", propertyListObject);
      }
    }).catch(err => {
      throw err;
    });//end of db.Housing.findAll.then
    // {list: cleanArray}
  });//end of app.get(/api/homeListBasedCity/:cityName")
  // GET route for getting all of the saved favorited homeList
  app.get("/api/favorites/:id", function (req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Favorites.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Housings]
    }).then(function (dbSaved) {
      var savedListObject = {
        savedList: dbSaved
        // user: req.user
      };
      res.render("saved", savedListObject);
    });
  });
};//end of module.exports