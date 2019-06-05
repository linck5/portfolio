module.exports = function (req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://www.felipemuller.xyz')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  next()
}
