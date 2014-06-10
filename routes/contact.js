/**
 * File: contact.js
 * Desc: the /contact route
 */

var jade = require("jade");

exports.contact = {};

exports.contact.get = function(req, res) {
  res.render("contact", {});
};

exports.contact.post = function(req, res) {
  var mail = require("nodemailer").mail;
  var to = require("../settings.js").authorEmail;
  var name, email, message;
  var fail = false;
  var errors = [];
  var article = {};

  if (!req.param("name") || req.param("name").length === 0) {
    errors.push("The name field cannot be empty!");
    fail = true;
  }

  if (!req.param("email") || req.param("email").length === 0) {
    errors.push("The email field cannot be empty!");
    fail = true;
  }

  if (!req.param("message") || req.param("message").length === 0) {
    errors.push("The message field cannot be empty!");
    fail = true;
  }

  if (!fail) {
    try {
      name = req.param("name");
      email = req.param("email");
      message = "IP: " + req.connection.remoteAddress + "\n";
      message += req.param("message");

      mail({
        from: name + "<" + email + ">",
        to: to,
        subject: "CW.com - Message",
        text: message
      });

      article = {
        title: "Message Sent!",
        content: "I'll get back to you as soon as I can."
      };
    } catch (err) {
      console.log(err);
      article = {
        title: "Oh no!",
        content: "There was a problem with sending your message."
      };
    }

    res.render("generic", {
      title: "Contact Me",
      article: article
    });
  } else {
    res.render("contact", {
      errors: errors
    });
  }
};
