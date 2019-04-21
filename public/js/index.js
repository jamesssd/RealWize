$(document).ready(function () {
  // Getting a reference to the input field where user adds a city name
  var $cityInput = $("input.search-city");
  var i = 0;
  // Adding event listeners
  // $(document).on("submit", "#todo-form", getPropertyListApi);
  document.getElementById("searchBtn").addEventListener("click", getPropertyListApi);

  // This function makes api call to get api data for city
  function getPropertyListApi(event) {
    //  console.log("inside getPropertyListApi")
    event.preventDefault();
    //setting header info to send it as the last argument in axios get request
    var config = {
      headers:
      {
        "accept": "application/json",
        "apikey": "dcc3e13d6cf56f0afa62028c6856b7a7"
      }
    };

    // Getting the value from city textbox
    var cityName = $cityInput.val().trim();
    $cityInput.val("");
    console.log("cityName client" + cityName);

    //  axios get method to get api snapshot data    
    axios.get("https://search.onboard-apis.com/propertyapi/v1.0.0/property/snapshot?cityname=" + cityName, config)
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
          if (i > 9) {
            console.log("inside i");
            return i;

          }// base case - exiting out of recursion
          else {

            var propertyID = response.data.property[i].identifier.obPropId;
            console.log("value of propertyID=", propertyID);
            console.log("value of i=", i);

            //  axios get method to get api school data
            axios.get("https://search.onboard-apis.com/propertyapi/v1.0.0/property/detailwithschools?id=" + propertyID, config)
              .then(function (responseDetails) {
                console.log("inner axios");
                // console.log("inner axios value of propertyID=",propertyID);
                // handle success
                // console.log(responseDetails);

                //map info
                var longitudevalue = responseDetails.data.property[0].location.longitude;
                var latitudeValue = responseDetails.data.property[0].location.latitude;
                // console.log("map values longitude = "+longitudevalue+"latitude = "+latitudeValue);

                var homeAddress = responseDetails.data.property[0].address.oneLine;
                console.log("THIS IS HOME ADDRESS" + homeAddress);
                var city = responseDetails.data.property[0].address.locality;
                //summary
                var lotSize = responseDetails.data.property[0].lot.lotSize2;
                var propertyClass = responseDetails.data.property[0].summary.propclass;
                var propertySubtype = responseDetails.data.property[0].summary.propsubtype;
                var yearBuilt = responseDetails.data.property[0].summary.yearbuilt;
                var numberOfLevels = responseDetails.data.property[0].building.summary.levels;

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
                // var school3 = responseDetails.data.property[0].school[2].InstitutionName;
                // var school3Rating = responseDetails.data.property[0].school[2].GSTestRating;
                // var school3Distance = responseDetails.data.property[0].school[2].distance;

                //Listed Date
                var listedDate = responseDetails.data.property[0].vintage.pubDate;

                //  axios get method to get api price data
                axios.get("https://search.onboard-apis.com/propertyapi/v1.0.0/assessmenthistory/detail?id=" + propertyID, config)
                  .then(function (responsePrice) {
                    console.log("inner price axios");
                    console.log("inner price axios value of propertyID=", propertyID);
                    // handle success
                    console.log(responsePrice);

                    //map info
                    var marketPrice = responsePrice.data.property[0].assessmenthistory[0].market.mktttlvalue;
                    console.log("market price = " + marketPrice);

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
                      // school3key: school3,
                      // school3Ratingkey: school3Rating,
                      // school3Distancekey: school3Distance,
                      listedDatekey: listedDate

                    };//End of object houseDetails
                    // console.log("api values",city);
                    
                    // POST route for inserting houseDetaild into db
                    $.post("/api/homeList", houseDetails, function () {
                    });//end of $.post("/api/homeList")
                    i++;
                    return axiosCall(i); // recursive call
                  });//end of axios get price method 
                 
              }) //End of axios get method to get api school data
              .catch(function (error) {
                //  // handle error
                console.log(error);
                
              });//end of axios catch error to get api school data
          } // end of else
        }//end of function axiosCall(i)     
      })//end of axios get method to get api snapshot data    

      .catch(function (error) {
        //  // handle error
        console.log(error);
      });//end of axios catch error to get api snapshot data
    //********* just comment below line of code to trigger api call and insert api data into db and 
    //  uncomment it once u have enough records in your table  ***************************** 
    window.location = "/api/homeListBasedCity/" + cityName; 
  }//end of function getPropertyListApi

  //Favoriting homes
  $(".favorite").click(function () 
  {
    $(this).toggleClass("main");
    console.log("User Id: ", $(".user-info").attr("id"));
    let userId = $(".user-info").attr("id");
    let homeId = $(this).attr("id");
    var userTableData = {
      userId: userId,
      homeId: homeId
    };
    //if icon clicked and  = red
    if ($(this).hasClass("main")) {
  
      console.log("INSERTING FAVORITE");
      //EXECUTING SAVING OF FAVOURITED HOMES
      $.post("/api/insertFavourite", userTableData, function () {
        iconRed = 1;
      });
    }//end of if(iconRed === 1)
    //if icon clicked again and  != red
    else {
      //EXECUTING SAVING OF FAVOURITED HOMES
      console.log("DELETING FAVORITE");
      $.ajax({
        method: "DELETE",
        url: `/api/deleteFavourite/${userId}/${homeId}`
      })
        .then(function () {
          // getPosts(postCategorySelect.val());
          iconRed = 0;
        });
    }//end  of else if (iconRed === 1)
  });//End of (".favorite").click(function()
  
  $.get("/username", function (name) {
    if (name === "false") {return;}
    $("#name").text(name);
    $("#loginBtn").hide();
    $("#signUpBtn").hide();
    $("#signout").fadeIn(100, "swing");
  });
  //===============SIGN IN BUTTON TO TOGGLE THE MODAL FOR THE SIGN-UP FORM===========//
  $("#signUpBtn").click(function () {

    $("#signup").fadeIn(1000, "swing");
    $("#signin").fadeOut(1000, "swing");
  });
  $("#loginBtn").click(function () {
    $("#signin").fadeIn(3000, "swing");
    $("#signup").fadeOut(1000, "swing");
  });
  $("#signInBtn1").click(function () {
    $("#signup").slideToggle(1000, "swing");
  });

  $("#logout-button").click(function () {
    window.location.reload(true);
  });
  
  $(".showLogout").click(function () {
    $("#signout").slideToggle(1000, "swing");
  });
  $("#signInBtn1").click(function () {
    $("#signin").slideToggle(1000, "swing");
  });

  // Index page background
  !function (a) { var b = "object" === typeof self && self.self === self && self || "object" === typeof global && global.global === global && global; "function" === typeof define && define.amd ? define(["exports"], function (c) { b.ParticleNetwork = a(b, c); }) : "object" === typeof module && module.exports ? module.exports = a(b, {}) : b.ParticleNetwork = a(b, {}); }(function (a, b) { var c = function (a) { this.canvas = a.canvas, this.g = a.g, this.particleColor = a.options.particleColor, this.x = Math.random() * this.canvas.width, this.y = Math.random() * this.canvas.height, this.velocity = { x: (Math.random() - .5) * a.options.velocity, y: (Math.random() - .5) * a.options.velocity }; }; return c.prototype.update = function () { (this.x > this.canvas.width + 20 || this.x < -20) && (this.velocity.x = -this.velocity.x), (this.y > this.canvas.height + 20 || this.y < -20) && (this.velocity.y = -this.velocity.y), this.x += this.velocity.x, this.y += this.velocity.y; }, c.prototype.h = function () { this.g.beginPath(), this.g.fillStyle = this.particleColor, this.g.globalAlpha = .7, this.g.arc(this.x, this.y, 1.5, 0, 2 * Math.PI), this.g.fill(); }, b = function (a, b) { this.i = a, this.i.size = { width: this.i.offsetWidth, height: this.i.offsetHeight }, b = void 0 !== b ? b : {}, this.options = { particleColor: void 0 !== b.particleColor ? b.particleColor : "#e9ed1c", background: void 0 !== b.background ? b.background : "#1a252f", interactive: void 0 !== b.interactive ? b.interactive : !0, velocity: this.setVelocity(b.speed), density: this.j(b.density) }, this.init(); }, b.prototype.init = function () { if (this.k = document.createElement("div"), this.i.appendChild(this.k), this.l(this.k, { position: "absolute", top: 0, left: 0, bottom: 0, right: 0, "z-index": 1 }), /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.background)) { this.l(this.k, { background: this.options.background }); } else { if (!/\.(gif|jpg|jpeg|tiff|png)$/i.test(this.options.background)) { return console.error("Please specify a valid background image or hexadecimal color"), !1; } this.l(this.k, { background: "url(\"" + this.options.background + "\") no-repeat center", "background-size": "cover" }); } if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.particleColor)) { return console.error("Please specify a valid particleColor hexadecimal color"), !1; } this.canvas = document.createElement("canvas"), this.i.appendChild(this.canvas), this.g = this.canvas.getContext("2d"), this.canvas.width = this.i.size.width, this.canvas.height = this.i.size.height, this.l(this.i, { position: "relative" }), this.l(this.canvas, { "z-index": "20", position: "relative" }), window.addEventListener("resize", function () { return this.i.offsetWidth === this.i.size.width && this.i.offsetHeight === this.i.size.height ? !1 : (this.canvas.width = this.i.size.width = this.i.offsetWidth, this.canvas.height = this.i.size.height = this.i.offsetHeight, clearTimeout(this.m), void (this.m = setTimeout(function () { this.o = []; for (var a = 0; a < this.canvas.width * this.canvas.height / this.options.density; a++) { this.o.push(new c(this)); } this.options.interactive && this.o.push(this.p), requestAnimationFrame(this.update.bind(this)); }.bind(this), 500))); }.bind(this)), this.o = []; for (var a = 0; a < this.canvas.width * this.canvas.height / this.options.density; a++) { this.o.push(new c(this)); } this.options.interactive && (this.p = new c(this), this.p.velocity = { x: 0, y: 0 }, this.o.push(this.p), this.canvas.addEventListener("mousemove", function (a) { this.p.x = a.clientX - this.canvas.offsetLeft, this.p.y = a.clientY - this.canvas.offsetTop; }.bind(this)), this.canvas.addEventListener("mouseup", function (a) { this.p.velocity = { x: (Math.random() - .5) * this.options.velocity, y: (Math.random() - .5) * this.options.velocity }, this.p = new c(this), this.p.velocity = { x: 0, y: 0 }, this.o.push(this.p); }.bind(this))), requestAnimationFrame(this.update.bind(this)); }, b.prototype.update = function () { this.g.clearRect(0, 0, this.canvas.width, this.canvas.height), this.g.globalAlpha = 1; for (var a = 0; a < this.o.length; a++) { this.o[a].update(), this.o[a].h(); for (var b = this.o.length - 1; b > a; b--) { var c = Math.sqrt(Math.pow(this.o[a].x - this.o[b].x, 2) + Math.pow(this.o[a].y - this.o[b].y, 2)); c > 120 || (this.g.beginPath(), this.g.strokeStyle = this.options.particleColor, this.g.globalAlpha = (120 - c) / 120, this.g.lineWidth = .7, this.g.moveTo(this.o[a].x, this.o[a].y), this.g.lineTo(this.o[b].x, this.o[b].y), this.g.stroke()); } } 0 !== this.options.velocity && requestAnimationFrame(this.update.bind(this)); }, b.prototype.setVelocity = function (a) { return "fast" === a ? 1 : "slow" === a ? .33 : "none" === a ? 0 : .66; }, b.prototype.j = function (a) { return "high" === a ? 5e3 : "low" === a ? 2e4 : isNaN(parseInt(a, 10)) ? 1e4 : a; }, b.prototype.l = function (a, b) { for (var c in b) { a.style[c] = b[c]; } }, b; });

  // Initialisation
  var canvasDiv = document.getElementById("particle-canvas");
  var options = {
    particleColor: "#1bf9f9",
    background: "https://storage.googleapis.com/idx-acnt-gs.ihouseprd.com/AR907352/site/banner_image_original_1507239161.jpg",
    interactive: true,
    speed: "medium",
    density: "high"
  };
  var particleCanvas = new ParticleNetwork(canvasDiv, options);
});//end of document.ready function
