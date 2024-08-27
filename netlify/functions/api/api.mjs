import { fileURLToPath } from 'url';


// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

import babel from '@rollup/plugin-babel';
import minify from 'rollup-plugin-minify';

export default {
  input: 'netlify/functions/api/api.js',
  output: {
    file: 'netlify/functions/api.js',
    format: 'cjs',
    sourcemap: 'inline' // Added sourcemap
  },
  plugins: [
    babel({
      babelHelpers: 'bundled' // Added babelHelpers
    }),
    minify()
  ]
};

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import WebSocket from 'ws';
import nodemailer from 'nodemailer';

const app = express();
const port = 5502;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load orders from file
let orders = [];
let isOrdersLoaded = false;

// Load orders initially
const loadOrders = async () => {
  try {
    const data = await fs.promises.readFile('orders.json', 'utf8');
    try {
      orders = JSON.parse(data);
    } catch (err) {
      console.error('Error parsing orders.json:', err);
      orders = [];
    }
    isOrdersLoaded = true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.promises.writeFile('orders.json', JSON.stringify([]));
      isOrdersLoaded = true;
    } else {
      throw err;
    }
  }
};


// Handle form submission and save to order.json
export async function handleBuyNow(event) {
  try {
    const formData = JSON.parse(event.body);
    if (!formData || Object.keys(formData).length === 0) {
      return { statusCode: 400, body: 'No form data received' };
    }

    // Save form data to order.json
    const orders = await loadOrders();
    orders.push(formData);
    await saveOrders(orders);

    // Return success response
    return { statusCode: 200, body: 'Form submitted successfully!' };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
}

// Load orders from file
async function loadOrders() {
  try {
    const data = await fs.promises.readFile('orders.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    } else {
      throw err;
    }
  }
}

// Save orders to file
async function saveOrders(orders) {
  try {
    await fs.promises.writeFile('orders.json', JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Error saving orders:', err);
  }
}



// Create a new order
const createOrder = async (req, res) => {
  try {
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    const newOrder = { id: orders.length + 1, ...req.body };
    orders.push(newOrder);
    await saveOrders();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  if (!isOrdersLoaded) {
    await loadOrders();
  }
  res.json(orders);
};

// Get an order by ID
const getOrderById = async (req, res) => {
  if (!isOrdersLoaded) {
    await loadOrders();
  }
  const orderId = parseInt(req.params.id, 10);
  if (isNaN(orderId)) {
    res.status(400).json({ message: 'Invalid order ID' });
    return;
  }
  const order = orders.find((order) => order.id === orderId);
  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }
  res.json(order);
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) {
      res.status(400).json({ message: 'Invalid order ID' });
      return;
    }
    const index = orders.findIndex((order) => order.id === orderId);
    if (index === -1) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    orders[index] = { id: orderId, ...req.body };
    await saveOrders();
    res.json(orders[index]);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order' });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) {
      res.status(400).json({ message: 'Invalid order ID' });
      return;
    }
    const index = orders.findIndex((order) => order.id === orderId);
    if (index === -1) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    orders.splice(index, 1);
    await saveOrders();
    res.status(204).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
};

// API Endpoints
app.post('/api/create-order', createOrder);
app.get('/api/get-orders', getOrders);
app.get('/api/get-order/:id', getOrderById);
app.put('/api/update-order/:id', updateOrder);
app.delete('/api/delete-order/:id', deleteOrder);



// Send email using Nodemailer
async function sendEmail(to, order) {
  try {
    // Create transporter object
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Define mailOptions object
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Order Confirmation',
      html: `
        <h2>Order Confirmation</h2>
        <p>Order ID: ${order.id}</p>
        <p>Order Details: ${JSON.stringify(order)}</p>
      `,
    };

    // Asynchronous function to send the email
    async function sendMail() {
      try {
        // Send email using transporter
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
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

// Define the API endpoint
 async function handler(event) {
  try {
  // Handle POST requests
  if (event.request.method === 'POST') {
  // Process the request body
  const data = await event.request.json();
  // Send an email using the sendEmail function
  const response = await sendEmail(data.to, data.order);
  return response;
  } else {
  // Return a 405 error for non-POST requests
  return {
  status: 405,
  body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
  }
  } catch (error) {
  console.error(error);
  return {
  status: 500,
  body: JSON.stringify({ message: 'Internal Server Error' }),
  };
  }
  }


    // Call the sendMail function and return its result
    return sendMail();
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email.' }),
    };
  }
}

// Handle the request
exports.handler = async function (event, context) {
  console.log('Event:', event);
  console.log('Context:', context);
  const to = 'recipient@example.com'; // Replace with the recipient's email
  const order = { id: '12345', details: 'Order details' }; // Replace with the order details
  return sendEmail(to, order);
};

// Handle payment confirmation
app.post('/payment-confirmation', async (req, res) => {
  try {
    const paymentResponse = req.body;
    const orderId = paymentResponse.orderId;
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).send(`Order with ID ${orderId} not found`);
    }
    if (paymentResponse.status === 'success') {
      order.status = 'paid';
      await updateOrder(orderId, order);
      const sellerEmail = 'digvijaygour8@gmail.com';
      await sendEmail(sellerEmail, order); // Send email to seller
      res.redirect('/feedback'); // Redirect user to feedback page
    } else {
      res.send('Payment failed. Please try again.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Success page
app.get('/success', (req, res) => {
  res.send('Payment successful. Order confirmed.');
});

// Failure page
app.get('/failure', (req, res) => {
  res.send('Payment failed. Please try again.');
});

// Handle feedback submission
app.post('/feedback', async (req, res) => {
  try {
    const feedback = req.body;
    if (!feedback || !feedback.question1 || !feedback.question2) {
      return res.status(400).json({ message: 'Invalid feedback' });
    }
    const feedbackJson = JSON.stringify(feedback, null, 2);
    await fs.promises.appendFile('feedback.json', feedbackJson + '\n');
    res.json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'artbaba2007@gmail.com',
      pass: process.env.EMAIL_PASSWORD, // Use environment variable
    },
  });

  const mailOptions = {
    from: 'artbaba2007@gmail.com',
    to: to,
    subject: 'Order Confirmation',
    html: `
      <h2>Order Confirmation</h2>
      <p>Order ID: ${order.id}</p>
      <p>Order Details: ${JSON.stringify(order)}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Added route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});
// Create a new order with PhonePe deep link
app.post('/orders', async (req, res) => {
  try {
    const formData = req.body;
    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).send('No form data received');
    }

    const newOrder = await createOrder(formData);
    const deepLinkUrl = await generatePhonePeLink(newOrder);

    console.log('Generated Deep Link:', deepLinkUrl);

  // Redirect to UPI app with pre-filled details and amount
    res.redirect(deepLinkUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const generatePhonePeLink = async (order) => {
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
};
  // Get all orders
  app.get('/orders', async (req, res) => {
    try {
      const ordersData = await getOrders();
      res.json(ordersData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Get an order by ID
  app.get('/orders/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const order = await getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: `Order with ID ${id} not found` });
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Update an order
  app.put('/orders/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updatedFormData = req.body;
      if (!updatedFormData || Object.keys(updatedFormData).length === 0) {
        return res.status(400).send('No form data received');
      }
      const order = await getOrderById(id);
      if (!order) {
        return res.status(404).send(`Order with ID ${id} not found`);
      }
      const updatedOrder = await updateOrder(id, updatedFormData);
      res.json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Delete an order
  app.delete('/orders/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const order = await getOrderById(id);
      if (!order) {
        return res.status(404).send(`Order with ID ${id} not found`);
      }
      const deletionMessage = await deleteOrder(id);
      res.send(deletionMessage);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Handle payment confirmation
app.post('/payment-confirmation', async (req, res) => {
  try {
    const paymentResponse = req.body;
    const orderId = paymentResponse.orderId;
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).send(`Order with ID ${orderId} not found`);
    }
    if (paymentResponse.status === 'success') {
      order.status = 'paid';
      await updateOrder(orderId, order);
      const sellerEmail = 'digvijaygour8@gmail.com';
      await sendEmail(sellerEmail, order); // Add await here
      res.send(`
        <h2>Payment Successful!</h2>
        <p>Thank you for your payment. Your order will be processed soon.</p>
        <h3>Feedback</h3>
        <form id="feedback-form">
          <label for="feedback">How was your experience?</label>
          <textarea id="question1" name="question1"></textarea>
          <textarea id="question2" name="question2"></textarea>
          <button>Submit Feedback</button>
        </form>
        <script src="feedback.js"></script>
      `);
    } else {
      res.send('Payment failed. Please try again.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
  
  // Handle feedback submission
  app.post('/feedback', async (req, res) => {
    try {
      const feedback = req.body;
      const feedbackJson = JSON.stringify(feedback, null, 2);
      await fs.promises.appendFile('feedback.json', feedbackJson + '\n');
      res.send('Feedback submitted successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
 app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


  
