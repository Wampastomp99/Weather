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
    var queryUrl = url + userInput + APIKey;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        var cityInfo = response.name;
        var country = response.sys.country;
        var temp
    })
}