var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: String,

});

module.exports = mongoose.model('Project', projectSchema);
