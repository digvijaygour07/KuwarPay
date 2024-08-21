const fs = require('fs');
const nodemailer = require('nodemailer');

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

const createOrder = async (formData) => {
  if (!isOrdersLoaded) {
    await loadOrders();
  }
  const newOrder = { id: orders.length + 1, ...formData };
  orders.push(newOrder);
  await saveOrders();
  return newOrder;
};

const getOrders = () => {
  if (!isOrdersLoaded) {
    throw new Error('Orders not loaded yet');
  }
  return orders;
};

const getOrderById = (id) => {
  if (!isOrdersLoaded) {
    throw new Error('Orders not loaded yet');
  }
  return orders.find((order) => order.id === parseInt(id));
};

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

export default= {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  sendEmail,
};