/**
 * File: index.js
 * Desc: loads all other *.js files in the routes directory
 */

var fs = require("fs");

fs.readdirSync(__dirname).forEach(function(file) {
  if (file === "index.js" || !file.endsWith(".js")) {
    return;
  }
  var moduleName = file.split(".")[0];
  exports[moduleName] = require("./" + file)[moduleName];
});
