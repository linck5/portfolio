const express = require('express')
const path = require ('path')

require('dotenv').config();

const app = express();

app.use(express.static(__dirname + '/dist/portfolio'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/portfolio/index.html'))
})

app.listen(process.env.PORT || 8080)

console.log("DOT ENV FILE TEST OUTPUT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + process.env.TEST)

//heroku auto deploy test
