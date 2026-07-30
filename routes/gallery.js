/**
 * File: gallery.js
 * Desc: the /gallery route
 */

var fs = require("fs");
var yaml = require("js-yaml");

exports.gallery = function(req, res) {
  var apps = [];
  var projects = [];

  try {
    var path = __dirname + "/../gallery/apps/";
    var appFiles = fs.readdirSync(path);
    for (var i = 0; i < appFiles.length; i++) {
      var appFileContents = String(fs.readFileSync(path +
        appFiles[i]));
      apps.push(yaml.load(appFileContents));
    }
  } catch (err) {
    console.log(err);
    apps = [];
  }

  try {
    path = __dirname + "/../gallery/projects/";
    var projectFiles = fs.readdirSync(path);
    for (var j = 0; j < projectFiles.length; j++) {
      var projectFileContents = String(fs.readFileSync(path +
        projectFiles[j]));
      projects.push(yaml.load(projectFileContents));
    }
  } catch (err) {
    console.log(err);
    projects = [];
  }

  res.render("gallery", {
    title: "My Gallery",
    apps: apps,
    projects: projects
  });
};
