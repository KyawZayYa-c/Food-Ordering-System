
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

export default function OrderDetailModal({ opened, onClose, order }) {
  if (!order) return null;

  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus({ id: order._id, status: newStatus }).unwrap();
      notifications.show({
        title: 'Success',
        message: `Order status updated to ${newStatus}`,
        color: 'green',
      });
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
    >
      <Stack gap="md">
        {/* Order Status */}
        <OrderStatus order={order} formatDate={formatDate} />
        <Grid>
          {/* Customer Info */}

          <CustomerInfo order={order} />
          

          <ShippingAddress order={order} />
        </Grid>

        {/* Order Items */}
        <OrderItems order={order} />

        {/* Actions */}
        {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
          <OrderStatusActions handleStatusUpdate={handleStatusUpdate} order={order}  isLoading={isLoading} />
        )}
      </Stack>
    </Modal>
  );
}






