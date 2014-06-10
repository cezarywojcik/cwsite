/**
 * File: app.js
 * Desc: This is the main node app file for cezarywojcik.com
 */

// ---- [ includes ] ----------------------------------------------------------

var express = require("express");
var jade = require("jade");
var routes = require("./routes");

// ---- [ setup ] -------------------------------------------------------------

var app = express();
app.engine("jade", jade.__express);
app.set("view engine", "jade");
app.set("view options", {
  layout: false
});
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// ---- [ routing ] -----------------------------------------------------------

app.get("/", routes.home);
app.get("/blog", routes.bloglist);
app.get("/about", routes.about);
app.get("/contact", routes.contact.get);
app.post("/contact", routes.contact.post);
app.get("/gallery", routes.gallery);
app.get("/rss", routes.rss);
app.get("/:year/:month/:day/:title", routes.blogpost);
app.get("/:year/:month?/:day?", routes.bloglist);
app.get('/*', routes.error);

// ---- [ run server ] --------------------------------------------------------

var server = app.listen(3000, function() {
  console.log("Listening on port %d", server.address().port);
});
