import { Container, Paper, Text, Title, ThemeIcon, Button, Stack } from '@mantine/core';
import { IconCircleX, IconShoppingCart } from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PaymentCancel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const orderId = searchParams.get('order_id') || '';

  return (
    <Container size="sm" py="xl">
      <Paper withBorder p="xl" radius="md" ta="center">
        <ThemeIcon size={80} radius="xl" color="red" variant="light" mx="auto">
          <IconCircleX size={50} />
        </ThemeIcon>
        <Title order={1} mt="md">Payment Cancelled</Title>
        {orderId && (
          <Text size="sm" c="dimmed" mt="xs">
            Order #{orderId.slice(-6).toUpperCase()}
          </Text>
        )}
        <Text c="dimmed" mt="sm">
          Your payment was cancelled. You can try again or continue shopping.
        </Text>
        <Stack mt="xl">
          <Button variant="filled" color="blue" leftSection={<IconShoppingCart size={16} />} onClick={() => navigate('/customer/cart')}>
            Go to Cart
          </Button>
          <Button variant="light" color="gray" onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}