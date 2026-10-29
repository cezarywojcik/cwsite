/**
 * File: rss.js
 * Desc: the /rss route
 */

var pm = require("../postmanager.js");
var rss = require("rss");
var settings = require("../settings.js");

exports.rss = function(req, res) {
  // Links built from the Host header can be spoofed, so prefer the configured URL.
  var siteUrl = settings.siteUrl || "http://" + req.headers.host;
  var feed = new rss({
    title: "Cezary Wojcik's Blog",
    author: "Cezary Wojcik",
    description: "The Official Blog of Cezary Wojcik",
    feed_url: siteUrl + "/rss",
    site_url: siteUrl + "/blog",
    copyright: "Copyright Cezary Wojcik 2014",
    language: "en-US"
  });

  var posts = pm.getPostList(null, null, null, 30);
  for (var i in posts) {
    var post = posts[i];
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: siteUrl + post.url,
      author: "Cezary Wojcik",
      date: post.date
    });
  }
  res.set("Content-Type", "text/xml");
  res.send(feed.xml());
};
