# project_2 - RealWize

This is a real estate website which will allow users to search properties based on city and will allow users to favorite the homes they like.

## Instructions:
API which provides all the property information is having a limit on the user requests.
So when the user serches property based on city, user request will be hitting our databse instead of directly hitting the API, so that user requests can be served unlimited without any interruption. Right now our database is having property details for limited cities. So search functionality will only work for following cities since our database  have property details for following cities:
* bothell
* redmond
* edmonds
* federal way
* lynnwood
* baltimore
* vancouver
* bellingham
* olympia
* issaquah
* woodinville
* mukilteo
* sequim
* tacoma
* denver
* austin
* miami
* jacksonville
* salt lake city
* charleston
* pittsburgh
* cleveland

## features provided:
* User can signup or login if already signedup
* After signing up or logging in, users can serch list of properties available for buying by serching with cityname
* On hovering over each home, current market price and address of thehome will be displayed.
* On clicking price, details of that propety will be displayed like 
- price 
- bedbath 
- lotsize 
- property type 
- year built 
- number of levels 
- total rooms 
- heating 
- Garage information 
- list of schools

* Also users can favorite and unfavorite the homes they like by clicking the favorite icon.


## Program logic:
* Used passport login for login and logout feature

* We have stored property details our database by using the API details available from AttomAPI. For storing all the property details, used 3 API requests to AttomAPI 
    - First one for getting property Id's for the list of properties available for city being searched.
    - Second for getting property details for all the list of properties 
    -Third for getting price for each property

* So used nested axios get method for storing api data in the tables. Useed recursive callback function axiosCall(i) for executing nested axios get methods in synchronous manner.

* Used app.post("/api/homeList", function (req, res) route for inserting all the property details in to the housing table

* Used app.get("/api/homeListBasedCity/:cityName", function (req, res) route for finding all the property details for city being searched:
db.Housing.findAll({
      where: {
        cityDb: req.params.cityName
      }

* Favorite feature:
    - When user favorite any property, that home ID and corresponding user ID will be inserted into the Favorite table:
    app.post("/api/insertFavourite", function (req, res) {
    db.Favorites.create({
      userId: req.body.userId,
      HousingId: req.body.homeId
    })
    - When user unfavorite any property, that home ID and corresponding user ID will be deleted from the Favorite table:
    app.delete("/api/deleteFavourite/:user/:house", function (req, res) {
    db.Favorites.destroy({
      where: {
        userId: req.params.user,
        HousingId: req.params.house
      }
    })
    - Then finally performed left join on favorite table and housing table so that users can see their favorited homes.
    app.get("/api/favorites/:id", function (req, res) {
     db.Favorites.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Housings]
    })

* Used handlebars to control layout and render everything to UI.
