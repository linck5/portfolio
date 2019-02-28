
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


  // router.route('/api/projects/:project_id')
  //
  //
  // .delete(function(req, res) {
  //   Project.remove({ _id: req.params.project_id }, function(err, project) {
  //     if (err) res.send(err);
  //     res.json({project: project });
  //   })
  // });
}
