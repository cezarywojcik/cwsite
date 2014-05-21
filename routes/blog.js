/**
 * File: blog.js
 * Desc: the /blog route
 */

var jade = require("jade");
var db = require("../db.js");

exports.blog = function(req, res) {
  var article = {
    title: "My Blog Posts",
    timecreated: "",
    content: jade.renderFile("views/partials/blog.jade", {
      posts: []
    }),
    nav: ""
  };

  res.render("generic", {
    title: "Blog",
    article: article
  });
};
