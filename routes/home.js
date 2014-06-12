/**
 * File: home.js
 * Desc: the / route
 */

var pm = require("../postmanager.js");

exports.home = function(req, res) {
  res.render("home", {
    title: "Home",
    posts: pm.getPostList(null, null, null, 3)
  });
};
