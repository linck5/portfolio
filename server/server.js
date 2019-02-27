const express = require('express')
var router = express.Router();
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

app.use(express.static(path.join(__dirname, '..', '/dist/portfolio')))


app.use('/', router);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/dist/portfolio/index.html'))
});



require('./api-router')(router)

app.listen(process.env.PORT || 8080)
