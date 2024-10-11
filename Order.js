import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import nodemailer from 'nodemailer';

const app = express();
const port = 5502;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Order.js
import mongoose from 'mongoose';

// Define the order schema
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: Number,
  },
});

// Create a model for the orders collection
const Order = mongoose.model('orders', orderSchema);

// Export the Order model and necessary functions
export { Order };

// Export the createOrder function
export async function createOrder(formData) {
  try {
    console.log('Creating order:', formData);
    const result = await Order.create(formData);
    console.log('Order created:', result);
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Export the getOrders function
export async function getOrders() {
  try {
    const ordersData = await Order.find().exec();
    return ordersData;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}

// Export the getOrderById function
export async function getOrderById(id) {
  try {
    const order = await Order.findById(id).exec();
    return order;
  } catch (error) {
    console.error('Error getting order by ID:', error);
    throw error;
  }
}

// Export the updateOrder function
export async function updateOrder(id, updatedFormData) {
  try {
    const order = await getOrderById(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    const updatedOrder = { ...order, ...updatedFormData };
    await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

// Export the sendEmail function
export async function sendEmail(to, order) {
  try {
    const mailOptions = {
      from: 'artbaba2007@gmail.com',
      to: 'digvijaygour8@gmail.com',
      subject: 'Order Confirmation',
      html: `
        <h2>Order Confirmation</h2>
        <p>Order ID: ${order.id}</p>
        <p>Order Details: ${JSON.stringify(order)}</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email.' }),
    };
  }
}

// Export the generatePhonePeLink function
export async function generatePhonePeLink(order) {
  try {
    const upiId = '9822242222@axl'; // Replace with your UPI ID
    const name = 'mahendra gour'; // Replace with your name
    const amount = order.amount; // Replace with the order amount
    const description = order.description; // Replace with the order description

    // Create a new PhonePe deep link
    const deepLink = `phonepe://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&tn=${encodeURIComponent(description)}&cu=INR`;

    return deepLink;
  } catch (error) {
    console.error('Error generating PhonePe deep link:', error);
    throw error;
  }
}

const PORT = process.env.PORT || 5502;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});