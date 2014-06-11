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
    var appFiles = fs.readdirSync("./gallery/apps");
    for (var i in appFiles) {
      var appFileContents = String(fs.readFileSync("./gallery/apps/" +
        appFiles[i]));
      apps.push(yaml.parse(appFileContents));
    }
  } catch (err) {
    console.log(err);
    apps = [];
  }

  try {
    var projectFiles = fs.readdirSync("./gallery/projects");
    for (var j in projectFiles) {
      var projectFileContents = String(fs.readFileSync("./gallery/projects/" +
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
