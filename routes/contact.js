/**
 * File: contact.js
 * Desc: the /contact route
 */

var jade = require("jade");

exports.contact = function(req, res) {
  var article = {
    title: "Contact Me",
    timecreated: "",
    content: jade.renderFile("views/partials/contact.jade"),
    nav: ""
  };

  res.render("generic", {
    title: article.title,
    article: article
  });
};
