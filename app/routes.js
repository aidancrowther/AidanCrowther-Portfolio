var fs = require('fs');
var sql = require('mysql');

var EJS = require('ejs');
var projects = require('../public/JSON/projects.json');
var sqlCerts = JSON.parse(fs.readFileSync('certs.json'));

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

    app.get('/data/:period', function(req, res) {
      var dataPeriod = req.params.period;
      var config = {
        "user": sqlCerts.user,
        "password": sqlCerts.password,
        "database": sqlCerts.database,
        "host": sqlCerts.server
      };

      var con = sql.createConnection(config);

      con.connect(function(err){

        var query = "";

        switch(dataPeriod){
          case("current"):
            query = "select * from "+sqlCerts.table+" order by created desc limit 1";
          break;

          case("hour"):
            query = `select hour(created) as created,
                     avg(temperature) as temperature,
                     avg(humidex) as humidex,
                     avg(pressure) as pressure,
                     avg(light) as light,
                     avg(battery) as battery
                     from log
                     where datediff(now(), cast(created as date)) = 0
                     group by hour(created)
                     desc limit 1`;
          break;

          case("day"):
            query = `select hour(created) as created,
                     avg(temperature) as temperature,
                     avg(humidex) as humidex,
                     avg(pressure) as pressure,
                     avg(light) as light,
                     avg(battery) as battery
                     from log
                     where datediff(now(), cast(created as date)) = 0
                     group by hour(created)`;
          break;

          case("week"):
            query = `select cast(created as date) as created,
                     avg(temperature) as temperature,
                     avg(humidex) as humidex,
                     avg(pressure) as pressure,
                     avg(light) as light,
                     avg(battery) as battery
                     from log
                     where datediff(now(), cast(created as date)) <= 7
                     group by cast(created as date)`;
          break;

          default:
            query = "";
          break;
        }

        con.query(query, function(err, data, fields){
          res.send(data);
        });
      });
    });
};
