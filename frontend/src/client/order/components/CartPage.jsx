import { Button } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../../lib/features/order/orderApiSlice';

export default function CartPage() {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const cartItems = useSelector((state) => state.cart.items);

  const handlePlaceOrder = async () => {
    const orderData = {
      items: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity
      })),
      total_amount: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };

    try {
      await createOrder(orderData).unwrap();
      alert("Order placed successfully!");
    } catch (error) {
      alert("Order failed: " + error.data?.message);
    }
  };

  return (
    <Button onClick={handlePlaceOrder} loading={isLoading}>
      Place Order
    </Button>
  );
}