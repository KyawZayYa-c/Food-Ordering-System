
import {
  Badge,

} from '@mantine/core';
import {
  IconClock,
  IconCheck,
  IconX,
  IconTruck,
} from '@tabler/icons-react';

export default function OrderStatusBadge({ status }) {
  const statusConfig = {
    'Pending': { color: 'yellow', icon: IconClock },
    'Processing': { color: 'blue', icon: IconTruck },
    'Shipped': { color: 'cyan', icon: IconTruck },
    'Delivered': { color: 'green', icon: IconCheck },
    'Cancelled': { color: 'red', icon: IconX },
  };

  const config = statusConfig[status] || statusConfig['Pending'];
  const Icon = config.icon;

  return (
    <Badge 
      color={config.color} 
      size="lg" 
      variant="filled"
      leftSection={<Icon size={14} />}
      style={{ textTransform: 'capitalize' }}
    >
      {status}
    </Badge>
  );
}