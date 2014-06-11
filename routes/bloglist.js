/**
 * File: bloglist.js
 * Desc: the /blog or /:year/:month?/:day? routes
 */

var jade = require("jade");
var pm = require("../postmanager.js");

exports.bloglist = function(req, res) {
  var posts = pm.getPostList(req.param("year"), req.param("month"),
        req.param("day"));
  var article = {};

  if (posts.length === 0) {
    article = pm.errorPost;

    res.render("generic", {
      title: article.title,
      article: article
    });
  } else {
    article = {
      title: "My Blog Posts",
      timecreated: "",
      content: jade.renderFile("views/partials/blog.jade", {
        posts: posts
        }),
      nav: ""
    };

    res.render("generic", {
      title: "Blog",
      article: article
    });
  }
};
