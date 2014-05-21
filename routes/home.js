/**
 * File: home.js
 * Desc: the /home route
 */

exports.home = function(req, res) {
  res.render("home", {
    title: "Home",
    article: {
      title: "Test Title",
      timecreated: "May 20, 2014",
      content: "test content",
      nav: "nav stuff"
    }
  });
};
