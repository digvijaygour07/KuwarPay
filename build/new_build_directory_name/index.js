const express = require('express');
const app = express();
const port = 5500;
const fs = require('fs');
const orders = require('./orders');

app.use(express.json());

// Create a new order
app.post('/orders', async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData); // Log the form data to the terminal
    const newOrder = await orders.createOrder(formData);
    res.json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});

// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const allOrders = await orders.getOrders();
    res.json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting orders');
  }
});

// Get an order by ID
app.get('/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orders.getOrderById(id);
    if (!order) {
      res.status(404).send('Order not found');
    } else {
      res.json(order);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting order');
  }
});

// Update an order
app.put('/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFormData = req.body;
    const updatedOrder = await orders.updateOrder(id, updatedFormData);
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order');
  }
});

// Delete an order
app.delete('/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await orders.deleteOrder(id);
    res.send('Order deleted!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting order');
  }
});

const WebSocket = require('ws');
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
  console.log(`Server listening on port ${port}`);
});