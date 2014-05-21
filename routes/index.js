/**
 * File: index.js
 * Desc: loads all other *.js files in the routes directory
 */

require("fs").readdirSync("routes").forEach(function(file) {
  var moduleName = file.split(".")[0];
  exports[moduleName] = require("./" + file)[moduleName];
});
