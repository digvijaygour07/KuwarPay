const fs = require('fs');
const nodemailer = require('nodemailer');

let orders = [];
let isOrdersLoaded = false;

const loadOrders = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('orders.json', (err, data) => {
      if (err) {
        reject(err);
      } else if (data) {
        orders = JSON.parse(data);
        isOrdersLoaded = true;
        resolve();
      } else {
        fs.writeFile('orders.json', JSON.stringify([]), (err) => {
          if (err) {
            reject(err);
          } else {
            isOrdersLoaded = true;
            resolve();
          }
        });
      }
    });
  });
};

const saveOrders = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile('orders.json', JSON.stringify(orders), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
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

const sendEmail = (to, order) => {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

loadOrders();

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  sendEmail,
};