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
  Table,
  Tooltip,
  ActionIcon,
  Center,
  Button,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useGetMyOrdersQuery } from '../../lib/features/order/orderApiSlice';
import { IconEye, IconHome, IconPackage } from '@tabler/icons-react';
import OrderLoading from '../../components/OrderLoading';
import ErrorDisplay from '../../components/ErrorDisplay';
import OrderStatusBadge from '../../dashboard/order/compoents/OrderStatusBadge';
import PaymentStatusBadge from '../../dashboard/order/compoents/PaymentStatusBadge';
import OrderDetailModal from '../../dashboard/order/orderdetails/OrderDetailModal';
import { useNavigate } from 'react-router-dom';
export default function CustomerMyOrders() {
  const { data, isLoading, isError, refetch } = useGetMyOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const orders = data?.data || [];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalOpened(true);
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
          <Group justify="space-between" wrap="wrap">
            <Group gap="xs" wrap="wrap">
              <ThemeIcon color="blue" size="lg" variant="light">
                <IconPackage size={24} />
              </ThemeIcon>
              <Title order={2}>My Orders</Title>
              <Badge size="lg" color="blue" variant="light">
                {orders.length} orders
              </Badge>
            </Group>
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
              <Center h={300}>
                <Box ta="center">
                  <ThemeIcon size={60} radius="xl" color="gray" variant="light" mb="md">
                    <IconPackage size={30} />
                  </ThemeIcon>
                  <Text fw={600} size="lg">No Orders Yet</Text>
                  <Text size="sm" c="dimmed">You haven't placed any orders yet.</Text>
                </Box>
              </Center>
            ) : (
              <Table 
                striped 
                highlightOnHover
                verticalSpacing={isMobile ? 'xs' : 'sm'}
                horizontalSpacing={isMobile ? 'xs' : 'sm'}
                style={{
                  minWidth: isMobile ? 600 : 700,
                  fontSize: isMobile ? 12 : 14,
                }}
              >
                <thead>
                  <tr>
                    <th style={{ 
                      padding: isMobile ? '6px 4px' : '10px 12px',
                      fontSize: isMobile ? 10 : 13,
                      fontWeight: 600,
                      color: 'var(--mantine-color-gray-7)',
                      borderBottom: '2px solid var(--mantine-color-gray-3)',
                      position: 'sticky',
                      top: 0,
                      background: 'var(--mantine-color-gray-0)',
                      zIndex: 5,
                    }}>
                      Order ID
                    </th>
                    <th style={{ 
                      padding: isMobile ? '6px 4px' : '10px 12px',
                      fontSize: isMobile ? 10 : 13,
                      fontWeight: 600,
                      color: 'var(--mantine-color-gray-7)',
                      borderBottom: '2px solid var(--mantine-color-gray-3)',
                      position: 'sticky',
                      top: 0,
                      background: 'var(--mantine-color-gray-0)',
                      zIndex: 5,
                    }}>
                      Items
                    </th>
                    <th style={{ 
                      padding: isMobile ? '6px 4px' : '10px 12px',
                      fontSize: isMobile ? 10 : 13,
                      fontWeight: 600,
                      color: 'var(--mantine-color-gray-7)',
                      borderBottom: '2px solid var(--mantine-color-gray-3)',
                      textAlign: 'right',
                      position: 'sticky',
                      top: 0,
                      background: 'var(--mantine-color-gray-0)',
                      zIndex: 5,
                    }}>
                      Total
                    </th>
                    <th style={{ 
                      padding: isMobile ? '6px 4px' : '10px 12px',
                      fontSize: isMobile ? 10 : 13,
                      fontWeight: 600,
                      color: 'var(--mantine-color-gray-7)',
                      borderBottom: '2px solid var(--mantine-color-gray-3)',
                      textAlign: 'center',
                      position: 'sticky',
                      top: 0,
                      background: 'var(--mantine-color-gray-0)',
                      zIndex: 5,
                    }}>
                      Status
                    </th>
                    <th style={{ 
                      padding: isMobile ? '6px 4px' : '10px 12px',
                      fontSize: isMobile ? 10 : 13,
                      fontWeight: 600,
                      color: 'var(--mantine-color-gray-7)',
                      borderBottom: '2px solid var(--mantine-color-gray-3)',
                      textAlign: 'center',
                      position: 'sticky',
                      top: 0,
                      background: 'var(--mantine-color-gray-0)',
                      zIndex: 5,
                    }}>
                      Payment
                    </th>
                    <th style={{ 
                      padding: isMobile ? '6px 4px' : '10px 12px',
                      fontSize: isMobile ? 10 : 13,
                      fontWeight: 600,
                      color: 'var(--mantine-color-gray-7)',
                      borderBottom: '2px solid var(--mantine-color-gray-3)',
                      textAlign: 'center',
                      position: 'sticky',
                      top: 0,
                      background: 'var(--mantine-color-gray-0)',
                      zIndex: 5,
                    }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} style={{
                      borderBottom: '1px solid var(--mantine-color-gray-2)',
                    }}>
                      <td style={{
                        padding: isMobile ? '6px 4px' : '10px 12px',
                        verticalAlign: 'middle',
                      }}>
                        <Text 
                          size={isMobile ? 'xs' : 'sm'} 
                          fw={600} 
                          style={{ 
                            fontFamily: 'monospace',
                            color: 'var(--mantine-color-blue-7)',
                            fontSize: isMobile ? 10 : 13,
                          }}
                        >
                          #{order._id?.slice(-6).toUpperCase()}
                        </Text>
                      </td>
                      <td style={{
                        padding: isMobile ? '6px 4px' : '10px 12px',
                        verticalAlign: 'middle',
                      }}>
                        <Group gap="xs">
                          <Badge 
                            size={isMobile ? 'xs' : 'sm'} 
                            variant="light" 
                            color="gray"
                          >
                            {order.items?.length || 0} items
                          </Badge>
                          {!isMobile && (
                            <Text size="xs" c="dimmed">
                              {order.items?.map(item => item.product?.name).join(', ')}
                            </Text>
                          )}
                        </Group>
                      </td>
                      <td style={{
                        padding: isMobile ? '6px 4px' : '10px 12px',
                        textAlign: 'right',
                        verticalAlign: 'middle',
                      }}>
                        <Text 
                          fw={700} 
                          size={isMobile ? 'sm' : 'md'}
                          style={{ 
                            color: 'var(--mantine-color-blue-6)',
                            fontSize: isMobile ? 12 : 15,
                          }}
                        >
                          ${order.total_amount?.toFixed(2) || '0.00'}
                        </Text>
                      </td>
                      <td style={{
                        padding: isMobile ? '6px 4px' : '10px 12px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}>
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td style={{
                        padding: isMobile ? '6px 4px' : '10px 12px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}>
                        <PaymentStatusBadge status={order.payment_status} />
                      </td>
                      <td style={{
                        padding: isMobile ? '6px 4px' : '10px 12px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}>
                        <Tooltip label="View Details">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => handleViewOrder(order)}
                            size={isMobile ? 'sm' : 'md'}
                          >
                            <IconEye size={isMobile ? 16 : 18} />
                          </ActionIcon>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
      />
    </Container>
  );
}