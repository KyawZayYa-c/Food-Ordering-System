import {
  Modal,
  Group,
  Text,
  Stack,
  Paper,
  ThemeIcon,
  Badge,
  Avatar,
  Box,
} from '@mantine/core';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
} from '@tabler/icons-react';
import CustomersDetailsOrders from './CustomersDetailsOrders';

export default function CustomerDetailModal({ opened, onClose, customer }) {
  if (!customer) return null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const orders = customer.orders || [];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={
        <Group gap="xs">
          <ThemeIcon color="blue" variant="light">
            <IconUser size={20} />
          </ThemeIcon>
          <Text fw={700} size="lg">Customer Details</Text>
        </Group>
      }
    >
      <Stack gap="md">
        {/* Profile Header */}
        <Paper withBorder p="md" radius="md">
          <Group gap="md">
            <Avatar size="xl" radius="xl" color="blue">
              {customer.name?.substring(0, 2).toUpperCase() || '?'}
            </Avatar>
            <Box>
              <Text fw={700} size="xl">{customer.name || 'N/A'}</Text>
              <Group gap="xs">
                <Badge color={customer.status === 'active' ? 'green' : 'red'} variant="filled">
                  {customer.status || 'inactive'}
                </Badge>
                <Badge color={customer.role === 'admin' ? 'violet' : 'blue'} variant="light">
                  {customer.role || 'customer'}
                </Badge>
              </Group>
            </Box>
          </Group>
        </Paper>

        {/* Contact Information */}
        <Paper withBorder p="md" radius="md">
          <Text fw={600} size="sm" mb="md">Contact Information</Text>
          <Stack gap="xs">
            <Group gap="xs">
              <ThemeIcon size="sm" variant="light" color="blue">
                <IconMail size={14} />
              </ThemeIcon>
              <Text size="sm">{customer.email || 'N/A'}</Text>
            </Group>
            <Group gap="xs">
              <ThemeIcon size="sm" variant="light" color="green">
                <IconPhone size={14} />
              </ThemeIcon>
              <Text size="sm">{customer.phone || 'N/A'}</Text>
            </Group>
            <Group gap="xs">
              <ThemeIcon size="sm" variant="light" color="violet">
                <IconCalendar size={14} />
              </ThemeIcon>
              <Text size="sm">Joined: {formatDate(customer.createdAt)}</Text>
            </Group>
          </Stack>
        </Paper>

        <CustomersDetailsOrders orders={orders} formatDate={formatDate} />
      </Stack>
    </Modal>
  );
}