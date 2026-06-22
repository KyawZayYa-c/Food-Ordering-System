import { Badge } from "@mantine/core";

export default function PaymentStatusBadge({ status }) {
  const config = {
    'Pending': { color: 'yellow' },
    'Paid': { color: 'green' },
    'Failed': { color: 'red' },
    'Refunded': { color: 'orange' },
  };

  const color = config[status]?.color || 'gray';

  return (
    <Badge color={color} variant="light" style={{ textTransform: 'capitalize' }}>
      {status}
    </Badge>
  );
}