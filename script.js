   // This is my API key
   var APIKey = "032b8a094b69214ac66a358522135a00";
   var cities = [];
   
   // Click event
   function handleClick(cityName){
    // var cityName = $("#cityInput").val().trim()
    // $("#cityInput").val("");
   var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {

    $("#present").empty();
    $(".future").empty();

    // Log the queryURL
    console.log(queryURL);
    console.log(response);

    // Unhide the main div
    $("#cityDiv").removeClass("hide");
    $("#forecast").removeClass("hide");
   
    // Put the current info in #present
    var newP = $("<p>");
    newP.text("Degrees (F): " + ((response.list[0].main.temp- 273.15) * 1.80 + 32).toFixed(2));
    var humP = $("<p>");
    humP.text(" Humidity %: " + response.list[0].main.humidity)
    $("#present").append(newP);
    $("#present").append(humP);
    $("#cityName").text("Current weather in " + response.city.name)
    var iconOne = $("<img>");
		var iconOneSrc =
			"https://openweathermap.org/img/wn/" +
			response.list[0].weather[0].icon +
			"@2x.png";
		iconOne.attr("src", iconOneSrc);
        newP.append(iconOne);
        
    // Can't find UV index?

    // Put the future info in forecast
    $("#day2").text("Tomorrow " + "Degrees (F):  "+ ((response.list[1].main.temp - 273.15) * 1.80 + 32).toFixed(2)
    + " Humidity %: " + response.list[1].main.humidity);
    var iconTwo = $("<img>");
    var iconTwoSrc =
        "https://openweathermap.org/img/wn/" +
        response.list[1].weather[0].icon +
        "@2x.png";
    iconTwo.attr("src", iconTwoSrc);
    $("#day2").append(iconTwo);

    $("#day3").text("Day after tomorrow " + "Degrees (F):  "+ ((response.list[2].main.temp - 273.15) * 1.80 + 32).toFixed(2)
    + " Humidity %: " + response.list[2].main.humidity);
    var icon3 = $("<img>");
    var icon3Src =
        "https://openweathermap.org/img/wn/" +
        response.list[2].weather[0].icon +
        "@2x.png";
    icon3.attr("src", icon3Src);
    $("#day3").append(icon3);

    $("#day4").text("In 2 days " + "Degrees (F):  "+ ((response.list[3].main.temp - 273.15) * 1.80 + 32).toFixed(2)
    + " Humidity %: " + response.list[3].main.humidity);
    var icon4 = $("<img>");
    var icon4Src =
        "https://openweathermap.org/img/wn/" +
        response.list[3].weather[0].icon +
        "@2x.png";
    icon4.attr("src", icon4Src);
    $("#day4").append(icon4);

    $("#day5").text("In 3 days " + "Degrees (F):  "+ ((response.list[4].main.temp - 273.15) * 1.80 + 32).toFixed(2)
    + " Humidity %: " + response.list[4].main.humidity);
    var icon5 = $("<img>");
    var icon5Src =
        "https://openweathermap.org/img/wn/" +
        response.list[4].weather[0].icon +
        "@2x.png";
    icon5.attr("src", icon5Src);
    $("#day5").append(icon5);

    // Add to history Div

    // Commit to local storage

   })};

   $("#click").on("click", function(){
    var cityName = $("#cityInput").val().trim()
    $("#cityInput").val("");
    cities.push(cityName);
    // localStorage.setItem("Cities",cities);
    console.log("Cities Aray: "+cities);
    $("#history").empty();

    // var temp = localStorage.getItem("Cities")
    for(var i=0;i<cities.length;i++){
        var newBtn = $("<button>");
        newBtn.text(cities[i]);
        newBtn.addClass("prevBtn");
        newBtn.attr("data-name", cities[i]);
        $("#history").append(newBtn);
        $("#history").append("<br/>");
    }
    

    handleClick(cityName);
   });

   // How to use history buttons?
   function historyBtns() {
    // cityName = $(this).text();
    $("#present").empty();
    console.log("hello");
   }

   $(document).on("click", "button", function(){
    console.log("Inside prevbtn click");
    var cityName = $(this).attr("data-name");
    handleClick(cityName);
   })



   /*$(".prevBtn").on("click", function(){
       console.log("Inside prevbtn click");
       var cityName = $(this).attr("data-name");
       handleClick(cityName);
   });*/
