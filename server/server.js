const express = require('express')
const path = require ('path')

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});

const app = express();

app.use(express.static('../dist/portfolio'))

app.get('/*', (req, res) => {
  res.sendFile(path.join('../dist/portfolio/index.html'))
})

app.listen(process.env.PORT || 8080)
