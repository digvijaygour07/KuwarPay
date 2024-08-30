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

let orders = [];
let isOrdersLoaded = false;

const loadOrders = async () => {
  try {
    const data = await fs.promises.readFile('orders.json', 'utf8');
    if (data) {
      orders = JSON.parse(data);
    } else {
      await fs.promises.writeFile('orders.json', JSON.stringify([]));
    }
    isOrdersLoaded = true;
  } catch (error) {
    console.error(error);
  }
};

const saveOrders = async () => {
  try {
    await fs.promises.writeFile('orders.json', JSON.stringify(orders));
  } catch (error) {
    console.error(error);
  }
};

const validateFormData = (formData) => {
  if (!formData || Object.keys(formData).length === 0) {
    throw new Error('No form data received');
  }
  if (!formData.name || !formData.email || !formData.phone) {
    throw new Error('Please fill in all required fields');
  }
  return true;
};

const createOrder = async (formData) => {
  try {
    await validateFormData(formData);
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    const newOrder = { id: orders.length + 1, ...formData };
    orders.push(newOrder);
    await saveOrders();
    return newOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getOrders = async () => {
  try {
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getOrderById = async (id) => {
  try {
    if (!isOrdersLoaded) {
      await loadOrders();
    }
    return orders.find((order) => order.id === parseInt(id));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateOrder = async (id, updatedFormData) => {
  try {
    await validateFormData(updatedFormData);
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteOrder = async (id) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const sendEmail = async (to, order) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'artbaba2007@gmail.com',
        pass: 'khatra1234',
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

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error(error);
  }
};

loadOrders();

app.post('/api/order', async (req, res) => {
  try {
    const newOrder = await createOrder(req.body);
    await sendEmail(req.body.email, newOrder);
    res.json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const ordersList = await getOrders();
    res.json(ordersList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).send(`Order with ID ${req.params.id} not found`);
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await updateOrder(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const message = await deleteOrder(req.params.id);
    res.send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 5502;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports app;