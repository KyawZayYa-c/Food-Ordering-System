import {
  Text,
  Group,
  Badge,
  Table,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { IconEye,  IconTrash } from '@tabler/icons-react';
import OrderStatusBadge from '../../../dashboard/order/compoents/OrderStatusBadge';
import PaymentStatusBadge from '../../../dashboard/order/compoents/PaymentStatusBadge';
export default function CustomerOrderTable({isMobile, orders, handleViewOrder, handleDeleteOrder}) {
  return <Table
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
            <Group gap="xs" justify="center">
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

              {/* ✅ Delete Button - Payment Paid  disable */}
              <Tooltip label={order.payment_status === 'Paid' ? 'Cannot delete paid order' : 'Delete Order'}>
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => handleDeleteOrder(order)}
                  size={isMobile ? 'sm' : 'md'}
                  disabled={order.payment_status === 'Paid'}
                >
                  <IconTrash size={isMobile ? 16 : 18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>;
}