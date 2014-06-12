/**
 * File: gallery.js
 * Desc: the /gallery route
 */

var fs = require("fs");
var jade = require("jade");
var yaml = require("yamljs");

exports.gallery = function(req, res) {
  var apps = [];
  var projects = [];

  try {
    var path = __dirname + "/../gallery/apps/";
    var appFiles = fs.readdirSync(path);
    for (var i in appFiles) {
      var appFileContents = String(fs.readFileSync(path +
        appFiles[i]));
      apps.push(yaml.parse(appFileContents));
    }
  } catch (err) {
    console.log(err);
    apps = [];
  }

  try {
    path = __dirname + "/../gallery/projects/";
    var projectFiles = fs.readdirSync(path);
    for (var j in projectFiles) {
      var projectFileContents = String(fs.readFileSync(path +
        projectFiles[j]));
      projects.push(yaml.parse(projectFileContents));
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
