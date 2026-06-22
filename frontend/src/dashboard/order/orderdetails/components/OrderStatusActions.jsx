import { Button, Group,Text, Paper } from "@mantine/core";

export default function OrderStatusActions({handleStatusUpdate, isLoading, order}) {
  return <Paper withBorder p="md" radius="md">
    <Text fw={600} size="sm" mb="xs">Update Status</Text>
    <Group gap="xs">
      {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
        <Button
          key={status}
          size="xs"
          variant="light"
          color={status === 'Delivered' ? 'green' :
            status === 'Cancelled' ? 'red' :
              status === 'Shipped' ? 'cyan' : 'blue'}
          onClick={() => handleStatusUpdate(status)}
          loading={isLoading}
          disabled={order.status === status}
        >
          {status}
        </Button>
      ))}
    </Group>
  </Paper>;
}
