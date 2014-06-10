/**
 * File: postmanager.js
 * Desc: this file loads the posts in the posts/ directory
 */

var fs = require("fs");
var hl = require("highlight.js");
var md = require("markdown").markdown;
var yaml = require("yamljs");
var cheerio = require("cheerio");

// ---- [ helper functions ] --------------------------------------------------

function clone(obj) {
  if (obj === null || "object" != typeof obj) {
    return obj;
  }
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = obj[attr];
    }
  }
  return copy;
}

function getFormattedDate(y, m, d) {
  var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][m - 1];
  return month + " " + d + ", " + y;
}

function getCachedPost(filename) {
  var rawPost = fs.readFileSync("./cache/" + filename + ".html", "utf8");
  var post = yaml.parse(rawPost.split("---")[1]);
  post.content = rawPost.split("---")[2];
  return post;
}

function saveCache(filename, post) {
  var path = "./cache/" + filename + ".html";
  var content = post.content;
  delete post.content;
  var cache = "---\n" + yaml.stringify(post) + "---\n";
  cache += content;
  fs.writeFileSync("./cache/" + filename + ".html", cache);
}

function getMarkdownPost(year, month, day, filename) {
  var rawPost = fs.readFileSync("./posts/" + filename + ".md", "utf8");
  var post = yaml.parse(rawPost.split("---")[1]);
  var content = md.toHTML(rawPost.split("---")[2]);
  $ = cheerio.load(content.replace(/\&quot;/g, "\""));
  $("pre code").each(function(i, e) {
    $(this).html(hl.highlightAuto(
      $(this).html().replace(/\&quot;/g, "\"")).value);
    $(this).addClass("hljs");
  });
  post.content = $.html();
  saveCache(filename, clone(post));
  return post;
}

// ---- [ exports ] -----------------------------------------------------------

exports.errorPost = {
  title: "404 - Page Not Found!",
  layout: "generic",
  content: "Oops!",
  posts: []
};

exports.getPost = function(year, month, day, title) {
  try {
    var filename = [year, month, day, title].join("-");
    var cachedFilename = "./cache/" + filename + ".html";
    var mdFilename = "./posts/" + filename + ".md";
    var post;
    if (fs.existsSync(cachedFilename) &&
      fs.statSync(cachedFilename).mtime > fs.statSync(mdFilename).mtime) {
      post = getCachedPost(filename);
    } else {
      post = getMarkdownPost(year, month, day, filename);
    }
    post.blogpost = true;
    post.url = "/" + [year, month, day, title].join("/");
    post.timecreated = getFormattedDate(year, month, day);
    return post;
  } catch (err) {
    console.log(err);
    return temp;
  }
};

exports.getPostList = function(year, month, day, limit) {
  // get filter
  var filePattern = "";
  if (year) {
    filePattern += year;
    if (month) {
      filePattern += "-" + month;
      if (day) {
        filePattern += "-" + day;
      }
    }
  }

  // get all posts that fit the filter
  var postFilenames = fs.readdirSync("./posts/").filter(function(post) {
    return post.indexOf(filePattern) === 0;
  });

  // load post data
  var posts = [];
  try {
    for (var i in postFilenames) {
      var rawPost = fs.readFileSync("./posts/" +
        postFilenames[i], "utf8");
      var post = yaml.parse(rawPost.split("---")[1]);
      post.excerpt = md.toHTML(post.excerpt);
      var postArr = postFilenames[i].split("-");
      post.date = getFormattedDate(postArr[0], postArr[1], postArr[2]);
      var urlTitle = postArr.slice(3).join("-");
      post.url = "/" + postArr.slice(0, 3).join("/") + "/" +
        urlTitle.substring(0, urlTitle.length - 3);
      posts.push(post);
    }
    posts.sort();
    if (limit && posts.length > limit) {
      posts = posts.splice(0, limit);
    }
    return posts;
  } catch (err) {
    console.log(err);
    return [];
  }
};
