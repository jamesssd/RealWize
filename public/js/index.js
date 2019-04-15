$(document).ready(function() {
  // console.log("hello");
  //var homeListArray = [];
  // Getting a reference to the input field where user adds a city name
  var $cityInput = $("input.search-city");
  // Our new todos will go inside the todoContainer
  //var $propertListContainer = $(".list-container");
  // Adding event listeners for deleting, editing, and adding 
  // $(document).on("click", "button.delete", deleteTodo);
  // $(document).on("click", "button.complete", toggleComplete);
  // $(document).on("click", ".todo-item", editTodo);
  // $(document).on("keyup", ".todo-item", finishEdit);
  // $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", getPropertListApi);

 
  
  // This function makes api call to get api data for city
  function getPropertListApi(event) {
    console.log("inserting values");
    event.preventDefault();
   //setting header info to send it as the last argument in axios get request
    var config = {
      headers: 
      {
        'accept': 'application/json',
        'apikey' : 'dcc3e13d6cf56f0afa62028c6856b7a7'
        }
    };

    // Getting the value from city textbox
    var cityName = $cityInput.val().trim();
    $cityInput.val("");
     //axios get method to get api data    
    axios.get('https://search.onboard-apis.com/propertyapi/v1.0.0/property/snapshot?cityname='+cityName, config)
    .then(function (response) {
     // handle success
      console.log(response);
      for (i in response.data.property) {
  
       //Getting bedbath
         var bedNumbers = response.data.property[i].building.rooms.bathstotal;
        var bathNumbers = response.data.property[i].building.rooms.beds;
        var bedbath =  bedNumbers+"beds"+bathNumbers+"baths";
        //console.log("address"+v);
        var houseDetails = {
          homeAddress: response.data.property[i].address.oneLine,
          yearBuilt: response.data.property[i].summary.yearbuilt,
          lotSize: response.data.property[i].lot.lotSize1,
          propClass: response.data.property[i].summary.propclass,
          date_listed: response.data.property[i].vintage.pubDate,
          // text: $newItemInput.val().trim(),
          roomsAmenities: bedbath
        };
    
        // POST route for saving a new todo
        // This function inserts a new todo into our database and then updates the view
        $.post("/api/homeList", houseDetails,function(){
      
       })
     }
     
          // This function grabs propertlists from the database and updates the view
       // function getHomeList() {
       
  
    })
    .catch(function (error) {
     // handle error
      console.log(error);
    })
    .then(function () {
     // selectPropertyList();
      
    });

    // var todo = {
    //   text: $newItemInput.val().trim(),
    //   // complete: false
    // };

    // $.post("/api/todos", todo, getTodos);
    // $newItemInput.val("");
  }

  //function selectPropertyList(){
    // $.get("/api/homeList", function(data) {
    //   homeListArray = data;
    //   console.log("from db"+data);
    //   //initializeRows();
    // });
 // }
})
