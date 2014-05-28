/**
 * File: home.js
 * Desc: the / route
 */

var db = require("../db.js");

exports.home = function(req, res) {
  db.getBlogPostPreview(function(data) {
    res.render("home", {
      title: "Home",
      article: data
    });
  });
};
