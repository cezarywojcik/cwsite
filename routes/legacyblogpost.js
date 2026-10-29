/**
 * File: legacyblogpost.js
 * Desc: the /blog/:id route if links from old website are around
 */

var pm = require("../postmanager.js");

exports.legacyblogpost = function(req, res) {
  var id = req.params.id;
  var postURL = pm.getPostURLById(id);
  res.redirect(postURL);
};
