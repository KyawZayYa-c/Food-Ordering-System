import {
  Group,
  Text,
  Modal,
  Stack,
  Grid,
  ThemeIcon,
  ScrollArea,
} from '@mantine/core';
import { useUpdateOrderStatusMutation } from "../../../lib/features/order/orderApiSlice";
import { notifications } from '@mantine/notifications';
import { IconReceipt } from '@tabler/icons-react';
import OrderStatus from './components/OrderStatus';
import CustomerInfo from './components/CustomerInfo';
import ShippingAddress from './components/shippingAddress';
import OrderItems from './components/OrderItems';
import OrderStatusActions from './components/OrderStatusActions';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PaymentPayHere from './components/PaymentPayHere';

export default function OrderDetailModal({ opened, onClose, order, refetchOrders }) { 
  const { user } = useSelector((state) => state.auth || { user: null });
  const isAdmin = user?.role === 'admin';
  const [showPayment, setShowPayment] = useState(false);

  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus({ id: order._id, status: newStatus }).unwrap();
      notifications.show({
        title: 'Success',
        message: `Order status updated to ${newStatus}`,
        color: 'green',
      });
      if (refetchOrders) refetchOrders(); // ✅ Refetch orders
      onClose();
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err.data?.message || 'Failed to update status',
        color: 'red',
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePayNow = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = (orderId) => {
    console.log('✅ Payment successful for order:', orderId);
    setShowPayment(false);
    if (refetchOrders) refetchOrders(); // ✅ Refetch orders
    onClose();
    notifications.show({
      title: 'Success',
      message: 'Payment completed successfully!',
      color: 'green',
    });
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    notifications.show({
      title: 'Error',
      message: 'Payment failed. Please try again.',
      color: 'red',
    });
  };

  if (!order) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={
        <Group gap="xs">
          <ThemeIcon color="blue" variant="light">
            <IconReceipt size={20} />
          </ThemeIcon>
          <Text fw={700} size="lg">Order Details</Text>
          <Text size="sm" c="dimmed">#{order._id?.slice(-6).toUpperCase()}</Text>
        </Group>
      }
      scrollAreaComponent={ScrollArea.Autosize}
      styles={{
        body: {
          padding: '16px',
          maxHeight: '74vh',
          overflowY: 'auto',
        },
        content: {
          maxHeight: '100vh',
        },
        inner: {
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
        },
      }}
    >
      <Stack gap="md">
        
        <OrderStatus order={order} formatDate={formatDate} />
        
        <Grid>
          <CustomerInfo order={order} />
          <ShippingAddress order={order} />
        </Grid>

        <OrderItems order={order} />

        {isAdmin && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
          <OrderStatusActions 
            handleStatusUpdate={handleStatusUpdate} 
            order={order}  
            isLoading={isLoading} 
          />
        )}

        {!isAdmin && order.payment_status === 'Pending' && (
          < PaymentPayHere
            showPayment={showPayment}
            handlePayNow={handlePayNow}
            order={order}
            handlePaymentSuccess={handlePaymentSuccess}
            handlePaymentError={handlePaymentError}
          />
        )}
      </Stack>
    </Modal>
  );
}


