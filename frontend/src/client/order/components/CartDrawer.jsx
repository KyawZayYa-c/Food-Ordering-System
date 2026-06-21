import { Drawer, Button, Stack, Text, Group, Image, Divider, ActionIcon } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../../../lib/features/order/orderApiSlice';
import { ImageURL } from '../../../lib/api/BaseURL';
import { addToCart, decrementQuantity, removeFromCart } from '../../../lib/features/order/cart/cartSlice';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { usePayment } from '../../../hooks/usePayment';
import { useState } from 'react';
import ShippingForm from './ShippingForm';

export default function CartDrawer({ opened, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
    const [createOrder] = useCreateOrderMutation();
    const { initiatePayment } = usePayment();
    const dispatch = useDispatch();
    const [shippingInfo, setShippingInfo] = useState({ address: '', city: '', phone: '' });
    const handleCheckout = async () => {
        if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.phone) {
          alert("Please fill in all shipping details!");
          return;
      }
        const orderData = {
        items: cartItems.map(i => ({ product: i._id, quantity: i.quantity })),
            total_amount: cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0),
        shippingAddress: shippingInfo
        };
        console.log('Create order : ', orderData);
        const orderResponse = await createOrder(orderData).unwrap();
        
        initiatePayment(orderResponse.data, () => {
            alert("Payment Success!");
            onClose();
        });
    };

    return (
        <Drawer opened={opened} onClose={onClose} title="Your Order" position="right" size={'sm'}>
        <Stack gap="md" p={'md'}>
        {cartItems.map((item) => (
                <Group key={item._id} wrap="nowrap" align="center">
                    <Image crossOrigin="anonymous" src={`${ImageURL}${item.image_url}`} w={50} h={50} radius="md" />
                    <Stack gap={0} style={{ flex: 1 }}>
                    <Text fw={600}>{item.name}</Text>
                    <Group gap="xs">
                        <ActionIcon size="sm" variant="subtle" onClick={() => dispatch(decrementQuantity(item._id))}>
                        <IconMinus size={14} />
                        </ActionIcon>
                        <Text size="sm">{item.quantity}</Text>
                        <ActionIcon size="sm" variant="subtle" onClick={() => dispatch(addToCart(item))}>
                        <IconPlus size={14} />
                        </ActionIcon>
                    </Group>
                    </Stack>
                    <Text fw={700}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <ActionIcon color="red" variant="subtle" onClick={() => dispatch(removeFromCart(item._id))}>
                    <IconTrash size={18} />
                    </ActionIcon>
                </Group>
                ))}
            <Divider />
            <ShippingForm shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} />
            <Group justify="space-between">
            <Text fw={700}>Total:</Text>
            <Text fw={700} size="xl" c="blue">
                ${cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}
            </Text>
            </Group>

            <Button onClick={handleCheckout} size="md" radius="md">
            Proceed to Checkout
            </Button>
        </Stack>
        </Drawer>
    );
}