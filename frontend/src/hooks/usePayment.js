import { useGenerateHashMutation, useGetAllOrdersQuery } from "../lib/features/order/orderApiSlice";

export const usePayment = () => {
    const [generateHash] = useGenerateHashMutation();
    const { data: userData } = useGetAllOrdersQuery();

    const initiatePayment = async (order) => {
        const hashData = await generateHash({ 
            order_id: order._id, 
            amount: order.total_amount 
        }).unwrap();

        const payment = {
            sandbox: true,
            merchant_id: "1236362",
            return_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
            notify_url: "http://localhost:3000/api/orders/notify",
            order_id: order._id,
            items: "Order #" + order._id,
            amount: order.total_amount.toFixed(2),
            currency: "LKR",
            first_name: userData?.data?.name || "Customer",
            last_name: "User",
            email: userData?.data?.email || "customer@example.com",
            phone: "0770000000",
            address: "Main Road",
            city: "Colombo",
            hash: hashData.data.hash,
        };

        console.log('hash : ', payment.hash);

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://sandbox.payhere.lk/pay/checkout";

        for (const key in payment) {
            const hiddenField = document.createElement("input");
            hiddenField.type = "hidden";
            hiddenField.name = key;
            hiddenField.value = payment[key];
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit(); 
    };

    return { initiatePayment };
};