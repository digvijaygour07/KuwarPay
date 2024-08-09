const express = require('express');
const app = express();
const port = 5500;
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const fs = require('fs');
const WebSocket = require('ws');

// Load orders from file
let orders = [];
let isOrdersLoaded = false;

const loadOrders = async () => {
  try {
    const data = await fs.promises.readFile('orders.json', 'utf8');
    orders = JSON.parse(data);
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
  await fs.promises.writeFile('orders.json', JSON.stringify(orders, null, 2));
  console.log('Orders saved to orders.json');
};

// Create a new order
const createOrder = async (formData) => {
  if (!isOrdersLoaded) {
    await loadOrders();
  }
  const newOrder = { id: orders.length + 1, ...formData };
  orders.push(newOrder);
  await saveOrders();
  console.log('New order created:', newOrder);
  console.log('Orders:', orders);
  return newOrder;
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
  return orders.find((order) => order.id === parseInt(id));
};

// Update an order
const updateOrder = async (id, updatedFormData) => {
  if (!isOrdersLoaded) {
    await loadOrders();
  }
  const index = orders.findIndex((order) => order.id === parseInt(id));
  if (index !== -1) {
    orders[index] = { id: parseInt(id), ...updatedFormData };
    await saveOrders();
    return orders[index];
  } else {
    throw new Error(`Order with ID ${id} not found`);
  }
};

// Delete an order
const deleteOrder = async (id) => {
  if (!isOrdersLoaded) {
    await loadOrders();
  }
  const index = orders.findIndex((order) => order.id === parseInt(id));
  if (index !== -1) {
    orders.splice(index, 1);
    await saveOrders();
    return `Order with ID ${id} deleted`;
  } else {
    throw new Error(`Order with ID ${id} not found`);
  }
};

// Load orders initially
loadOrders();

const sellerPhonePeId = '9822242222@ybl'; // Replace with your actual PhonePe ID
const sellerName = 'mahendra gour'; // Replace with your actual name
const paymentAmount = 1;
const paymentDescription = 'Half Sleeve Casual Shirt for Men';

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

    const deepLinkUrl = `upi://pay?pa=${sellerPhonePeId}&pn=${encodeURIComponent(sellerName)}&am=${paymentAmount}&tn=${paymentDescription}&cu=INR`;
    console.log('Generated PhonePe Deep Link:', deepLinkUrl);

    // Redirect to PhonePe with pre-filled details and amount
    res.redirect(deepLinkUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const ordersData = await getOrders();
    res.send(ordersData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
    res.send(updatedOrder);
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
      sendEmail(sellerEmail, order);
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

// Define the sendEmail function
function sendEmail(to, order) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'artbaba2007@gmail.com',
      pass: 'khatra', // Replace with your actual password
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});