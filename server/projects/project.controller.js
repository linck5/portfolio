
var Project = require('./project.schema');

module.exports = function (router) {

  router.route('/api/projects')

  .get(function(req, res) {
    Project.find( function(err, docs) {
      if (err) res.send(err)
      else res.json(docs)
    })
  })

  .post(function(req, res) {

      let newDoc = new Project(req.body);

      newDoc.save( function(err, doc) {
        if (err) res.send(err)
        else res.json({doc: doc })
      })

  })

  router.route('/api/project/:id')

  .get(function(req, res) {
    Project.findOne({ _id: req.params.id }, function(err, doc) {
      if (err) res.send(err)
      else res.json(doc)
    });
  })


  .delete(function(req, res) {
    Project.deleteOne({ _id: req.params.id }, function(err, doc) {
      if (err) res.send(err);
      res.json({doc: doc });
    })
  });
}
