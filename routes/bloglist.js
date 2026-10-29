/**
 * File: bloglist.js
 * Desc: the /blog or /:year/:month?/:day? routes
 */

var pug = require("pug");
var pm = require(__dirname + "/../postmanager.js");

exports.bloglist = function(req, res) {
  var posts = pm.getPostList(req.params.year, req.params.month,
        req.params.day);
  var article = {};

  if (posts.length === 0) {
    article = pm.errorPost;

    res.status(404).render("generic", {
      title: article.title,
      article: article
    });
  } else {
    article = {
      title: "My Blog Posts",
      timecreated: "",
      content: pug.renderFile(__dirname + "/../views/partials/blog.pug", {
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
