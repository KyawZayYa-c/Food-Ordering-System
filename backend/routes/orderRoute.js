const express = require('express');
const crypto = require("crypto");
const orderController = require('../controllers/orderController.js');
const { protect, admin } = require('../utils/middleware/authMiddleware.js');
const { validate } = require('../utils/middleware/validator.js'); 
const { orderSchema } = require('../utils/schemas/orderSchema.js');
const routes = express.Router();

routes.post('/', protect, validate(orderSchema), orderController.placeOrder);
routes.get('/all', protect, admin, orderController.getAllOrders);
routes.get('/my-order', protect, orderController.getMyOrders);
routes.get('/:id', protect, orderController.getOrder);
routes.patch('/:id/status', protect, orderController.updateStatus);
routes.post('/generate-hash', protect, orderController.generateHash);
routes.post('/notify', orderController.handlePayHereNotify);

// Merchant details
const merchant_id = "1236454"; // Replace with your actual Merchant ID
const merchant_secret = "OTcxMTY5MzQ2MzY0NjM4NjM4MDM3OTIxNzM0MjcyNDMyODExMDE0"; // Replace with your Merchant Secret

routes.post("/start", (req, res) => {
  const { order_id, amount, currency } = req.body;
  
  const formattedAmount = parseFloat(amount).toFixed(2);
  const secretMd5 = crypto.createHash("md5").update(merchant_secret).digest("hex").toUpperCase();

  // merchant_id + order_id + amount + currency + secretMd5
  const input = merchant_id + order_id + formattedAmount + currency + secretMd5;
  
  const hash = crypto.createHash("md5").update(input).digest("hex").toUpperCase();

  console.log("-----------------------------------------");
  console.log("Merchant ID:", merchant_id);
  console.log("Order ID:", order_id);
  console.log("Formatted Amount:", formattedAmount);
  console.log("Currency:", currency);
  console.log("Secret MD5:", secretMd5);
  console.log("Final Input String for Hash:", input);
  console.log("Generated Hash:", hash);
  console.log("-----------------------------------------");
  // ---------------------------------
  res.json({ hash, merchant_id });
});
// Payment notification endpoint
routes.post("/notify", (req, res) => {

  console.log("Payment notification received");
  
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = req.body;

  const local_md5sig = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        crypto
          .createHash("md5")
          .update(merchant_secret)
          .digest("hex")
          .toUpperCase()
    )
    .digest("hex")
    .toUpperCase();

    console.log("Payment notification for order:", order_id);

  if (local_md5sig === md5sig && status_code == "2") {
    // Payment success - update the database
    console.log("Payment successful for order:", order_id);
    res.sendStatus(200);
  } else {
    // Payment verification failed
    console.log("Payment verification failed for order:", order_id);
    res.sendStatus(400);
  }
});

module.exports = routes;


