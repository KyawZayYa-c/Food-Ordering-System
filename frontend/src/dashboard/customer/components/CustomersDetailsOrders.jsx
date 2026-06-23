import {
  Group,
  Text,
  Stack,
  Paper,
  Badge,
  Box,
  Image, 
} from '@mantine/core';
import {
  IconPhoto,
} from '@tabler/icons-react';
import { ImageURL } from '../../../lib/api/BaseURL';

export default function CustomersDetailsOrders({ orders, formatDate }) {
  return (
    <Stack gap="md">
      {orders.map((order, index) => (
        <Paper
          key={index}
          withBorder
          p="md"
          radius="md"
          style={{
            background: 'white',
            borderLeft: `4px solid ${
              order.status === 'Delivered' ? 'var(--mantine-color-green-5)' :
              order.status === 'Cancelled' ? 'var(--mantine-color-red-5)' : 'var(--mantine-color-yellow-5)'
            }`,
          }}
        >
          {/* Order Header */}
          <Group justify="space-between" wrap="wrap" mb="sm">
            <Group gap="sm">
              <Text fw={700} size="md" style={{ fontFamily: 'monospace', color: 'var(--mantine-color-blue-7)' }}>
                #{order._id?.slice(-6).toUpperCase()}
              </Text>
              <Text size="xs" c="dimmed">
                {formatDate(order.createdAt)}
              </Text>
            </Group>
            <Group gap="md">
              <Text fw={700} size="lg" style={{ color: 'var(--mantine-color-blue-6)' }}>
                ${order.total_amount?.toFixed(2) || '0.00'}
              </Text>
              <Badge
                color={
                  order.status === 'Delivered' ? 'green' :
                  order.status === 'Cancelled' ? 'red' : 'yellow'
                }
                variant="filled"
                size="sm"
              >
                {order.status || 'Pending'}
              </Badge>
              <Badge
                color={
                  order.payment_status === 'Paid' ? 'green' :
                  order.payment_status === 'Failed' ? 'red' : 'yellow'
                }
                variant="light"
                size="sm"
              >
                {order.payment_status || 'Pending'}
              </Badge>
            </Group>
          </Group>

          {/* Items Row with Bigger Images */}
          <Group gap="md" wrap="wrap">
            {order.items?.map((item, idx) => (
              <Group key={idx} gap="xs" wrap="nowrap">
                {item.product?.image_url ? (
                  <Image
                    crossOrigin="anonymous"
                    src={`${ImageURL}${item.product.image_url}`}
                    w={60}
                    h={60}
                    radius="md"
                    fit="cover"
                    fallbackSrc="https://placehold.co/60x60?text=No+Image"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/60x60?text=Error';
                    }}
                  />
                ) : (
                  <Box
                    w={60}
                    h={60}
                    style={{
                      background: 'var(--mantine-color-gray-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                    }}
                  >
                    <IconPhoto size={24} color="var(--mantine-color-gray-5)" />
                  </Box>
                )}
                <Box>
                  <Text size="sm" fw={500}>{item.product?.name || 'Unknown'}</Text>
                  <Text size="xs" c="dimmed">Qty: {item.quantity}</Text>
                  <Text size="xs" fw={600} c="blue">
                    ${(item.product?.price * item.quantity)?.toFixed(2) || '0.00'}
                  </Text>
                </Box>
              </Group>
            ))}
          </Group>

          {/* Items Count */}
          <Group justify="flex-end" mt="sm">
            <Badge size="xs" variant="light" color="gray">
              {order.items?.length || 0} items
            </Badge>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}