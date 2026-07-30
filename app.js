/**
 * File: app.js
 * Desc: This is the main node app file for cezarywojcik.com
 */

// ---- [ includes ] ----------------------------------------------------------

var express = require("express");
var pug = require("pug");
var logger = require("./logger.js");
var routes = require("./routes");
var settings = require("./settings.js");

// ---- [ setup ] -------------------------------------------------------------

var app = express();
app.engine("pug", pug.__express);
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.get("/*", routes.error);

// ---- [ run server ] --------------------------------------------------------

var server = app.listen(settings.port, function() {
  logger.log("CezaryWojcik.com started on port " + server.address().port);
});
