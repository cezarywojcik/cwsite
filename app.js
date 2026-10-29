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
// Blog posts load Disqus through an inline script, so a
// Content-Security-Policy would need to be tailored before it can be enabled.
// HSTS is left to whatever terminates TLS, images must stay embeddable in feed
// readers, and Disqus needs the referrer to verify the site's domain and
// window.opener for its login popups.
app.use(helmet({
  contentSecurityPolicy: false,
  strictTransportSecurity: false,
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

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

// Without this, Express's default handler shows stack traces to visitors
// unless NODE_ENV is "production".
app.use(function(err, req, res, next) {
  logger.log("request failed", "app.js", "errorHandler", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).render("generic", {
    title: "Error",
    article: {
      title: "Oh no!",
      content: "Something went wrong with that request."
    }
  });
});

// ---- [ run server ] --------------------------------------------------------

var server = app.listen(settings.port, function(err) {
  if (err) {
    logger.log("failed to start server", "app.js", "listen", err);
    process.exit(1);
  }
  logger.log("CezaryWojcik.com started on port " + server.address().port);
});
