const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const loginRouter = require('express').Router();
require("dotenv").config();
const nodemailer = require('nodemailer');

const User = require('../models/User');

loginRouter.post('/', async (request, response) => {
  const { userEmail, userPassword } = request.body;

  try {
    const user = await User.findOne({ userEmail });

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(userPassword, user.userPassword);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      });
    }

    const userForToken = {
      userEmail: user.userEmail,
      id: user._id,
      userType: user.userType,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(200)
      .send({ token, user: user });
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: 'An error occurred during login' });
  }
});


// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'hotmail', etc.
  auth: {
    user: 'rapidaidnetwork@gmail.com', // your email address
    pass: 'iagr nmox ivuk pcdo' // your email password
  }
});

loginRouter.post('/forgot-password', async (request, response) => {
  const { userEmail } = request.body;

  try {
    const user = await User.findOne({ userEmail });

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    await user.save();

    // Send email to user with reset token and instructions
    const mailOptions = {
      from: 'your_email@example.com',
      to: user.userEmail,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested to reset the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to reset your password:\n\n`
        + `http://localhost:5173/reset-password/${resetToken}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        response.status(500).json({ error: 'An error occurred while sending the reset password email' });
      } else {
        console.log('Email sent:', info.response);
        response.status(200).json({ message: 'Password reset instructions sent to your email' });
      }
    });
  } catch (error) {
    console.error('Error in forgot-password route:', error);
    response.status(500).json({ error: 'An error occurred while processing the forgot password request' });
  }
});

loginRouter.post('/reset-password', async (request, response) => {
  const { resetToken, newPassword } = request.body;

  try {
    const user = await User.findOne({ resetToken });

    if (!user) {
      return response.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.userPassword = hashedPassword;
    user.resetToken = undefined;
    await user.save();

    response.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error in reset-password route:', error);
    response.status(500).json({ error: 'An error occurred while resetting the password' });
  }
});

module.exports = loginRouter;