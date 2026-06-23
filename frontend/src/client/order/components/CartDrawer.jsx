import { Drawer, Button, Stack, Text, Group, Image, Divider, ActionIcon } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../../lib/features/order/orderApiSlice';
import { ImageURL } from '../../../lib/api/BaseURL';
import { addToCart, decrementQuantity, removeFromCart } from '../../../lib/features/order/cart/cartSlice';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import ShippingForm from './ShippingForm';
import PaymentButton from '../PaymentButton';

export default function CartDrawer({ opened, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth || { user: null });
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    phone: user?.phone || '',
  });
  const [orderId, setOrderId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const total = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  const handleCheckout = async () => {
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.phone) {
      alert('Please fill in all shipping details!');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map((i) => ({ product: i._id, quantity: i.quantity })),
        total_amount: total,
        shippingAddress: shippingInfo,
      };

      const orderResponse = await createOrder(orderData).unwrap();
      console.log('Order Response:', orderResponse);

      if (orderResponse?.data?._id) {
        setOrderId(orderResponse.data._id);
        setShowPayment(true);
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      alert(error?.data?.message || 'Failed to create order');
    }
  };


  const handlePaymentSuccess = (orderId) => {
    console.log('✅ Payment successful for order:', orderId);
    

    cartItems.forEach((item) => {
      dispatch(removeFromCart(item._id));
    });
    
    setShowPayment(false);
    setOrderId(null);
    onClose();
    

    window.location.href = '/payment/success';
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
  };

  return (
    <Drawer opened={opened} onClose={onClose} title="Your Order" position="right" size={'sm'}>
      <Stack gap="md" p={'md'}>
        {cartItems.length === 0 ? (
          <Text ta="center" c="dimmed" py="xl">
            Your cart is empty
          </Text>
        ) : (
          <>
            {cartItems.map((item) => (
              <Group key={item._id} wrap="nowrap" align="center">
                <Image
                  crossOrigin="anonymous"
                  src={`${ImageURL}${item.image_url}`}
                  w={50}
                  h={50}
                  radius="md"
                  fallbackSrc="https://placehold.co/50x50?text=No+Image"
                />
                <Stack gap={0} style={{ flex: 1 }}>
                  <Text fw={600} size="sm">
                    {item.name}
                  </Text>
                  <Group gap="xs">
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      onClick={() => dispatch(decrementQuantity(item._id))}
                    >
                      <IconMinus size={14} />
                    </ActionIcon>
                    <Text size="sm">{item.quantity}</Text>
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      <IconPlus size={14} />
                    </ActionIcon>
                  </Group>
                </Stack>
                <Text fw={700}>${(item.price * item.quantity).toFixed(2)}</Text>
                <ActionIcon
                  color="red"
                  variant="subtle"
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            ))}

            <Divider />

            {!showPayment ? (
              <>
                <ShippingForm shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} />

                <Group justify="space-between">
                  <Text fw={700}>Total:</Text>
                  <Text fw={700} size="xl" c="blue">
                    ${total.toFixed(2)}
                  </Text>
                </Group>

                <Button
                  onClick={handleCheckout}
                  size="md"
                  radius="md"
                  loading={isLoading}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </>
            ) : (
              <>
                <Text fw={600} size="lg" ta="center">
                  Complete Payment
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                  Order #{orderId?.slice(-6).toUpperCase()} - ${total.toFixed(2)}
                </Text>

                <PaymentButton
                  orderId={orderId}
                  amount={total}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />

                <Button
                  variant="subtle"
                  color="gray"
                  size="sm"
                  onClick={() => setShowPayment(false)}
                >
                  ← Back to Cart
                </Button>
              </>
            )}
          </>
        )}
      </Stack>
    </Drawer>
  );
}