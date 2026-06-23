// src/pages/admin/components/CustomerStats.jsx
import { SimpleGrid, Paper, Text, Group, ThemeIcon, Box } from '@mantine/core';
import { IconUsers, IconUserCheck, IconUserX, IconUserPlus } from '@tabler/icons-react';

export default function CustomerStats({ customers }) {
  const total = customers.length;
  const active = customers.filter(c => c.status === 'active').length;
  const inactive = customers.filter(c => c.status === 'inactive').length;
  const newUsers = customers.filter(c => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(c.createdAt) >= sevenDaysAgo;
  }).length;

  const stats = [
    {
      title: 'Total Customers',
      value: total,
      icon: IconUsers,
      color: 'blue',
    },
    {
      title: 'Active Customers',
      value: active,
      icon: IconUserCheck,
      color: 'green',
    },
    {
      title: 'Inactive Customers',
      value: inactive,
      icon: IconUserX,
      color: 'red',
    },
    {
      title: 'New (7 days)',
      value: newUsers,
      icon: IconUserPlus,
      color: 'violet',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md" mb="md">
      {stats.map((stat) => (
        <Paper key={stat.title} p="md" radius="md" withBorder>
          <Group justify="space-between">
            <Box>
              <Text size="xs" c="dimmed" fw={500}>
                {stat.title}
              </Text>
              <Text size="xl" fw={700}>
                {stat.value}
              </Text>
            </Box>
            <ThemeIcon color={stat.color} size={45} radius="md" variant="light">
              <stat.icon size={24} />
            </ThemeIcon>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
}