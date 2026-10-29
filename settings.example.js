exports.port = 3000;
exports.authorEmail = "test@example.com";

// Used for absolute links in the RSS feed, e.g. "https://cezarywojcik.com".
// Falls back to the request's Host header when unset.
exports.siteUrl = "";

// Optional nodemailer transport options for the contact form. Defaults to the
// local sendmail binary. See https://nodemailer.com/transports/
// exports.mailTransport = { host: "smtp.example.com", port: 587, auth: { user: "", pass: "" } };

// Set when running behind a reverse proxy (e.g. nginx) so visitor IPs come
// from X-Forwarded-For; the contact form's rate limit is per IP and would
// otherwise treat every visitor as the proxy. 1 means one proxy hop.
// See https://expressjs.com/en/guide/behind-proxies.html
// exports.trustProxy = 1;
