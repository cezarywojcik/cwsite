/**
 * File: home.js
 * Desc: the / route
 */

var pm = require("../postmanager.js");

exports.home = function(req, res) {
  res.render("home", {
    posts: pm.getPostList(null, null, null, 3)
  });
};
