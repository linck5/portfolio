var mongoose = require('mongoose');


var projectSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  type: {type: String, required: true, enum: ['web', 'gamedev', 'ml']},
  date: {type: Date, required: true},
  imageUrl: {type: String, required: false},
  workUrl: {type: String, required: false},
  videoUrl: {type: String, required: false},
  sourceCodeUrl: {type: String, required: false},
})


module.exports = mongoose.model('Project', projectSchema);
