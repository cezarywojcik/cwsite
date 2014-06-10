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
app.get("/blog", routes.blog);
app.get("/:year/:month/:day/:title", routes.blogpost);
app.get("/about", routes.about);
app.get("/contact", routes.contact);
app.get("/gallery", routes.gallery);
app.get('/*', routes.error);

// ---- [ run server ] --------------------------------------------------------

var server = app.listen(3000, function() {
  console.log("Listening on port %d", server.address().port);
});
