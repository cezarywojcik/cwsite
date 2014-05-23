/**
 * File: blogpost.js
 * Desc: the /blod/:id route
 */

var jade = require("jade");
var db = require("../db.js");

exports.blogpost = function(req, res) {
  var id = req.param("id");
  db.getBlogPost(id, function(data) {
    res.render("generic", {
      title: data.title,
      article: data
    });
  });
};
