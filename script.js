   // This is my API key
   var APIKey = "032b8a094b69214ac66a358522135a00";

   // Click event
   function handleClick(){
    var cityName = $("#cityInput").val().trim()
   var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
    
    // Log the queryURL
    console.log(queryURL);
    console.log(response);
   })};

   $("#click").on("click", handleClick)