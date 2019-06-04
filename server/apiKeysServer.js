module.exports = function() {
    // specify env file path within the dotenv require module
  require('dotenv').config(); // note: if this is glitch, you can leave this portion blank
  const fetch = require('isomorphic-fetch');
  const express = require('express');
  const app = express();

  // set variables with API call URL
  const weatherURL = `http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=${process.env.WEATHER_KEY}`;
  const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=${process.env.WEATHER_KEY}`;
  const ipstackURL = `http://api.ipstack.com/check?access_key=${process.env.GEO_KEY}`

  // enable CORS for cross-browser support
  app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      next();
  });

  // populate express get methods for JSON fetch
  app.get('/keys/weather/:lat/:lon', function (req, res) {
    console.log("fetching weather")
      fetch(`${weatherURL}&lat=${req.params.lat}&lon=${req.params.lon}`)
          .then(response => response.json())
          .then(weather => res.send(weather))
          .catch(error => res.send(error))
  });
  app.get('/keys/forecast/:lat/:lon', function (req, res) {
      fetch(`${forecastURL}&lat=${req.params.lat}&lon=${req.params.lon}`)
          .then(response => response.json())
          .then(forecast => res.send(forecast))
          .catch(error => res.send(error))
  });
  app.get('/keys/geocheck', function (req, res) {
      console.log("fetching geocheck")
      fetch(ipstackURL)
          .then(response => response.json())
          .then(geo => res.send(geo))
          .catch(error => res.send(error))
  });

  // verify server is running
  let port = 3087
  app.listen(port, function () {
      console.log("api keys server listening on port " + port);
  })
}
