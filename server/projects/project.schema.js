var mongoose = require('mongoose');

var i18nAttributeSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    imageUrl: {type: String},
    workUrl: {type: String},
    videoUrl: {type: String},
    sourceCodeUrl: {type: String},
})

var projectSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  type: {type: String, required: true, enum: ['web', 'gamedev', 'ml']},
  date: {type: Date, required: true},
  imageUrl: {type: String},
  workUrl: {type: String},
  videoUrl: {type: String},
  sourceCodeUrl: {type: String},
  i18n: {
    pt: i18nAttributeSchema,
    jp: i18nAttributeSchema,
  },
  relevance: {type: Number},
})


module.exports = mongoose.model('Project', projectSchema);
