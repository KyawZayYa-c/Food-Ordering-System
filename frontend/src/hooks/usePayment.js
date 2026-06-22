import { useGenerateHashMutation } from "../lib/features/order/orderApiSlice";
import { useGetProfileQuery } from "../lib/features/auth/authApiSlice";

export const usePayment = () => {
    const [generateHash] = useGenerateHashMutation();
    const { data: userData } = useGetProfileQuery();

    const initiatePayment = async (order) => {
        try {
            const response = await generateHash({
                order_id: order._id,
                amount: order.total_amount,
                currency: "LKR"
            }).unwrap();

            console.log('Backend Response:', response);

            const hash = response.data?.hash || response.hash;
            const merchant_id = response.data?.merchant_id || response.merchant_id;

            const payment = {
                sandbox: true,
                merchant_id: merchant_id,
                return_url: "http://localhost:3000/success",
                cancel_url: "http://localhost:3000/cancel",
                notify_url: "http://localhost:3000/api/orders/notify",
                order_id: String(order._id),
                items: "Order #" + order._id,
                amount: order.total_amount.toFixed(2),
                currency: "LKR",
                first_name: userData?.data?.name || "Customer",
                last_name: "User",
                email: userData?.data?.email || "customer@example.com",
                phone: "0770000000",
                address: "Main Road",
                city: "Colombo",
                hash: hash,
                iframe: false,  
            };

            console.log('Payment Config:', payment);

           
            if (window.payhere) {
                window.payhere.onCompleted = function onCompleted(orderId) {
                    console.log("Payment completed. OrderID:" + orderId);
                    window.location.href = `http://localhost:3000/success?order_id=${orderId}`;
                };
                
                window.payhere.onDismissed = function onDismissed() {
                    console.log("Payment dismissed");
                    window.location.href = "http://localhost:3000/cancel";
                };
                
                window.payhere.onError = function onError(error) {
                    console.log("Error:" + error);
                    alert("Payment error occurred. Please try again.");
                };

                window.payhere.startPayment(payment);
            } else {
                console.error("PayHere SDK is not loaded!");
                alert("Payment system is not available. Please try again later.");
            }

        } catch (error) {
            console.error("Payment initiation error:", error);
            alert("Failed to initiate payment. Please try again.");
        }
    };

    return { initiatePayment };
};