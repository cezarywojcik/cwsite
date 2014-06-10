/**
 * File: bloglist.js
 * Desc: the /blog or /:year/:month?/:day? routes
 */

var jade = require("jade");
var pm = require("../postmanager.js");

exports.bloglist = function(req, res) {
  var article = {
    title: "My Blog Posts",
    timecreated: "",
    content: jade.renderFile("views/partials/blog.jade", {
      posts: pm.getPostList(req.param("year"), req.param("month"),
        req.param("day"))
      }),
    nav: ""
  };

  res.render("generic", {
    title: "Blog",
    article: article
  });
};
