exports.port = 3000;
exports.authorEmail = "test@example.com";

// Used for absolute links in the RSS feed, e.g. "https://cezarywojcik.com".
// Falls back to the request's Host header when unset.
exports.siteUrl = "";

// Optional nodemailer transport options for the contact form. Defaults to the
// local sendmail binary. See https://nodemailer.com/transports/
// exports.mailTransport = { host: "smtp.example.com", port: 587, auth: { user: "", pass: "" } };
