module.exports = function() {
  const express = require('express')
  const path = require ('path')
  const bodyParser = require('body-parser')
  const router = express.Router();
  const auth = require('./auth.middleware')
  const cors = require('./cors.middleware')

  require('dotenv').config();

  const mongoose = require('mongoose');
  mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true
  });

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("connected to db")
  });

  const app = express()

  app.use(express.static(path.join(__dirname, '..', '/dist/portfolio')))

  app.use(cors)
  app.use(auth)

  app.use('/', router);

  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())

  require('./i18n/i18n.controller')(router)
  require('./projects/project.controller')(router)
  require('./external-apis/external-apis.controller')(router)

  router.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '/dist/portfolio/index.html'))
  });


  let port = process.env.PORT || 8080
  app.listen(port, function () {
      console.log("server listening on port " + port);
  })

}
