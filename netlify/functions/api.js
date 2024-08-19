import 'url';
import babel from '@rollup/plugin-babel';

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
var handler = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
    var subject;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          subject = event.queryStringParameters.name || 'World';
          return _context.abrupt("return", {
            statusCode: 200,
            body: JSON.stringify({
              message: "Hello ".concat(subject)
            })
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
          });
        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            statusCode: 500,
            body: _context.t0.toString()
          });
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 5]]);
  }));
  return function handler(_x) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = {
  handler: handler
};
var api = {
  entry: 'netlify/functions/api/api.js',
  plugins: [babel()]
  // ... other options
};
var express = require('express');
var app = express();
var port = 5500;
var cors = require('cors');
var morgan = require('morgan');
var nodemailer = require('nodemailer');
var fs = require('fs');
var WebSocket = require('ws');

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Load orders from file
var orders = [];
var isOrdersLoaded = false;

// Load orders initially
var loadOrders = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return fs.promises.readFile('orders.json', 'utf8');
        case 3:
          data = _context2.sent;
          try {
            orders = JSON.parse(data);
          } catch (err) {
            console.error('Error parsing orders.json:', err);
            orders = [];
          }
          isOrdersLoaded = true;
          _context2.next = 17;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          if (!(_context2.t0.code === 'ENOENT')) {
            _context2.next = 16;
            break;
          }
          _context2.next = 13;
          return fs.promises.writeFile('orders.json', JSON.stringify([]));
        case 13:
          isOrdersLoaded = true;
          _context2.next = 17;
          break;
        case 16:
          throw _context2.t0;
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function loadOrders() {
    return _ref2.apply(this, arguments);
  };
}();

// Save orders to file
var saveOrders = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return fs.promises.writeFile('orders.json', JSON.stringify(orders, null, 2));
        case 3:
          console.log('Orders saved to orders.json');
          _context3.next = 9;
          break;
        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.error('Error saving orders:', _context3.t0);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return function saveOrders() {
    return _ref3.apply(this, arguments);
  };
}();

// Create a new order
var createOrder = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(formData) {
    var newOrder;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (isOrdersLoaded) {
            _context4.next = 4;
            break;
          }
          _context4.next = 4;
          return loadOrders();
        case 4:
          newOrder = _objectSpread2({
            id: orders.length + 1
          }, formData);
          orders.push(newOrder);
          _context4.next = 8;
          return saveOrders();
        case 8:
          console.log('New order created:', newOrder);
          console.log('Orders:', orders);
          return _context4.abrupt("return", newOrder);
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error('Error creating order:', _context4.t0);
          throw _context4.t0;
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function createOrder(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

// Get all orders
var getOrders = function getOrders() {
  if (!isOrdersLoaded) {
    throw new Error('Orders not loaded yet');
  }
  return orders;
};

// Get an order by ID
var getOrderById = function getOrderById(id) {
  if (!isOrdersLoaded) {
    throw new Error('Orders not loaded yet');
  }
  var orderId = parseInt(id, 10);
  if (isNaN(orderId)) {
    throw new Error("Invalid order ID: ".concat(id));
  }
  return orders.find(function (order) {
    return order.id === orderId;
  });
};

// Update an order
var updateOrder = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, updatedFormData) {
    var orderId, index;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (isOrdersLoaded) {
            _context5.next = 4;
            break;
          }
          _context5.next = 4;
          return loadOrders();
        case 4:
          orderId = parseInt(id, 10);
          if (!isNaN(orderId)) {
            _context5.next = 7;
            break;
          }
          throw new Error("Invalid order ID: ".concat(id));
        case 7:
          index = orders.findIndex(function (order) {
            return order.id === orderId;
          });
          if (!(index !== -1)) {
            _context5.next = 15;
            break;
          }
          orders[index] = _objectSpread2({
            id: orderId
          }, updatedFormData);
          _context5.next = 12;
          return saveOrders();
        case 12:
          return _context5.abrupt("return", orders[index]);
        case 15:
          throw new Error("Order with ID ".concat(id, " not found"));
        case 16:
          _context5.next = 22;
          break;
        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          console.error('Error updating order:', _context5.t0);
          throw _context5.t0;
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 18]]);
  }));
  return function updateOrder(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

// Delete an order
var deleteOrder = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id) {
    var orderId, index;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (isOrdersLoaded) {
            _context6.next = 4;
            break;
          }
          _context6.next = 4;
          return loadOrders();
        case 4:
          orderId = parseInt(id, 10);
          if (!isNaN(orderId)) {
            _context6.next = 7;
            break;
          }
          throw new Error("Invalid order ID: ".concat(id));
        case 7:
          index = orders.findIndex(function (order) {
            return order.id === orderId;
          });
          if (!(index !== -1)) {
            _context6.next = 15;
            break;
          }
          orders.splice(index, 1);
          _context6.next = 12;
          return saveOrders();
        case 12:
          return _context6.abrupt("return", "Order with ID ".concat(id, " deleted successfully"));
        case 15:
          throw new Error("Order with ID ".concat(id, " not found"));
        case 16:
          _context6.next = 22;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          console.error('Error deleting order:', _context6.t0);
          throw _context6.t0;
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function deleteOrder(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

// Send email using Nodemailer
function sendEmail(_x6, _x7) {
  return _sendEmail.apply(this, arguments);
} // Usage
function _sendEmail() {
  _sendEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(to, order) {
    var _transporter, _mailOptions;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: 'artbaba2007@gmail.com',
              pass: process.env.EMAIL_PASSWORD // Use environment variable
            }
          });
          _mailOptions = {
            from: 'artbaba2007@gmail.com',
            to: to,
            subject: 'Order Confirmation',
            html: "\n        <h2>Order Confirmation</h2>\n        <p>Order ID: ".concat(order.id, "</p>\n        <p>Order Details: ").concat(JSON.stringify(order), "</p>\n      ")
          };
          _context17.next = 5;
          return _transporter.sendMail(_mailOptions);
        case 5:
          console.log('Email sent successfully!');
          _context17.next = 12;
          break;
        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          console.error('Error sending email:', _context17.t0);
          throw _context17.t0;
        case 12:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 8]]);
  }));
  return _sendEmail.apply(this, arguments);
}
function sendEmailWrapper() {
  return _sendEmailWrapper.apply(this, arguments);
}
function _sendEmailWrapper() {
  _sendEmailWrapper = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return sendEmail('digvijaygour8@gmail.com', order);
        case 3:
          _context18.next = 5;
          return sendEmail('recipient@example.com', order);
        case 5:
          _context18.next = 10;
          break;
        case 7:
          _context18.prev = 7;
          _context18.t0 = _context18["catch"](0);
          console.error('Error sending email:', _context18.t0);
        case 10:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 7]]);
  }));
  return _sendEmailWrapper.apply(this, arguments);
}
sendEmailWrapper();

// Handle payment confirmation
app.post('/payment-confirmation', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var paymentResponse, orderId, _order, sellerEmail;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          paymentResponse = req.body;
          orderId = paymentResponse.orderId;
          _context7.next = 5;
          return getOrderById(orderId);
        case 5:
          _order = _context7.sent;
          if (_order) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", res.status(404).send("Order with ID ".concat(orderId, " not found")));
        case 8:
          if (!(paymentResponse.status === 'success')) {
            _context7.next = 18;
            break;
          }
          _order.status = 'paid';
          _context7.next = 12;
          return updateOrder(orderId, _order);
        case 12:
          sellerEmail = 'digvijaygour8@gmail.com';
          _context7.next = 15;
          return sendEmail(sellerEmail, _order);
        case 15:
          // Send email to seller
          res.redirect('/feedback'); // Redirect user to feedback page
          _context7.next = 19;
          break;
        case 18:
          res.send('Payment failed. Please try again.');
        case 19:
          _context7.next = 25;
          break;
        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          res.status(500).send('Internal Server Error');
        case 25:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 21]]);
  }));
  return function (_x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}());

// Success page
app.get('/success', function (req, res) {
  res.send('Payment successful. Order confirmed.');
});

// Failure page
app.get('/failure', function (req, res) {
  res.send('Payment failed. Please try again.');
});

// Handle feedback submission
app.post('/feedback', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var feedback, feedbackJson;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          feedback = req.body;
          if (!(!feedback || !feedback.question1 || !feedback.question2)) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Invalid feedback'
          }));
        case 4:
          feedbackJson = JSON.stringify(feedback, null, 2);
          _context8.next = 7;
          return fs.promises.appendFile('feedback.json', feedbackJson + '\n');
        case 7:
          res.json({
            message: 'Feedback submitted successfully!'
          });
          _context8.next = 14;
          break;
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function (_x10, _x11) {
    return _ref8.apply(this, arguments);
  };
}());

// Set up WebSocket server
var wss = new WebSocket.Server({
  port: 8080
});
wss.on('connection', function (ws) {
  console.log('Client connected');
  ws.on('message', function (message) {
    console.log("Received message: ".concat(message));
  });
  ws.on('close', function () {
    console.log('Client disconnected');
  });
});
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  // or 'STARTTLS'
  auth: {
    user: 'artbaba2007@gmail.com',
    pass: process.env.EMAIL_PASSWORD // Use environment variable
  }
});
var mailOptions = {
  from: 'artbaba2007@gmail.com',
  to: to,
  subject: 'Order Confirmation',
  html: "\n      <h2>Order Confirmation</h2>\n      <p>Order ID: ".concat(order.id, "</p>\n      <p>Order Details: ").concat(JSON.stringify(order), "</p>\n    ")
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
app.use(express.urlencoded({
  extended: true
}));

// Added route for root URL
app.get('/', function (req, res) {
  res.send('Welcome to the server!');
});
// Create a new order with PhonePe deep link
app.post('/orders', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var formData, newOrder, deepLinkUrl;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          formData = req.body;
          if (!(!formData || Object.keys(formData).length === 0)) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", res.status(400).send('No form data received'));
        case 4:
          _context9.next = 6;
          return createOrder(formData);
        case 6:
          newOrder = _context9.sent;
          _context9.next = 9;
          return generatePhonePeLink(newOrder);
        case 9:
          deepLinkUrl = _context9.sent;
          console.log('Generated Deep Link:', deepLinkUrl);

          // Redirect to UPI app with pre-filled details and amount
          res.redirect(deepLinkUrl);
          _context9.next = 18;
          break;
        case 14:
          _context9.prev = 14;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          res.status(500).send('Internal Server Error');
        case 18:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 14]]);
  }));
  return function (_x12, _x13) {
    return _ref9.apply(this, arguments);
  };
}());
var generatePhonePeLink = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(order) {
    var upiId, name, amount, description, deepLink;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          upiId = '9822242222@axl'; // Replace with your UPI ID
          name = 'mahendra gour'; // Replace with your name
          amount = order.amount; // Replace with the order amount
          description = order.description; // Replace with the order description
          // Create a new PhonePe deep link
          deepLink = "phonepe://upi/pay?pa=".concat(upiId, "&pn=").concat(encodeURIComponent(name), "&am=").concat(amount, "&tn=").concat(encodeURIComponent(description), "&cu=INR");
          return _context10.abrupt("return", deepLink);
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          console.error('Error generating PhonePe deep link:', _context10.t0);
          throw _context10.t0;
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 9]]);
  }));
  return function generatePhonePeLink(_x14) {
    return _ref10.apply(this, arguments);
  };
}();
// Get all orders
app.get('/orders', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var ordersData;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return getOrders();
        case 3:
          ordersData = _context11.sent;
          res.json(ordersData);
          _context11.next = 11;
          break;
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return function (_x15, _x16) {
    return _ref11.apply(this, arguments);
  };
}());

// Get an order by ID
app.get('/orders/:id', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var id, _order2;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          id = req.params.id;
          _context12.next = 4;
          return getOrderById(id);
        case 4:
          _order2 = _context12.sent;
          if (_order2) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: "Order with ID ".concat(id, " not found")
          }));
        case 7:
          res.json(_order2);
          _context12.next = 14;
          break;
        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          console.error(_context12.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });
        case 14:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return function (_x17, _x18) {
    return _ref12.apply(this, arguments);
  };
}());

// Update an order
app.put('/orders/:id', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var id, updatedFormData, _order3, updatedOrder;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          id = req.params.id;
          updatedFormData = req.body;
          if (!(!updatedFormData || Object.keys(updatedFormData).length === 0)) {
            _context13.next = 5;
            break;
          }
          return _context13.abrupt("return", res.status(400).send('No form data received'));
        case 5:
          _context13.next = 7;
          return getOrderById(id);
        case 7:
          _order3 = _context13.sent;
          if (_order3) {
            _context13.next = 10;
            break;
          }
          return _context13.abrupt("return", res.status(404).send("Order with ID ".concat(id, " not found")));
        case 10:
          _context13.next = 12;
          return updateOrder(id, updatedFormData);
        case 12:
          updatedOrder = _context13.sent;
          res.json(updatedOrder);
          _context13.next = 20;
          break;
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          res.status(500).send('Internal Server Error');
        case 20:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 16]]);
  }));
  return function (_x19, _x20) {
    return _ref13.apply(this, arguments);
  };
}());

// Delete an order
app["delete"]('/orders/:id', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var id, _order4, deletionMessage;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          id = req.params.id;
          _context14.next = 4;
          return getOrderById(id);
        case 4:
          _order4 = _context14.sent;
          if (_order4) {
            _context14.next = 7;
            break;
          }
          return _context14.abrupt("return", res.status(404).send("Order with ID ".concat(id, " not found")));
        case 7:
          _context14.next = 9;
          return deleteOrder(id);
        case 9:
          deletionMessage = _context14.sent;
          res.send(deletionMessage);
          _context14.next = 17;
          break;
        case 13:
          _context14.prev = 13;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          res.status(500).send('Internal Server Error');
        case 17:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 13]]);
  }));
  return function (_x21, _x22) {
    return _ref14.apply(this, arguments);
  };
}());

// Handle payment confirmation
app.post('/payment-confirmation', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var paymentResponse, orderId, _order5, sellerEmail;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          paymentResponse = req.body;
          orderId = paymentResponse.orderId;
          _context15.next = 5;
          return getOrderById(orderId);
        case 5:
          _order5 = _context15.sent;
          if (_order5) {
            _context15.next = 8;
            break;
          }
          return _context15.abrupt("return", res.status(404).send("Order with ID ".concat(orderId, " not found")));
        case 8:
          if (!(paymentResponse.status === 'success')) {
            _context15.next = 18;
            break;
          }
          _order5.status = 'paid';
          _context15.next = 12;
          return updateOrder(orderId, _order5);
        case 12:
          sellerEmail = 'digvijaygour8@gmail.com';
          _context15.next = 15;
          return sendEmail(sellerEmail, _order5);
        case 15:
          // Add await here
          res.send("\n        <h2>Payment Successful!</h2>\n        <p>Thank you for your payment. Your order will be processed soon.</p>\n        <h3>Feedback</h3>\n        <form id=\"feedback-form\">\n          <label for=\"feedback\">How was your experience?</label>\n          <textarea id=\"question1\" name=\"question1\"></textarea>\n          <textarea id=\"question2\" name=\"question2\"></textarea>\n          <button>Submit Feedback</button>\n        </form>\n        <script src=\"feedback.js\"></script>\n      ");
          _context15.next = 19;
          break;
        case 18:
          res.send('Payment failed. Please try again.');
        case 19:
          _context15.next = 25;
          break;
        case 21:
          _context15.prev = 21;
          _context15.t0 = _context15["catch"](0);
          console.error(_context15.t0);
          res.status(500).send('Internal Server Error');
        case 25:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 21]]);
  }));
  return function (_x23, _x24) {
    return _ref15.apply(this, arguments);
  };
}());

// Handle feedback submission
app.post('/feedback', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var feedback, feedbackJson;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          feedback = req.body;
          feedbackJson = JSON.stringify(feedback, null, 2);
          _context16.next = 5;
          return fs.promises.appendFile('feedback.json', feedbackJson + '\n');
        case 5:
          res.send('Feedback submitted successfully!');
          _context16.next = 12;
          break;
        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          console.error(_context16.t0);
          res.status(500).send('Internal Server Error');
        case 12:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 8]]);
  }));
  return function (_x25, _x26) {
    return _ref16.apply(this, arguments);
  };
}());
app.listen(port, function () {
  console.log("Server started on port ".concat(port));
});

export { api as default };
//# sourceMappingURL=api.js.map
