/**
 * File: gallery.js
 * Desc: the /gallery route
 */

var jade = require("jade");

exports.gallery = function(req, res) {
  var article = {
    title: "My Gallery",
    timecreated: "",
    content: jade.renderFile("views/partials/gallery.jade"),
    nav: ""
  };

  res.render("generic", {
    title: article.title,
    article: article
  });
};
