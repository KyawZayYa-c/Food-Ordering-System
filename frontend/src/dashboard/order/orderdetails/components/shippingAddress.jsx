import { Grid, Group,Text, Paper, ThemeIcon } from "@mantine/core";
import { IconMapPin, IconPhone } from "@tabler/icons-react";

export default function ShippingAddress({order}) {
  return <Grid.Col span={6}>
    <Paper withBorder p="md" radius="md">
      <Group gap="xs" mb="xs">
        <ThemeIcon color="green" size="sm" variant="light">
          <IconMapPin size={14} />
        </ThemeIcon>
        <Text fw={600} size="sm">Shipping Address</Text>
      </Group>
      <Text size="sm">{order.shippingAddress?.address || 'N/A'}</Text>
      <Text size="sm">{order.shippingAddress?.city || 'N/A'}</Text>
      <Group gap="xs" mt="xs">
        <IconPhone size={14} />
        <Text size="sm">{order.shippingAddress?.phone || 'N/A'}</Text>
      </Group>
    </Paper>
  </Grid.Col>;
}
