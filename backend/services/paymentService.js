const paymentStatusDB = {};

const savePaymentStatus = (orderId, status) => {
  paymentStatusDB[orderId] = {
    status: status,
    updatedAt: new Date().toISOString()
  };
};

const getPaymentStatus = (orderId) => {
  return paymentStatusDB[orderId];
};

module.exports = {
  savePaymentStatus,
  getPaymentStatus,
};