const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your.email@gmail.com', // Your Gmail email address
    pass: 'your_password' // Your Gmail password
  }
});

const sendEmailNotification = async (email, message) => {
  try {
    await transporter.sendMail({
      from: 'your.email@gmail.com', // Your Gmail email address
      to: email,
      subject: 'Emergency Alert',
      text: message
    });
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};

module.exports = {
  sendEmailNotification
};