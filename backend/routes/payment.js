const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/start", paymentController.generateHash);

router.post("/notify", paymentController.handleNotify);

router.get("/status/:orderId", paymentController.checkStatus);

module.exports = router;