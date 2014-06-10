/**
 * File: error.js
 * Desc: 404 page
 */

var jade = require("jade");
var pm = require("../postmanager.js");

exports.error = function(req, res) {
  var article = pm.errorPost;

  res.render("generic", {
    title: article.title,
    article: article
  });
};
