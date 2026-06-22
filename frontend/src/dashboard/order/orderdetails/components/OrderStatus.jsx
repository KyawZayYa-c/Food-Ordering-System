import { Group, Text, Paper } from "@mantine/core";
import OrderStatusBadge from "../../compoents/OrderStatusBadge";
import PaymentStatusBadge from "../../compoents/PaymentStatusBadge";
import { IconClock } from "@tabler/icons-react";

export default function OrderStatus({ order, formatDate }) {
  return <Paper withBorder p="md" radius="md" style={{ background: 'var(--mantine-color-gray-0)' }}>
    <Group justify="space-between" align="center">
      <Group gap="xs">
        <Text fw={600} size="sm">Order Status</Text>
        <OrderStatusBadge status={order.status} />
      </Group>
      <Group gap="xs">
        <Text fw={600} size="sm">Payment</Text>
        <PaymentStatusBadge status={order.payment_status} />
      </Group>
    </Group>
    <Group mt="xs">
      <Text size="xs" c="dimmed">
        <IconClock size={14} style={{ display: 'inline', marginRight: 4 }} />
        {formatDate(order.createdAt)}
      </Text>
    </Group>
  </Paper>;
}