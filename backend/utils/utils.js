const nodemailer = require("nodemailer");

module.exports = {
  sendEmailNotification: (to, subject, message) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aswin1542000@gmail.com",
        pass: "yazrlkyfzlztwzbt",
      },
    });

    const mailOptions = {
      from: "aswin1542000@gmail.com",
      to,
      subject,
      text: message,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  },
};
