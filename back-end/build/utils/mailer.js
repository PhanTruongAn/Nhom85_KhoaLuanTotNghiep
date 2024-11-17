"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailer = void 0;
var nodeMailer = require("nodemailer");
var email = process.env.EMAIL;
var password = process.env.EMAIL_PASSWORD;
var mailHost = "smtp.gmail.com";
var mailPort = 587;
var transporter = nodeMailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: false,
  auth: {
    user: email,
    pass: password
  }
});
var mailer = exports.mailer = {
  sendMail: function sendMail(to, subject, htmlContent) {
    var options = {
      from: email,
      to: to,
      subject: subject,
      html: htmlContent
    };
    return transporter.sendMail(options);
  }
};

// module.exports = mailer;