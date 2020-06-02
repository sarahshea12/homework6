   // This is my API key
   var APIKey = "032b8a094b69214ac66a358522135a00";
   var cities = [];
   
   // Click event
   function handleClick(cityName){
    // var cityName = $("#cityInput").val().trim()
    // $("#cityInput").val("");
   var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey
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
    var ws = $("<p>")
    ws.text("Wind speed: " + response.list[0].wind.speed)
    $("#present").append(newP);
    $("#present").append(humP);
    $("#present").append(ws)
    $("#cityName").text("Current weather in " + response.city.name)
    var iconOne = $("<img>");
		var iconOneSrc =
			"https://openweathermap.org/img/wn/" +
			response.list[0].weather[0].icon +
			"@2x.png";
		iconOne.attr("src", iconOneSrc);
        newP.append(iconOne);
        

    // Put the future info in forecast
    $("#day2").text("Tomorrow") 
    var df = $("<p>")
    df.text("Degrees (F):  "+ ((response.list[1].main.temp - 273.15) * 1.80 + 32).toFixed(2));
    var humP2 = $("<p>")
    humP2.text(" Humidity %: " + response.list[1].main.humidity)
    var ws2 = $("<p>")
    ws2.text("Wind speed: " + response.list[1].wind.speed)
    var iconTwo = $("<img>");
    var iconTwoSrc =
        "https://openweathermap.org/img/wn/" +
        response.list[1].weather[0].icon +
        "@2x.png";
    iconTwo.attr("src", iconTwoSrc);
    $("#day2").append(iconTwo);
    $("#day2").append(df);
    $("#day2").append(humP2);
    $("#day2").append(ws2);
    

    $("#day3").text("Day after tomorrow ");
    var humP3 = $("<p>")
    var df2 = $("<p>")
    df2.text("Degrees (F):  "+ ((response.list[2].main.temp - 273.15) * 1.80 + 32).toFixed(2))
    humP3.text(" Humidity %: " + response.list[2].main.humidity);
    df2.text("Degrees (F):  "+ ((response.list[2].main.temp - 273.15) * 1.80 + 32).toFixed(2))
    var ws3 = $("<p>")
    ws3.text("Wind speed: " + response.list[2].wind.speed)
    var icon3 = $("<img>");
    var icon3Src =
        "https://openweathermap.org/img/wn/" +
        response.list[2].weather[0].icon +
        "@2x.png";
    icon3.attr("src", icon3Src);
    $("#day3").append(icon3);
    $("#day3").append(df2);
    $("#day3").append(humP3);
    $("#day3").append(ws3)

    $("#day4").text("In 2 days ");
    var humP4 = $("<p>");
    var df3 = $("<p>");
    df3.text("Degrees (F):  "+ ((response.list[3].main.temp - 273.15) * 1.80 + 32).toFixed(2));
    humP4.text(" Humidity %: " + response.list[3].main.humidity);
    var ws4 = $("<p>")
    ws4.text("Wind speed: " + response.list[3].wind.speed)
    var icon4 = $("<img>");
    var icon4Src =
        "https://openweathermap.org/img/wn/" +
        response.list[3].weather[0].icon +
        "@2x.png";
    icon4.attr("src", icon4Src);
    $("#day4").append(icon4);
    $("#day4").append(df3);
    $("#day4").append(humP4);
    $("#day4").append(ws4);


    $("#day5").text("In 3 days ");
    var humP5 = $("<p>");
    var df4 = $("<p>");
    df4.text("Degrees (F):  "+ ((response.list[4].main.temp - 273.15) * 1.80 + 32).toFixed(2));
    humP5.text(" Humidity %: " + response.list[4].main.humidity);
    var ws5 = $("<p>")
    ws5.text("Wind speed: " + response.list[4].wind.speed)
    var icon5 = $("<img>");
    var icon5Src =
        "https://openweathermap.org/img/wn/" +
        response.list[4].weather[0].icon +
        "@2x.png";
    icon5.attr("src", icon5Src);
    $("#day5").append(icon5);
    $("#day5").append(df4);
    $("#day5").append(humP5);
    $("#day5").append(ws5);

    var lati = response.city.coord.lat
    var long = response.city.coord.lon

    uvIndex(long, lati);

   })};

   function uvIndex(long, lati) {
    var indexURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=8c9bb7e0eeb10862d148cd62de471c05&lat=";
var middle = "&lon=";
var indexSearch = indexURL + lati + middle + long;
console.log(indexSearch);

$.ajax({
    url: indexSearch,
    method: "GET"
}).then(function(response) {
    var uvFinal = response.value;
    console.log(uvFinal)
    uvP = $("<p>")
    uvP.text("UV Index: " + uvFinal);
    $("#present").append(uvP);

    if (uvFinal < 3) {
        uvP.attr("class", "green")
    } 
    else if (3 < uvFinal < 6) {
        uvP.attr("class", "yellow")
    }
    else if (6 < uvFinal < 9) {
        uvP.attr("class", "orange")
    }
    else if (uvFinal > 9) {
        uvP.attr("class", "red")
    }
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
    };
    

    handleClick(cityName);
   });

   function historyBtns() {
    // cityName = $(this).text();
    $("#present").empty();
    console.log("hello");
   }

   $(document).on("click", "button", function(){
    console.log("Inside prevbtn click");
    var cityName = $(this).attr("data-name");
    handleClick(cityName);
   });
