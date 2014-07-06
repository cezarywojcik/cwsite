/**
 * File: rss.js
 * Desc: the /rss route
 */

var pm = require("../postmanager.js");
var rss = require("rss");

exports.rss = function(req, res) {
  var feed = new rss({
    title: "Cezary Wojcik's Blog",
    author: "Cezary Wojcik",
    description: "The Official Blog of Cezary Wojcik",
    feed_url: "http://" + req.headers.host + "/rss",
    site_url: "http:/" + req.headers.host + "/blog",
    copyright: "Copyright Cezary Wojcik 2014",
    language: "en-US"
  });

  var posts = pm.getPostList(null, null, null, 30);
  for (var i in posts) {
    var post = posts[i];
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: "http://" + req.headers.host + post.url,
      author: "Cezary Wojcik",
      date: post.date
    });
  }
  res.set("Content-Type", "text/xml");
  res.send(feed.xml());
};
