import { useGenHashMutation } from "../../lib/features/order/orderApiSlice";


const PaymentButton = () => {
  const [genHash, { isLoading }] = useGenHashMutation();
  const handlePayment = async () => {
    const paymentDetails = {
      order_id: "ItemNo12345",
      amount: "1005.00",
      currency: "LKR",
      first_name: "Saman",
      last_name: "Perera",
      email: "samanp@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
    };

    try {
      // Request backend to generate the hash value
      const response = await genHash(paymentDetails).unwrap();

      const { hash, merchant_id } = response;

     const payment = {
        sandbox: true,
        merchant_id: merchant_id,
        return_url: "http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/cancel",
        notify_url: "http://localhost:3000/payment/notify",
        order_id: paymentDetails.order_id,
        items: "Pay Here Testing",
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        first_name: paymentDetails.first_name,
        last_name: paymentDetails.last_name,
        email: paymentDetails.email,
        phone: paymentDetails.phone,
        address: paymentDetails.address,
        city: paymentDetails.city,
        country: paymentDetails.country,
        hash: hash,
      };

      window.payhere.startPayment(payment);

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <button id="payhere-payment" onClick={handlePayment} disabled={isLoading}>
        {isLoading ? "Generating Hash..." : "PayHere Pay"}
      </button>
    </div>
  );
};

export default PaymentButton;
