import {
  Paper,
  Table,
  Text,
  Group,
  Badge,
  ActionIcon,
  Tooltip,
  ScrollArea,
  Box,
  Avatar,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useDeleteUserMutation } from '../../../lib/features/user/userApiSlice';
import { notifications } from '@mantine/notifications';

export default function CustomerTable({ customers, onViewCustomer }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (customer) => {
    modals.openConfirmModal({
      title: 'Delete Customer',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{customer.name}</strong>? 
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteUser(customer._id).unwrap();
          notifications.show({
            title: 'Success',
            message: `${customer.name} has been deleted successfully.`,
            color: 'green',
          });
        } catch (err) {
          notifications.show({
            title: 'Error',
            message: err?.data?.message || 'Failed to delete customer.',
            color: 'red',
          });
        }
      },
    });
  };

  return (
    <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
      <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
        <Group justify="space-between">
          <Text fw={600} size="lg">Customers</Text>
          <Badge size="lg" color="blue" variant="light">
            {customers.length} customers
          </Badge>
        </Group>
      </Box>

      <ScrollArea style={{ width: '100%', minHeight: 400 }} type="auto">
        <Box p={isMobile ? 0 : 'md'}>
          <Table 
            striped 
            highlightOnHover
            verticalSpacing="sm"  
            horizontalSpacing="md" 
            style={{ minWidth: isMobile ? 600 : 700 }}
          >
            <thead>
              <tr>
                <th style={{ padding: '12px 16px' }}>Customer</th>
                <th style={{ padding: '12px 16px' }}>Email</th>
                <th style={{ padding: '12px 16px' }}>Phone</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Role</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>
                    <Text c="dimmed">No customers found</Text>
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer._id}>
                    <td style={{ padding: '12px 16px' }}>
                      <Group gap="xs" wrap="nowrap">
                        <Avatar size="sm" radius="xl" color="blue">
                          {customer.name?.substring(0, 2).toUpperCase() || '?'}
                        </Avatar>
                        <Text size="sm" fw={500}>
                          {customer.name || 'N/A'}
                        </Text>
                      </Group>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Text size="sm" c="dimmed">
                        {customer.email || 'N/A'}
                      </Text>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Text size="sm">
                        {customer.phone || 'N/A'}
                      </Text>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <Badge 
                        color={customer.status === 'active' ? 'green' : 'red'}
                        variant="filled"
                        size="sm"
                      >
                        {customer.status || 'inactive'}
                      </Badge>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <Badge 
                        color={customer.role === 'admin' ? 'violet' : 'blue'}
                        variant="light"
                        size="sm"
                      >
                        {customer.role || 'customer'}
                      </Badge>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <Group gap="xs" justify="center">
                        <Tooltip label="View Details">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => onViewCustomer(customer)}
                            size={isMobile ? 'sm' : 'md'}
                          >
                            <IconEye size={isMobile ? 16 : 18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete">
                          <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => handleDelete(customer)}
                            size={isMobile ? 'sm' : 'md'}
                          >
                            <IconTrash size={isMobile ? 16 : 18} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Box>
      </ScrollArea>
    </Paper>
  );
}