/**
 * File: about.js
 * Desc: the /about route
 */

var pug = require("pug");

exports.about = function(req, res) {
  var article = {
    title: "About Me",
    timecreated: "",
    content: pug.renderFile(__dirname + "/../views/partials/about.pug"),
    nav: ""
  };

  res.render("generic", {
    title: article.title,
    article: article
  });
};
