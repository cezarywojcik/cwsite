/**
 * File: blogpost.js
 * Desc: the /blog/:id route
 */

var jade = require("jade");
var pm = require("../postmanager.js");

exports.blogpost = function(req, res) {
  var year = req.param("year");
  var month = req.param("month");
  var day = req.param("day");
  var title = req.param("title");
  var post = pm.getPost(year, month, day, title);
  res.render(post.layout, {
    title: post.title,
    article: post
  });
};
