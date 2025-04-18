const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const {Message} = require("../models/message");

router.post("/send", async (req, res) => {
  const { fullName, email, mobile, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL,
      subject: `New message from portfolio: ${subject}`,
      text: `
        Name: ${fullName}
        Email: ${email}
        Mobile: ${mobile}
        Subject: ${subject}
        Message: ${message}
        `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Save to DB
    const newMessage = new Message({
      fullName,
      email,
      mobile,
      subject,
      message,
    });

    await newMessage.save();

    res.status(200).json({ message: "Message sent successfully. Thankyou..." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

router.get(`/`, async (req, res) => {
    const emailList = await Message.find();

    if(!emailList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(emailList);
})

module.exports = router;
