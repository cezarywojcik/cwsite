/**
 * File: postmanager.js
 * Desc: this file loads the posts in the posts/ directory
 */

var fs = require("fs");
var hl = require("highlight.js");
var md = require("markdown").markdown;
var yaml = require("yamljs");
var cheerio = require("cheerio");

exports.getPost = function(year, month, day, title) {
  var filename = [year, month, day, title].join("-") + ".md";
  var rawPost = fs.readFileSync("./posts/" + filename, "utf8");
  var post = yaml.parse(rawPost.split("---")[1]);
  post.url = "/" + [year, month, day, title].join("/");
  var content = md.toHTML(rawPost.split("---")[2]);
  $ = cheerio.load(content);
  $("pre code").each(function(i, e) {
    $(this).html(hl.highlightAuto($(this).html()).value);
    $(this).addClass("hljs");
  });
  post.content = $.html();
  return post;
};
