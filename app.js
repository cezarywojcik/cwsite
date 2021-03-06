/**
 * File: app.js
 * Desc: This is the main node app file for cezarywojcik.com
 */

// ---- [ includes ] ----------------------------------------------------------

var express = require("express");
var bodyParser = require("body-parser");
var jade = require("jade");
var logger = require("./logger.js");
var routes = require("./routes");
var settings = require("./settings.js");

// ---- [ setup ] -------------------------------------------------------------

var app = express();
app.engine("jade", jade.__express);
app.set("view engine", "jade");
app.set("view options", {
  layout: false
});
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());

// ---- [ routing ] -----------------------------------------------------------

app.get("/", routes.home);
app.get("/blog", routes.bloglist);
app.get("/blog/:id", routes.legacyblogpost);
app.get("/about", routes.about);
app.route("/contact")
  .get(routes.contact.get)
  .post(routes.contact.post);
app.get("/gallery", routes.gallery);
app.get("/rss", routes.rss);
app.get("/:year/:month/:day/:title", routes.blogpost);
app.get("/:year/:month?/:day?", routes.bloglist);
app.get('/*', routes.error);

// ---- [ run server ] --------------------------------------------------------

var server = app.listen(settings.port, function() {
  logger.log("CezaryWojcik.com started on port " + server.address().port);
});
