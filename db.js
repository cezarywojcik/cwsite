/**
 * File: db.js
 * Desc: this file interacts with the database
 */

var mysql = require("mysql");
var settings = require("./settings.js");
var md = require("markdown").markdown;

var db = mysql.createConnection(settings.db);

exports.db = db;

// ---- [ helper functions ] --------------------------------------------------

function getFormattedDate(d) {
  var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    [d.getMonth()];
  var day = d.getDate();
  var year = d.getFullYear();
  return month + " " + day + ",  " + year;
}

function getMaxPostID(callback) {
  db.query("SELECT MAX(blogid) FROM blog",
    function(err, res) {
      callback(res[0]["MAX(blogid)"]);
    });
}

function formatBlogPost(res, preview, blogpost, callback) {
  res[0].timecreated = getFormattedDate(res[0].timecreated);
  res[0].nav = "";
  if (blogpost) {
  res[0].blogpost = true;
  }
  res[0].content = res[0].content.toString('utf-8');
  if (res[0].content.substr(0, 3) === "MD-") {
    res[0].content = md.toHTML(res[0].content.substr(4));
    if (preview) {
      var more = "<a href=\"/blog/" + res[0].blogid + "\">Read More...</a>";
      res[0].content = res[0].content.replace(/&lt;preview&gt;(.|\n)*/m, more);
    }
  }
  if (!preview) {
    var prevID = res[0].blogid - 1;
    var nextID = res[0].blogid + 1;
    if (prevID !== 0) {
      res[0].nav += "<a class=\"prev\" href=\"/blog/" + prevID + "\">";
      res[0].nav += "Previous Post</a>";
    }
    getMaxPostID(function(maxID) {
      if (nextID <= maxID) {
        res[0].nav += "<a class=\"next\" href=\"/blog/" + nextID + "\">";
        res[0].nav += "Next Post</a>";
      }
      callback(res[0]);
    });
  } else {
    callback(res[0]);
  }
}

// ---- [ export functions ] --------------------------------------------------

exports.getBlogPostList = function(callback) {
  db.query("SELECT * FROM blog ORDER BY timecreated DESC",
    function(err, res) {
      for (var i in res) {
        res[i].link = "/blog/" + res[i].blogid;
        res[i].date = getFormattedDate(res[i].timecreated);
      }
      callback(res);
    });
};

exports.getBlogPost = function(id, callback) {
  db.query("SELECT * FROM blog WHERE blogid=?",
    [id],
    function(err, res) {
      formatBlogPost(res, false, true, function(data) {
        data.content = data.content.replace(/(&lt;([^>]+)&gt;)/gi, "");
        callback(data);
      });
    });
};

exports.getBlogPostPreview = function(callback) {
  getMaxPostID(function(id) {
    db.query("SELECT * FROM blog WHERE blogid=?",
      [id],
      function(err, res) {
        formatBlogPost(res, true, false, function(data) {
          callback(data);
        });
      });
  });
};
