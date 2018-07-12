var fs = require('fs');
var EJS = require('ejs');
var projects = require('../public/JSON/projects.json');

module.exports = function(app) {
    // BEGIN SERVER ROUTES
    app.get('/', function(req, res) {
        res.render('pages/index', {
            projects: '',
        });
    });
    app.get('/project/:name', function(req, res) {
        var projectName = req.params.name;
        var project = projects[projectName];
        if(project != undefined){
            res.render('pages/project', {
                "project": project,
                "projectBodyLocation": "../projects/" + projectName
            });
        } else {
            res.redirect('/#project');
        }
    });
};