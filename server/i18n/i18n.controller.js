
var I18n = require('./i18n.schema');

//I18n.collection.drop()

module.exports = function (router) {

  router.route('/api/i18n')

  .get(function(req, res) {
    I18n.find( function(err, i18nDocs) {
      if (err) res.send(err)
      else res.json(i18nDocs)
    })
  })

  .post(function(req, res) {

      let newI18nDoc = new I18n(req.body);

      newI18nDoc.save( function(err, i18nDoc) {
        if (err) res.send(err)
        else res.json({i18nDoc: i18nDoc })
      })

  })

  router.route('/api/i18n/:lang_id')

  .get(function(req, res) {
    I18n.findOne({ _lang: req.params.lang_id }, function(err, i18nDoc) {
      if (err) res.send(err)
      else res.json(i18nDoc)
    });
  })


  .delete(function(req, res) {
    I18n.remove({ _lang: req.params.lang_id }, function(err, i18nDoc) {
      if (err) res.send(err);
      res.json({i18nDoc: i18nDoc });
    })
  })

  .post(function(req, res) {


    let replacementObj = req.body
    if(!replacementObj._lang){
      replacementObj._lang = req.params.lang_id
    }

    I18n.replaceOne({ _lang: req.params.lang_id }, replacementObj, function(err, replaceRes) {

      if (err) res.send(err)
      else {
        if(replaceRes.nModified == 0){
          res.json({error: `document with _lang "${req.params.lang_id}" not found.`})
        }
        else{
          I18n.findOne({ _lang: replacementObj._lang }, function(err, i18nDoc) {
            if (err) res.send(err)
            else res.json(i18nDoc)
          });
        }
      }
    });
  })
}
