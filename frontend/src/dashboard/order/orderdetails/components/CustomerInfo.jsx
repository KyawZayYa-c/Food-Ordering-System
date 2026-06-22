import { Grid, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconPhone, IconUser } from "@tabler/icons-react";

export default function CustomerInfo({order}) {
  return <Grid.Col span={6}>
    <Paper withBorder p="md" radius="md">
      <Group gap="xs" mb="xs">
        <ThemeIcon color="blue" size="sm" variant="light">
          <IconUser size={14} />
        </ThemeIcon>
        <Text fw={600} size="sm">Customer</Text>
      </Group>
      <Text fw={500}>{order.customer?.name || 'N/A'}</Text>
      <Text size="sm" c="dimmed">{order.customer?.email || 'N/A'}</Text>
      <Group gap="xs" mt="xs">
        <IconPhone size={14} />
        <Text size="sm">{order.customer?.phone || 'N/A'}</Text>
      </Group>
    </Paper>
  </Grid.Col>;
}