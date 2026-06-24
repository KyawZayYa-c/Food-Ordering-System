import { useState } from 'react';
import {
  Container,
  Text,
  Paper,
  Group,
  Title,
  Badge,
  ThemeIcon,
  Box,
  ScrollArea,
  Button,
  Stack,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useGetMyOrdersQuery, useDeleteOrderMutation } from '../../lib/features/order/orderApiSlice';
import {  IconHome, IconPackage } from '@tabler/icons-react';
import OrderLoading from '../../components/OrderLoading';
import ErrorDisplay from '../../components/ErrorDisplay';
import OrderDetailModal from '../../dashboard/order/orderdetails/OrderDetailModal';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import CustomerOrderTable from './components/CustomerOrderTable';
import CustomerNotOrder from './components/CustomerNotOrder';

export default function CustomerMyOrders() {
  const { data, isLoading, isError, refetch } = useGetMyOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const orders = data?.data || [];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalOpened(true);
  };

  const handleDeleteOrder = async (order) => {
    if (order.payment_status === 'Paid') {
      notifications.show({
        title: 'Cannot Delete',
        message: 'This order has been paid and cannot be deleted.',
        color: 'red',
      });
      return;
    }

    modals.openConfirmModal({
      title: 'Delete Order',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete order <strong>#{order._id?.slice(-6).toUpperCase()}</strong>?
          {order.payment_status === 'Pending' && ' This order has not been paid yet.'}
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteOrder(order._id).unwrap();
          notifications.show({
            title: 'Success',
            message: `Order #${order._id?.slice(-6).toUpperCase()} deleted successfully.`,
            color: 'green',
          });
          refetch();
        } catch (err) {
          notifications.show({
            title: 'Error',
            message: err?.data?.message || 'Failed to delete order.',
            color: 'red',
          });
        }
      },
    });
  };

  // Loading
  if (isLoading) {
    return (
      <Container size="xl" py="md">
        <OrderLoading />
      </Container>
    );
  }

  // Error
  if (isError) {
    return (
      <ErrorDisplay 
        title="Error loading your orders"
        message={'Something went wrong. Please try again.'}
        buttonText="Retry Connection"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Container size="xl" >
      <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
       {/* Header */}
      <Box 
        p={isMobile ? 'sm' : 'md'} 
        style={{ 
          borderBottom: '1px solid var(--mantine-color-gray-2)',
          background: 'white',
        }}
      >
        {/* Desktop View */}
        <Group justify="space-between" wrap="nowrap" visibleFrom="sm">
          <Group gap="xs" wrap="nowrap">
            <ThemeIcon color="blue" size="lg" variant="light">
              <IconPackage size={24} />
            </ThemeIcon>
            <Title order={2}>My Orders</Title>
            <Badge size="lg" color="blue" variant="light">
              {orders.length} orders
            </Badge>
          </Group>
          <Group gap="sm" wrap="nowrap">
            <Text size="sm" c="dimmed">
              Total: ${orders.reduce((sum, o) => sum + (o.total_amount || 0), 0).toFixed(2)}
            </Text>
            <Button
              size="xs"
              variant="light"
              color="blue"
              leftSection={<IconHome size={14} />}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
          </Group>
        </Group>

        {/* Mobile View - Full Width */}
        <Stack gap="xs" hiddenFrom="sm">
          <Group gap="xs" wrap="wrap" justify="space-between">
            <ThemeIcon color="blue" size="lg" variant="light">
              <IconPackage size={24} />
            </ThemeIcon>
            <Title order={2}>My Orders</Title>
            <Badge size="lg" color="blue" variant="light">
              {orders.length} orders
            </Badge>
          </Group>
          <Group gap="sm" wrap="wrap" justify="space-between" style={{ width: '100%' }}>
            <Text size="sm" c="dimmed">
              Total: ${orders.reduce((sum, o) => sum + (o.total_amount || 0), 0).toFixed(2)}
            </Text>
            <Button
              size="xs"
              variant="light"
              color="blue"
              leftSection={<IconHome size={14} />}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
          </Group>
        </Stack>
      </Box>

        {/* Scrollable Table */}
        <ScrollArea 
          style={{ 
            width: '100%', 
            height: 'calc(100vh - 155px)', 
            minHeight: 400,
          }} 
          type="auto" 
          offsetScrollbars
        >
          <Box p={isMobile ? 0 : 'md'}>
            {orders.length === 0 ? (
              < CustomerNotOrder />
            ) : (
                < CustomerOrderTable
                  isMobile={isMobile}
                  orders={orders}
                  handleViewOrder={handleViewOrder}
                  handleDeleteOrder={handleDeleteOrder}
                />
            )}
          </Box>
        </ScrollArea>
      </Paper>

      <OrderDetailModal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        refetchOrders={refetch}
      />
    </Container>
  );
}



