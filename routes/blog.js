/**
 * File: blog.js
 * Desc: the /blog route
 */

var jade = require("jade");
var db = require("../db.js");

exports.blog = function(req, res) {
  db.getBlogPostList(function(data) {
    var article = {
      title: "My Blog Posts",
      timecreated: "",
      content: jade.renderFile("views/partials/blog.jade", {
        posts: data
      }),
      nav: ""
    };

    res.render("generic", {
      title: "Blog",
      article: article
    });
  });
};
