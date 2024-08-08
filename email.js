const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'artbaba2007@gmail.com', // Replace with your Gmail address
    pass: 'khatra1234', // Replace with your Gmail password
  },
});

// Function to send an email
const sendEmail = (to, formData) => {
  // Mail options
  const mailOptions = {
    from: 'artbaba2007@gmail.com', // Replace with your email address
    to: 'digvijaygour8@gmail.com',
    subject: 'New Order Received',
    html: `
      <h2>New Order Received</h2>
      <p>Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Phone: ${formData.phone}</p>
      <p>Address: ${formData['address-line1']}, ${formData['address-line2']}, ${formData.city}, ${formData.state}, ${formData.pincode}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Export the sendEmail function
module.exports = sendEmail;