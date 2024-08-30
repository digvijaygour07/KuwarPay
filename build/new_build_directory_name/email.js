const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: 'STARTTLS', // Use STARTTLS for better security
  auth: {
    user: 'artbaba2007@gmail.com', // Replace with your Gmail address
    pass: 'khatra1234', // Replace with your Gmail password (consider using environment variables or a secrets manager for better security)
  },
});

// Function to send an email
const sendEmail = async (to, formData) => {
  try {
    // Mail options
    const mailOptions = {
      from: 'artbaba2007@gmail.com', // Replace with your email address
      to: to, // Use the provided 'to' address
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
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Export the sendEmail function
module.exports= sendEmail;