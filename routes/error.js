/**
 * File: error.js
 * Desc: 404 page
 */

var pm = require("../postmanager.js");

exports.error = function(req, res) {
  var article = pm.errorPost;

  res.status(404).render("generic", {
    title: article.title,
    article: article
  });
};
