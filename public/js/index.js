$(document).ready(function() {
  // Getting a reference to the input field where user adds a city name
  var $cityInput = $("input.search-city");
  var i=0;
  // Adding event listeners for deleting, editing, and adding 
  // $(document).on("click", "button.delete", deleteTodo);
  // $(document).on("click", ".todo-item", editTodo);
  // $(document).on("keyup", ".todo-item", finishEdit);
  // $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", getPropertyListApi);
  // document.getElementById("myBtn").addEventListener("click", getPropertyListApi);
  
  // This function makes api call to get api data for city
  function getPropertyListApi(event) {
  //  console.log("inserting values");
    event.preventDefault();
    //setting header info to send it as the last argument in axios get request
    var config = {
      headers: 
      {
        "accept": "application/json",
        "apikey" : "dcc3e13d6cf56f0afa62028c6856b7a7"
      }
    };

    // Getting the value from city textbox
    var cityName = $cityInput.val().trim();
    $cityInput.val("");
    console.log("cityName client"+cityName);


    //  axios get method to get api snapshot data    
    axios.get("https://search.onboard-apis.com/propertyapi/v1.0.0/property/snapshot?cityname="+cityName, config)
      .then(function (response) {
        // handle success
        console.log("outer axios");
        console.log(response);
        //  for (i in response.data.property)
        // while(i <10)
        // {
        //Using callback recursive function to perform synchronous operation
        var callValue = axiosCall(i);
        function axiosCall(i) {
          if(i>9) {
            console.log("inside i");
            return i;
      
          }// base case - exiting out of recursion
          else {

            var propertyID = response.data.property[i].identifier.obPropId;
            console.log("value of propertyID=",propertyID);
            console.log("value of i=",i);
  
            //  axios get method to get api school data
            axios.get("https://search.onboard-apis.com/propertyapi/v1.0.0/property/detailwithschools?id="+propertyID, config)
              .then(function (responseDetails) {
                console.log("inner axios");
                console.log("inner axios value of propertyID=",propertyID);
                // handle success
                console.log(responseDetails);

                //map info
                var longitudevalue= responseDetails.data.property[0].location.longitude; 
                var latitudeValue = responseDetails.data.property[0].location.latitude; 
                console.log("map values longitude = "+longitudevalue+"latitude = "+latitudeValue);
             
                var homeAddress = responseDetails.data.property[0].address.oneLine;
                var city = responseDetails.data.property[0].address.locality;
                //summary
                var lotSize= responseDetails.data.property[0].lot.lotSize2;
                var propertyClass= responseDetails.data.property[0].summary.propclass;
                var propertySubtype= responseDetails.data.property[0].summary.propsubtype;
                var yearBuilt= responseDetails.data.property[0].summary.yearbuilt;
                var numberOfLevels= responseDetails.data.property[0].building.summary.levels;

                //       date_listed: response.data.property[i].vintage.pubDate,
                //Getting bedbath
                var bathsFull = responseDetails.data.property[0].building.rooms.bathsfull;
                var bathsHalf = responseDetails.data.property[0].building.rooms.bathshalf;
                var bathsTotal = responseDetails.data.property[0].building.rooms.bathstotal;
                var bedNumber = responseDetails.data.property[0].building.rooms.beds;
                var roomTotal = responseDetails.data.property[0].building.rooms.roomsTotal;
      
                //utilities
                var heatingFuel = responseDetails.data.property[0].utilities.heatingtype;
                var heatingType = responseDetails.data.property[0].utilities.heatingtype;
            
                //parking
                var garageType = responseDetails.data.property[0].building.parking.garagetype;
                var parkingSize = responseDetails.data.property[0].building.parking.prkgSize;
            
                //schools
                //school 1
                var school1 = responseDetails.data.property[0].school[0].InstitutionName;
                var school1Rating = responseDetails.data.property[0].school[0].GSTestRating;
                var school1Distance = responseDetails.data.property[0].school[0].distance;

                //school 2
                var school2 = responseDetails.data.property[0].school[1].InstitutionName;
                var school2Rating = responseDetails.data.property[0].school[1].GSTestRating;
                var schoo2Distance = responseDetails.data.property[0].school[1].distance;

                //school3
                var school3 = responseDetails.data.property[0].school[2].InstitutionName;
                var school3Rating = responseDetails.data.property[0].school[2].GSTestRating;
                var school3Distance = responseDetails.data.property[0].school[2].distance;

                //Listed Date
                var listedDate = responseDetails.data.property[0].vintage.pubDate;




                 //  axios get method to get api price data
            axios.get("https://search.onboard-apis.com/propertyapi/v1.0.0/assessmenthistory/detail?id="+propertyID, config)
            .then(function (responsePrice) {
              console.log("inner price axios");
              console.log("inner price axios value of propertyID=",propertyID);
              // handle success
              console.log(responsePrice);

              //map info
              var marketPrice= responsePrice.data.property[0].assessmenthistory[0].market.mktttlvalue; 
              console.log("market price = "+marketPrice);

            














                var houseDetails = {
                  // homePropId: propertyID,
                  address: homeAddress,
                  citykey: city,
                  priceKey: marketPrice,
                  lotkey: lotSize,
                  propertyClasskey: propertyClass,
                  propertySubtypekey: propertySubtype,
                  yearBuiltkey: yearBuilt,
                  numberOfLevelskey: numberOfLevels,
                  bathsFullkey: bathsFull,
                  bathsHalf: bathsHalf,
                  bath: bathsTotal,
                  bed: bedNumber,
                  rooms: roomTotal,
                  heat: heatingFuel,
                  heatingTypekey: heatingType,
                  garage: garageType,
                  parkingSizekey: parkingSize,
                  school1key: school1,
                  school1Ratingkey: school1Rating,
                  school1Distancekey: school1Distance,
                  school2key: school2,
                  school2Ratingkey: school2Rating,
                  schoo2Distancekey: schoo2Distance,
                  school3key: school3,
                  school3Ratingkey: school3Rating,
                  school3Distancekey: school3Distance,
                  listedDatekey: listedDate

                };//End of object houseDetails
                console.log("api values",city);
                // POST route for inserting houseDetaild into db
                $.post("/api/homeList", houseDetails,function()
                {
        
                });//end of $.post("/api/homeList")
                i++;
                return axiosCall(i); // recursive call
              })//end of axios get price method 
              }) //End of axios get method to get api school data
              .catch(function (error) {
                //  // handle error
                console.log(error);
              });//end of axios catch error to get api snapshot data
          
       
          } // end of else
        }//end of function axiosCall(i)
  
      })//end of axios get method to get api snapshot data    
     
      .catch(function (error) {
        //  // handle error
        console.log(error);
      });
    //********* just comment below line of code to trigger api call and insert api data into db and 
    //  uncomment it once u have enough records in your table  ***************************** 

    window.location="/api/homeListBasedCity/" + cityName;
  }//end of function getPropertyListApi

})//end of document.ready function

//==============================================
$.get("/username", function (name) {

if (name==="false") return
$("#name").text(name)
});


//===============SIGN IN BUTTON TO TOGGLE THE MODAL FOR THE SIGN-UP FORM===========//
$("#signInBtn").click(function(){
  
  $("#signup").slideToggle(1000, "swing");
});
$("#signInBtn1").click(function(){
  
  $("#signup").slideToggle(1000, "swing");
});
