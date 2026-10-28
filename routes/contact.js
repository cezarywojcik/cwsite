/**
 * File: contact.js
 * Desc: the /contact route
 */

var nodemailer = require("nodemailer");
var validator = require("validator");
var settings = require("../settings.js");

var transporter = nodemailer.createTransport(settings.mailTransport ||
  { sendmail: true });

var MAX_LENGTHS = { name: 200, email: 254, message: 10000 };

// Repeated form fields arrive as arrays, so only accept plain strings.
function field(req, name) {
  var value = req.body && req.body[name];
  return typeof value === "string" ? value.trim() : "";
}

exports.contact = {};

exports.contact.get = function(req, res) {
  res.render("contact", {
    title: "Contact Me"
  }); 
};

exports.contact.post = async function(req, res) {
  var name = field(req, "name");
  var email = field(req, "email");
  var message = field(req, "message");
  var errors = [];
  var article = {};

  if (name.length === 0) {
    errors.push("The name field cannot be empty!");
  } else if (name.length > MAX_LENGTHS.name) {
    errors.push("Your name is too long!");
  }

  if (email.length === 0 || email.length > MAX_LENGTHS.email ||
    !validator.isEmail(email)) {
    errors.push("Please enter a valid email!");
  }

  if (message.length === 0) {
    errors.push("The message field cannot be empty!");
  } else if (message.length > MAX_LENGTHS.message) {
    errors.push("Your message is too long!");
  }

  if (errors.length > 0) {
    return res.status(400).render("contact", {
      title: "Contact Me",
      errors: errors,
      name: name,
      email: email,
      message: message
    });
  }

  try {
    // Visitor input stays out of From so it can't forge or inject the sender.
    await transporter.sendMail({
      from: settings.authorEmail,
      to: settings.authorEmail,
      replyTo: { name: name, address: email },
      subject: "CW.com - Message",
      text: "From: " + name + " <" + email + ">\n" +
        "IP: " + req.ip + "\n\n" +
        message
    });

    article = {
      title: "Message Sent!",
      content: "I'll get back to you as soon as I can."
    };
  } catch (err) {
    console.log(err);
    res.status(500);
    article = {
      title: "Oh no!",
      content: "There was a problem with sending your message."
    };
  }

  res.render("generic", {
    title: "Contact Me",
    article: article
  });
};
