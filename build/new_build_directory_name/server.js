import express from 'express';
const app = express();
const port = 5500;
import cors from 'cors';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import fs from 'fs';
import WebSocket from 'ws';

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

// Save orders to file
const saveOrders = async () => {
  try {
    await fs.promises.writeFile('orders.json', JSON.stringify(orders, null, 2));
    console.log('Orders saved to orders.json');
  } catch (err) {
    console.error('Error saving orders:', err);
  }
};

// Create a new order
const createOrder = async (formData) => {
  try {
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    const newOrder = { id: orders.length + 1, ...formData };
    orders.push(newOrder);
    await saveOrders();
    console.log('New order created:', newOrder);
    console.log('Orders:', orders);
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get all orders
const getOrders = () => {
  if (!isOrdersLoaded) {
    throw new Error('Orders not loaded yet');
  }
  return orders;
};

// Get an order by ID
const getOrderById = (id) => {
  if (!isOrdersLoaded) {
    throw new Error('Orders not loaded yet');
  }
  const orderId = parseInt(id, 10);
  if (isNaN(orderId)) {
    throw new Error(`Invalid order ID: ${id}`);
  }
  return orders.find((order) => order.id === orderId);
};

// Update an order
const updateOrder = async (id, updatedFormData) => {
  try {
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      throw new Error(`Invalid order ID: ${id}`);
    }
    const index = orders.findIndex((order) => order.id === orderId);
    if (index !== -1) {
      orders[index] = { id: orderId, ...updatedFormData };
      await saveOrders();
      return orders[index];
    } else {
      throw new Error(`Order with ID ${id} not found`);
    }
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Delete an order
const deleteOrder = async (id) => {
  try {
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) {
      throw new Error(`Invalid order ID: ${id}`);
    }
    const index = orders.findIndex((order) => order.id === orderId);
    if (index !== -1) {
      orders.splice(index, 1);
      await saveOrders();
    } else {
      throw new Error(`Order with ID ${id} not found`);
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Set up nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password',
  },
});

// Send email function
const sendEmail = async (to, order) => {
  try {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject: 'Order Confirmation',
      text: `Order ${order.id} has been confirmed.`,
    };
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

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
if (!paymentResponse || !paymentResponse.orderId || !paymentResponse.status) {
  return res.status(400).send('Invalid payment response');
}
const orderId = paymentResponse.orderId;
const order = await getOrderById(orderId);
if (!order) {
  return res.status(404).send(`Order with ID ${orderId} not found`);
}
if (paymentResponse.status === 'success') {
  order.status = 'paid';
  await updateOrder(orderId, order);
  const sellerEmail = 'digvijaygour8@gmail.com';
  await sendEmail(sellerEmail, order); // Call the sendEmail function here
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

app.listen(port, () => {
console.log(`Server started on port ${port}`);
});