/**
 * File: postmanager.js
 * Desc: this file loads the posts in the posts/ directory
 */

var fs = require("fs");
var hl = require("highlight.js");
var md = require("markdown").markdown;
var yaml = require("yamljs");
var cheerio = require("cheerio");
var logger = require("./logger.js");
var entities = require('entities');

// ---- [ paths ] -------------------------------------------------------------

var postsPath = __dirname + "/posts/";
var cachePath = __dirname + "/cache/";

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
  return month + " " + Number(d) + ", " + Number(y);
}

function ensureCacheExists() {
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
  }
}

function getCachedPost(filename) {
  ensureCacheExists();

  var rawPost = fs.readFileSync(cachePath + filename + ".html",
    "utf8");
  var post = yaml.parse(rawPost.split("---")[1]);
  post.content = rawPost.split("---")[2];
  return post;
}

function saveCache(filename, post) {
  ensureCacheExists();

  var path = cachePath + filename + ".html";
  var content = post.content;
  delete post.content;
  var cache = "---\n" + yaml.stringify(post) + "---\n";
  cache += content;
  fs.writeFileSync(cachePath + filename + ".html", cache);
}

function getMarkdownPost(year, month, day, filename) {
  var rawPost = fs.readFileSync(postsPath + filename + ".md",
    "utf8");
  var post = yaml.parse(rawPost.split("---")[1]);
  var content = md.toHTML(rawPost.split("---")[2]);
  $ = cheerio.load(entities.decodeHTML(content));
  $("pre code").each(function(i, e) {
    $(this).html(hl.highlightAuto(
      entities.decodeHTML($(this).html())).value);
    $(this).addClass("hljs");
  });
  post.content = entities.decodeHTML($.html());
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
    var cachedFilename = cachePath + filename + ".html";
    var mdFilename = postsPath + filename + ".md";
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
    logger.log("error getting post", "postmanager.js", "getPost", err);
    return exports.errorPost;
  }
};

exports.getPostURLById = function(id) {
  try {
    // get all posts
    var postFilenames = fs.readdirSync(postsPath);
    postFilenames.sort();

    // get specific post name
    var filename = postFilenames[id - 1];

    // get post information
    var postArr = filename.split("-");
    var year = postArr[0];
    var month = postArr[1];
    var day = postArr[2];
    var title = postArr.slice(3).join("-");
    title = title.substring(0, title.length - 3);

    // return url
    return "/" + [year, month, day, title].join("/");
  } catch (err) {
    logger.log("error getting post url by id", "postmanager.js",
      "getPostURLById", err);
    return "/notfound";
  }
};

exports.getPostList = function(year, month, day, limit) {
  try {
    // get filter
    var filePattern = "";
    if (year) {
      if (isNaN(year) || Number(year) < 2000) {
        throw "not a valid year: " + year;
      }
      filePattern += year;
      if (month) {
        if (isNaN(month) || Number(month) <= 0 || Number(month) > 12) {
          throw "not a valid month";
        }
        filePattern += "-" + month;
        if (day) {
          if (isNaN(day) || Number(day) <= 0 || Number(day) > 31) {
            throw "not a valid day";
          }
          filePattern += "-" + day;
        }
      }
    }

    // get all posts that fit the filter
    var postFilenames = fs.readdirSync(postsPath)
      .filter(function(post) {
      return post.indexOf(filePattern) === 0;
    });
    postFilenames.sort().reverse();
    postFilenames = postFilenames.filter(function(o) {
      return o !== ".DS_Store";
    });

    // load post data
    var posts = [];
    for (var i in postFilenames) {
      var rawPost = fs.readFileSync(postsPath +
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
    if (limit && posts.length > limit) {
      posts = posts.splice(0, limit);
    }
    return posts;
  } catch (err) {
    logger.log("error getting post list", "postmanager.js",
      "getPostList", err);
    return [];
  }
};
