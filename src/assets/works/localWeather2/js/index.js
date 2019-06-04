var api_url = 'https://felipe-muller-portfolio.herokuapp.com/api';
var freeGeoIpUrl = api_url + "/external/geocheck";
var openWeatherMapUrl = api_url + "/external/weather";

var decimalPlaces = 3;

var countryName;
var regionName;
var cityName;
var celciusTemperature;


$.getJSON(freeGeoIpUrl, function(data, status){

  countryName = data.country_name;
  regionName = data.region_name;
  cityName = data.city;

  var openWeatherMapCall =
      openWeatherMapUrl + '/' +
      data.latitude + '/' +
      data.longitude;


  $.getJSON(openWeatherMapCall, function(data){



    var description = data.weather[0].description;
    var iconClass = "owf-" + data.weather[0].id + "-" + data.weather[0].icon[data.weather[0].icon.length - 1];

    celciusTemperature = kelvin2Celcius(data.main.temp).toFixed(decimalPlaces);


    $("#location").html(cityName + ", " + regionName + ", " + countryName);
    $("#description").html(description);
    $("#temperature").html(celciusTemperature + "°");
    $("#weatherIcon").addClass("owf").addClass(iconClass);

  });

});


var mesUnitObj = $("#measurementUnit");
mesUnitObj.click(function() {

  if(mesUnitObj.html() == "C"){
    mesUnitObj.html("F");
    $("#temperature").html(celcius2Fahrenheit(celciusTemperature).toFixed(decimalPlaces) + "°");
  }
  else{
    mesUnitObj.html("C");
    $("#temperature").html(celciusTemperature + "°");
  }

});



function kelvin2Celcius(kelvin){ return kelvin - 273.15; }
function celcius2Fahrenheit(celcius){ return celcius * 1.8 + 32; }
