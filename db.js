/**
 * File: gallery.js
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
      var result = {};
      res[0].timecreated = getFormattedDate(res[0].timecreated);
      res[0].nav = "nav";
      res[0].blogpost = "YOLO";
      res[0].content = res[0].content.toString('utf-8');
      if (res[0].content.substr(0, 3) === "MD-") {
        // markdown
        res[0].content = md.toHTML(res[0].content.substr(4));
      }
      callback(res[0]);
    });
};
