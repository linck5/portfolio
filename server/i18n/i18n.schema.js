var mongoose = require('mongoose');

var i18nSchema = new mongoose.Schema({
  _lang: {type: String, required: true, unique: true}
},
{ strict: false })


module.exports = mongoose.model('I18n', i18nSchema);
