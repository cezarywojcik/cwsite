/**
 * File: about.js
 * Desc: the /about route
 */

var jade = require("jade");

exports.about = function(req, res) {
  var article = {
    title: "About Me",
    timecreated: "",
    content: jade.renderFile("views/partials/about.jade"),
    nav: ""
  };

  res.render("generic", {
    title: article.title,
    article: article
  });
};
