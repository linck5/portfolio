const fetch = require('isomorphic-fetch');

// set variables with API call URL
const weatherURL = `http://api.openweathermap.org/data/2.5/weather?APPID=${process.env.WEATHER_KEY}`;
const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?APPID=${process.env.WEATHER_KEY}`;
const ipstackURL = 'http://api.ipstack.com/'




module.exports = function (router) {


  function applyHeaders(res) {
    res.header('Access-Control-Allow-Methods', 'GET');
    return res;
  }

  router.route('/api/external/weather/:lat/:lon')

  .get(function(req, res) {
    res = applyHeaders(res)
    fetch(`${weatherURL}&lat=${req.params.lat}&lon=${req.params.lon}`)
        .then(response => response.json())
        .then(weather => res.send(weather))
        .catch(error => res.send(error))
  })


  router.route('/api/external/forecast/:lat/:lon')

  .get(function(req, res) {
    res = applyHeaders(res)
    fetch(`${forecastURL}&lat=${req.params.lat}&lon=${req.params.lon}`)
        .then(response => response.json())
        .then(forecast => res.send(forecast))
        .catch(error => res.send(error))
  })

  router.route('/api/external/geocheck')

  .get(function(req, res) {
    res = applyHeaders(res)
    let ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : 'noIPInfo');

    fetch(`${ipstackURL}/${ip}?access_key=${process.env.GEO_KEY}`)
        .then(response => response.json())
        .then(geo => res.send(geo))
        .catch(error => res.send(error))
  })
}
