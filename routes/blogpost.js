/**
 * File: blogpost.js
 * Desc: the /:year/:month/:day/:title route
 */

var pm = require("../postmanager.js");

exports.blogpost = function(req, res) {
  var year = req.params.year;
  var month = req.params.month;
  var day = req.params.day;
  var title = req.params.title;
  var post = pm.getPost(year, month, day, title);
  res.render(post.layout, {
    title: post.title,
    article: post
  });
};
