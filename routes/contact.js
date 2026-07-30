/**
 * File: contact.js
 * Desc: the /contact route
 */

var nodemailer = require("nodemailer");
var settings = require("../settings.js");
var validator = require("validator");

exports.contact = {};

exports.contact.get = function(req, res) {
  res.render("contact", {
    title: "Contact Me"
  });
};

exports.contact.post = function(req, res) {
  var to = settings.authorEmail;

  var name, email, message;
  var fail = false;
  var errors = [];
  var article = {};

  if (!req.body.name || req.body.name.length === 0) {
    errors.push("The name field cannot be empty!");
    fail = true;
  }

  if (!req.body.email || req.body.email.length === 0 ||
    !validator.isEmail(req.body.email)) {
    errors.push("Please enter a valid email!");
    fail = true;
  }

  if (!req.body.message || req.body.message.length === 0) {
    errors.push("The message field cannot be empty!");
    fail = true;
  }

  if (!fail) {
    try {
      name = req.body.name;
      email = req.body.email;
      message = "IP: " + req.ip + "\n";
      message += req.body.message;

      var transporter = nodemailer.createTransport(settings.mailTransport || {
        sendmail: true,
        newline: "unix",
        path: "/usr/sbin/sendmail"
      });

      transporter.sendMail({
        from: name + " <" + email + ">",
        to: to,
        subject: "CW.com - Message",
        text: message
      }, function(err) {
        if (err) {
          console.log(err);
          article = {
            title: "Oh no!",
            content: "There was a problem with sending your message."
          };
        } else {
          article = {
            title: "Message Sent!",
            content: "I'll get back to you as soon as I can."
          };
        }

        res.render("generic", {
          title: "Contact Me",
          article: article
        });
      });
      return;
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
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
  }
};
