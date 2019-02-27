
var Project = require('./project.schema');

module.exports = function (router) {

  router.route('/api/projects')

  .get(function(req, res) {
    Project.find(function(err, projects) {
      if (err) res.send(err);
      res.json(projects)
    });
  })

  .post(function(req, res) {
    var newProject = new Project();
    newProject.title = req.body.title;
    newProject.description = req.body.description;
    newProject.image_url = req.body.image_url;

    newProject.save(function(err, project) {
      if (err) res.send(err);
      res.json({project: project });
    });
  });

  router.route('/api/projects/:project_id')


  .delete(function(req, res) {
    Project.remove({ _id: req.params.project_id }, function(err, project) {
      if (err) res.send(err);
      res.json({project: project });
    })
  });
}
