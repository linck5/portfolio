const fetch = require('isomorphic-fetch');

// set variables with API call URL
const weatherURL = `http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=${process.env.WEATHER_KEY}`;
const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=${process.env.WEATHER_KEY}`;
const ipstackURL = `http://api.ipstack.com/check?access_key=${process.env.GEO_KEY}`




module.exports = function (router) {


  router.route('/api/external/weather/:lat/:lon')

  .get(function(req, res) {
    console.log("fetching weather")
    fetch(`${weatherURL}&lat=${req.params.lat}&lon=${req.params.lon}`)
        .then(response => response.json())
        .then(weather => res.send(weather))
        .catch(error => res.send(error))
  })


  router.route('/api/external/forecast/:lat/:lon')

  .get(function(req, res) {
    fetch(`${forecastURL}&lat=${req.params.lat}&lon=${req.params.lon}`)
        .then(response => response.json())
        .then(forecast => res.send(forecast))
        .catch(error => res.send(error))
  })

  router.route('/api/external/geocheck')

  .get(function(req, res) {
    console.log("fetching geocheck")
    fetch(ipstackURL)
        .then(response => response.json())
        .then(geo => res.send(geo))
        .catch(error => res.send(error))
  })
}
