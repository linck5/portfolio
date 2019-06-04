const fetch = require('isomorphic-fetch');

// set variables with API call URL
const weatherURL = `http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=${process.env.WEATHER_KEY}`;
const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=${process.env.WEATHER_KEY}`;
const ipstackURL = `http://api.ipstack.com/check?access_key=${process.env.GEO_KEY}`




module.exports = function (router) {


  function applyHeaders(res) {
    //res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET');
    return res;
  }

  router.route('/api/external/weather/:lat/:lon')

  .get(function(req, res) {
    fetch(`${weatherURL}&lat=${req.params.lat}&lon=${req.params.lon}`)
        .then(response => response.json())
        .then(weather => applyHeaders(res).send(weather))
        .catch(error => applyHeaders(res).send(error))
  })


  router.route('/api/external/forecast/:lat/:lon')

  .get(function(req, res) {
    fetch(`${forecastURL}&lat=${req.params.lat}&lon=${req.params.lon}`)
        .then(response => response.json())
        .then(forecast => applyHeaders(res).send(forecast))
        .catch(error => applyHeaders(res).send(error))
  })

  router.route('/api/external/geocheck')

  .get(function(req, res) {
    fetch(ipstackURL)
        .then(response => response.json())
        .then(geo => applyHeaders(res).send(geo))
        .catch(error => applyHeaders(res).send(error))
  })
}
