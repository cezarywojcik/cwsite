/**
 * File: privacy.js
 * Desc: the /privacy route
 */

var pug = require("pug");

exports.privacy = function(req, res) {
  var article = {
    title: "Privacy Policy",
    timecreated: "",
    content: pug.renderFile(__dirname + "/../views/partials/privacy.pug"),
    nav: ""
  };

  res.render("generic", {
    title: article.title,
    article: article
  });
};
