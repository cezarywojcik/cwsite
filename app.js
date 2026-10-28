/**
 * File: app.js
 * Desc: This is the main node app file for cezarywojcik.com
 */

// ---- [ includes ] ----------------------------------------------------------

var express = require("express");
var helmet = require("helmet");
var logger = require("./logger.js");
var routes = require("./routes");
var settings = require("./settings.js");

// ---- [ setup ] -------------------------------------------------------------

var app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// The layout relies on inline scripts plus Google Analytics and Disqus, so a
// Content-Security-Policy would need to be tailored before it can be enabled.
// HSTS is left to whatever terminates TLS, images must stay embeddable in feed
// readers, and Disqus needs the referrer to verify the site's domain.
app.use(helmet({
  contentSecurityPolicy: false,
  strictTransportSecurity: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

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
app.get("/privacy", routes.privacy);
app.get("/:year/:month/:day/:title", routes.blogpost);
app.get("/:year{/:month}{/:day}", routes.bloglist);
app.use(routes.error);

// ---- [ run server ] --------------------------------------------------------

var server = app.listen(settings.port, function(err) {
  if (err) {
    logger.log("failed to start server", "app.js", "listen", err);
    process.exit(1);
  }
  logger.log("CezaryWojcik.com started on port " + server.address().port);
});
