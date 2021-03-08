var cityResultText = $("#cityResult");
var tempResultText = $("#tempResult");
var humidityResult = $("#humidityResult");
var windResultText = $("#windResult");
var mainIcon =$("#mainIcon");
var rowCards = $("#rowCards");
var dayForecast = $("#row5day");
var cardDisplay = $("#cardDisplay");
var UVIndexText = $("#UVIndexResult");
var buttonList = $("#buttonsList");
var forecastDate = {};
var forecastIcon = {};
var forecastTemp = {};
var forecastHum = {};
var today = moment().format('DD' + "/" + 'MM' + '/' + 'YYYY');
var APIKey = "&units=metric&APPID=f90ce9aeaf95d88d4e7a73c1f7196654";
var url =  "https://api.openweathermap.org/data/2.5/weather?q=";
var citiesArray = JSON.parse(localStorage.getItem("Saved City")) || [];

$(document).ready(function(){
    var userInput = citiesArray[citiesArray.length - 1];
    curentWeather(userInput);
    forecastDate(userInput);
    lastSearch ();
});

function currentWeather(userInput) {
    mainIcon.empty();
    var queryURL = url + userInput + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var cityInfo = response.name;
        var country = response.sys.country; 
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var icon = response.weather[0].icon;
        var UVindexURL = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&" + "lon=" + lon + "&APPID=123babda3bc150d180af748af99ad173";
        var newImgMain = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
        mainIcon.append(newImgMain);
        cityResultText.text(cityInfo + ", " + country + " " + today);
        tempResultText.text("Temperature: " + temp + " ºC");
        humidityResult.text("Humidity: " + humidity + " %");
        windResultText.text("Wind Speed: " + wind + " MPH");

        $.ajax({
            url: UVindexURL,
            method: "GET"
        }).then(function(uvIndex){
            var UV = uvIndex.value;
            var colorUV;
            if (UV <= 3) {
                colorUV = "green";
            } else if (UV >= 3 & UV <= 6) {
                colorUV = "yellow";
            } else if (UV >= 6 & UV <= 8) {
                colorUV = "orange";
            } else {
                colorUV = "red";
            }
            UVIndexText.empty();
            var UVResultText = $("<p>").attr("class", "card-text").text("UV Index: ");
            UVResultText.append($("<span>").attr("class", "uvindex").attr("style", ("background-color: " + colorUV)).text(UV))
            UVIndexText.append(UVResultText);
            cardDisplay.attr("style", "display: flex; width: 98%");
        })    
    })
    }