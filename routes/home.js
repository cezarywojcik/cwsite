/**
 * File: home.js
 * Desc: the / route
 */

exports.home = function(req, res) {
  var article = {
    title: "Test Title",
    timecreated: "May 20, 2014",
    content: "test content",
    nav: "nav stuff"
  };

  res.render("home", {
    title: "Home",
    article: article
  });
};
