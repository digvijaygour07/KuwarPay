const express = require('express');
const app = express();
const port = 5500;
const fs = require('fs');
const orders = require('./orders');

app.use(express.json());

app.post('/orders', (req, res) => {
  const formData = req.body;
  console.log(formData); // Log the form data to the terminal
  orders.createOrder(formData);
  res.send('Order received!');
});

app.get('/orders', (req, res) => {
  const allOrders = orders.getOrders();
  res.json(allOrders);
});

app.get('/orders/:id', (req, res) => {
  const id = req.params.id;
  const order = orders.getOrderById(id);
  res.json(order);
});

app.put('/orders/:id', (req, res) => {
  const id = req.params.id;
  const updatedFormData = req.body;
  orders.updateOrder(id, updatedFormData);
  res.send('Order updated!');
});

app.delete('/orders/:id', (req, res) => {
  const id = req.params.id;
  orders.deleteOrder(id);
  res.send('Order deleted!');
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