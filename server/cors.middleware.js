module.exports = function (req, res, next){
  res.header('Access-Control-Allow-Origin', 'http://www.felipemuller.xyz')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')

  if (req.method === 'OPTIONS') {
    return res.send(200)
  }


  next()
}
