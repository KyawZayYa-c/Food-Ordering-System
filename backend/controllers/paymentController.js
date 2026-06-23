const crypto = require("crypto");
const paymentService = require("../services/paymentService");

merchant_id = process.env.PAYHERE_MERCHANT_ID;
const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;


const generateHash = (req, res) => {
  try {
    const { order_id, amount, currency } = req.body;
    
    console.log('Payment request received:', { order_id, amount, currency });
    
    const formattedAmount = parseFloat(amount).toFixed(2);
    const secretMd5 = crypto.createHash("md5").update(merchant_secret).digest("hex").toUpperCase();

    const input = merchant_id + order_id + formattedAmount + currency + secretMd5;
    const hash = crypto.createHash("md5").update(input).digest("hex").toUpperCase();

    console.log('Generated hash:', hash);
    
    paymentService.savePaymentStatus(order_id, 'pending');
    
    res.json({ 
      success: true, 
      hash, 
      merchant_id 
    });
  } catch (error) {
    console.error('Error generating hash:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// 2. Payment Notification (PayHere will call this)
const handleNotify = (req, res) => {
  console.log("📩 Payment notification received:", req.body);
  
  const {
    merchant_id: mId,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = req.body;

  console.log('Order ID:', order_id);
  console.log('Status Code:', status_code);

  const local_md5sig = crypto
    .createHash("md5")
    .update(
      mId +
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

  console.log('Local MD5:', local_md5sig);
  console.log('Received MD5:', md5sig);

  if (local_md5sig === md5sig && status_code == "2") {
    console.log("✅ Payment successful for order:", order_id);
    paymentService.savePaymentStatus(order_id, 'success');
    res.sendStatus(200);
  } else {
    console.log("❌ Payment verification failed for order:", order_id);
    paymentService.savePaymentStatus(order_id, 'failed');
    res.sendStatus(400);
  }
};

// 3. Payment Status Check
const checkStatus = (req, res) => {
  const { orderId } = req.params;
  const status = paymentService.getPaymentStatus(orderId);

  console.log('Status check for order:', orderId);
  console.log('Status data:', status);

  if (!status) {
    return res.status(404).json({ 
      status: 'not_found', 
      message: 'Order not found' 
    });
  }

  res.json({ 
    status: status.status, 
    updatedAt: status.updatedAt 
  });
};

module.exports = {
  generateHash,
  handleNotify,
  checkStatus,
};