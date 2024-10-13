import babel from '@rollup/plugin-babel';
import minify from 'rollup-plugin-minify';
import express, { response } from 'express';
import morgan from 'morgan';
import fs from 'fs/promises';
import WebSocket from 'ws';
import nodemailer from 'nodemailer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import https from 'https';
import http from 'http';
import { EventEmitter } from 'events';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import { createTransport } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 5500;

// SSL Options
const options = {
  key: await readFile('./privateKey.key', 'utf8'),
  cert: await readFile('./certificate.crt', 'utf8'),
};


// Create HTTPS Server
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server listening on port 443');
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://digvijaygour8:djayopbolte1234@kuwarpay1.r5aqmdk.mongodb.net/kuwarpayDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const orderSchema = new mongoose.Schema({
 
  name: String,
  email: String,
  phone: String,
  address_line1: String,
  address_line2: String,
  city: String,
  state: String,
  pincode: Number,
});

const Order = mongoose.model('Order', orderSchema);


const feedbackSchema = new mongoose.Schema({
  question1: String,
  question2: String,
  // Add more feedback questions as needed
});

const Feedback = mongoose.model('Feedback', feedbackSchema);


import Joi from 'joi';

const orderValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address_line1: Joi.string().required(),
  address_line2: Joi.string().optional().allow(''),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.number().required(),
});


app.use(cors());
app.use(express.static('./')); // Serve static files from 'public' directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(dirname(fileURLToPath(import.meta.url)) + "/", {
  extensions: ["html", "js", "mjs"],
  setHeaders: (res) => {
    res.set("Content-Type", "application/javascript");
  }
}
));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error handling request:', err);
  res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});


// CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use((err, req, res, next) => {
  console.error('Error handling request:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.all('*', (req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});


async function createOrder(formData) {
  try {
    const newOrder = new Order(formData);
    const result = await newOrder.save();
    console.log('Order created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    if (error.code === 11000) {
      throw new Error('Email already exists');
    } else {
      throw error;
    }
  }
}


async function getOrders() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

async function getOrderById(id) {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (error) {
    console.error('Error getting order by ID:', error);
    throw error;
  }
}

async function updateOrder(id, updatedFormData) {
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    order.set(updatedFormData);
    const updatedOrder = await order.save();
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}


export async function getOrdersHandler() {
  try {
    const ordersData = await getOrders();
    return {
      statusCode: 200,
      body: JSON.stringify(ordersData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}


export async function getOrderByIdHandler(event) {
  try {
    const id = event.queryStringParameters.id;
    const order = await getOrderById(id);
    if (!order) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Order with ID ${id} not found` }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
 

export async function createOrderHandler(event) {
  try {
    const formData = JSON.parse(event.body);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Order created successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating order' }),
    };
  }
};

export async function updateOrderHandler(event) {
  try {
    const id = event.queryStringParameters.id;
    const updatedFormData = JSON.parse(event.body);
    const updatedOrder = await updateOrder(id, updatedFormData);
    return {
      statusCode: 200,
      body: JSON.stringify(updatedOrder),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating order' }),
    };
  }
};


import { v4 as uuidv4 } from 'uuid'; // or const uniqid = require('uniqid');




// Update the WebSocket route
app.get('/ws', (req, res) => {
  res.send('WebSocket endpoint');
});

app.post('/ws', (req, res) => {
  // Handle POST request
  res.send('WebSocket endpoint');
});


app.post('/', async function (req, res) {
  console.log('POST / route called');
  console.log('Request Body:', req.body);

  try {
    const order = req.body;
    // Validate request body using Joi
    const { error } = orderValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation error', error });
    }

    // Create new order
    const newOrder = new Order({
      
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address_line1: req.body.address_line1,
      address_line2: req.body.address_line2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
 
    });

    const result = await newOrder.save();
   
    const upiPaymentResponse = await generateUPIPaymentIDWithRetry(order);
    await sendEmailToSeller(order); 
    res.redirect(upiPaymentResponse.paymentUrl);
    
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });

  }
});


app.get('/orders', async (req, res) => {
  res.sendFile(__dirname + "/index.html");
  res.sendFile("index.html")
  try {
    const orders = await Order.find().select(['-__v']); // Excludes version key
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'Missing order ID' });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: `Order with ID ${id} not found` });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  try {
    const id = req.params.id;
    const order = await Order.findById(id).select(['-__v']); // Excludes version key
    if (!order) {
      return res.status(404).json({ message: `Order with ID ${id} not found` });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.put('/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'Missing order ID' });
    }
    const updatedFormData = req.body;
    const updatedOrder = await updateOrder(id, updatedFormData);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'Missing order ID' });
    }
    await Order.findByIdAndDelete(id);
    res.json({ message: `Order with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


     // Handle feedback submission
     app.post('/feedback', async (req, res) => {
      try {
        const feedbackData = req.body;
    
        // Validate feedback data
        if (!feedbackData || !feedbackData.question1 || !feedbackData.question2) {
          return res.status(400).json({ message: 'Invalid feedback' });
        }
    
        // Create new Feedback document
        const feedback = new Feedback(feedbackData);
    
        // Save feedback to MongoDB
        const result = await feedback.save();
    
    
        res.json(result);
      } catch (error) {
        console.error('Error storing feedback:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
      
    });
    
app.get('/success', (req, res) => {
  res.send('Payment successful. Order confirmed.');
});

app.get('/failure', (req, res) => {
  res.send('Payment failed. Please try again.');
});


app.setMaxListeners(30);

import axios from 'axios';
import crypto from 'crypto';
import uniqid from 'uniqid';


// const phonePeClientId = 'YOUR_CLIENT_ID';
  //const phonePeClientSecret = 'YOUR_CLIENT_SECRET';
   //const merchantVpa = 'YOUR_MERCHANT_VPA@upi';


   const saltKey = '96434309-7796-489d-8924-ab56988a6076';
    const saltIndex = 1;
    const phonePeHostUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox'
    const payEndpoint = '/pg/v1/pay'

// Define helper function to generate UPI Payment ID
async function generateUPIPaymentID(order) {
  try {
    // Authorization header using client ID and secret
   
    //const merchantTransactionId = uniqid()
    const orderId = order._id;
    const payload = {
      merchantId: "PGTESTPAYUAT86", 
      merchantTransactionId: uniqid(),
      merchantUserId: "MUID123",
      amount: 49900,
      redirectUrl: `https://kuwarpay.onrender.com//feedback.html?name=${order.name}&email=${order.email}&phone=${order.phone}&address_line1=${order.address_line1}&address_line2=${order.address_line2}&city=${order.city}&state=${order.state}&pincode=${order.pincode}`,
      redirectMode: "REDIRECT",
      callbackUrl: "https://webhook.site/callback-url",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const base64EncodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const checksum = crypto.createHash('sha256');
    checksum.update(base64EncodedPayload + payEndpoint + saltKey);
    const checksumHex = checksum.digest('hex');
    const xVerifyHeader = `${checksumHex}###${saltIndex}`;

  
    const options = {
      method: 'POST',
      url: `${phonePeHostUrl}${payEndpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-VERIFY': xVerifyHeader,
   
      },
      data: {
        request: base64EncodedPayload,
      },
    };

  
    return axios.request(options).then((response) => {
      console.log('Axios Response:', response);
    
      if (response.status === 200) {
        const paymentUrl = response.data.data.instrumentResponse.redirectInfo.url;
        return { paymentUrl };
      } else {
        throw new Error('Error generating UPI Payment ID');
      }
    }).catch((error) => {
     
        console.error('Axios Error:', error.message);
        console.error('Axios Error Response:', error.response);
        console.error('Axios Error Config:', error.config);
        throw error
    });
  } catch (error) {
    console.error('Error generating UPI Payment ID:', error.stack);
    throw error;
  }
} 

async function generateUPIPaymentIDWithRetry(order) {
  const maxRetries = 5;
  const delay = 500;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const upiPaymentResponse = await generateUPIPaymentID(order);
      return upiPaymentResponse;
    } catch (error) {
      console.error(`Retry ${retries + 1} failed:`, error.message);
      console.log('Error response:', error.response?.data);
      console.log('Error config:', error.config);

      if (error.response && error.response.status === 429) {
        retries++;
        console.log(`Retry ${retries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }

  throw new Error('Max retries exceeded');
}


// Define helper function to send email
async function sendEmail(to, userData) {
 
  try {
    const mailOptions  = {
      from:  `"KuwarPay" <${process.env.MY_EMAIL}>`,
      to: 'digvijaygour8@gmail.com',
      subject: 'New Order Confirmation',
      html: `
        <h2>New Order Confirmation</h2>
        <p>User Details:</p>
        <ul>
          <li>Name: ${userData.name}</li>
          <li>Email: ${userData.email}</li>
          <li>Phone: ${userData.phone}</li>
          <li>Address: ${userData.address}</li>
        </ul>
      `,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // or 'STARTTLS'
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    
   
    console.log('Sending email to:', to);

    return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.error('Error sending email:', error);
    reject({ success: false, message: error.message });
    } else {
    console.log('Email sent successfully:', info.response);
    resolve({ success: true, message: 'Email sent successfully' });
    }
    });
    });
    } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message };
    }
    
    }


    

   // app.get('/feedback.html', sendToSeller);

// Generate a unique order ID
 //or const orderId = uniqid();
// Define helper function to send email
async function sendEmailToSeller(orderData) {
  try {
    const userData = {
      name: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      address: `${orderData.address_line1}, ${orderData.address_line2}, ${orderData.city}, ${orderData.state} - ${orderData.pincode}`,
    };

    const sellerEmail = 'digvijaygour8@gmail.com';
    const emailResult = await sendEmail(sellerEmail, userData);
    console.log('Email sending result:', emailResult);
    if (!emailResult.success) {
      console.error('Error sending email:', emailResult.message);
    }
  } catch (error) {
    console.error(error);
  }
}

// Catch-all route for 404 errors
app.use((_req, res) => {
  res.status(404).send('Route not found');
});

app.use((req, res, next) => {
  console.log(`Request ${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});