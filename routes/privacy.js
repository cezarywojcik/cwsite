/**
 * File: privacy.js
 * Desc: the /privacy route
 */

var jade = require("jade");

exports.privacy = function(req, res) {
  var article = {
    title: "Privacy Policy",
    timecreated: "",
    content: jade.renderFile(__dirname + "/../views/partials/privacy.jade"),
    nav: ""
  };

  res.render("generic", {
    title: article.title,
    article: article
  });
};
