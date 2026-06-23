import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Text, Title, ThemeIcon, Button, Stack, Loader } from '@mantine/core';
import { IconCircleCheck, IconCircleX, IconHome } from '@tabler/icons-react';
import { BaseURL } from '../../../lib/api/BaseURL';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    let order_id = searchParams.get('order_id');
    
    if (!order_id) {
      order_id = localStorage.getItem('lastOrderId');
      console.log('📦 Order id from localStorage:', order_id);
    }
    
    console.log('🔍 Final Order id:', order_id);
    
    if (order_id) {
      localStorage.removeItem('lastOrderId');
      
      setOrderId(order_id);
      
      fetch(`${BaseURL}/orders/${order_id}`, {
        credentials: 'include',
      })
      .then(res => {
        console.log('📥 Response status:', res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Order data:', data);
        if (data.data?.payment_status === 'Paid') {
          setStatus('success');
        } else {
          setStatus('pending');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        setStatus('failed');
      });
    } else {
      console.log('❌ No order_id found');
      setStatus('failed');
    }
  }, [searchParams]);
  
  if (status === 'loading') {
    return (
      <Container size="sm" py="xl">
        <Paper withBorder p="xl" radius="md" ta="center">
          <Loader size="xl" />
          <Text mt="md">Checking payment status...</Text>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Paper withBorder p="xl" radius="md" ta="center">
        <ThemeIcon 
          size={80} 
          radius="xl" 
          color={status === 'success' ? 'green' : 'red'} 
          variant="light" 
          mx="auto"
        >
          {status === 'success' ? <IconCircleCheck size={50} /> : <IconCircleX size={50} />}
        </ThemeIcon>
        <Title order={1} mt="md">
          {status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
        </Title>
        {orderId && (
          <Text size="sm" c="dimmed" mt="xs">
            Order #{orderId.slice(-6).toUpperCase()}
          </Text>
        )}
        <Text c="dimmed" mt="sm">
          {status === 'success' 
            ? 'Your order has been placed successfully.' 
            : 'Your payment could not be processed. Please try again.'}
        </Text>
        <Stack mt="xl">
          <Button variant="filled" color="blue" onClick={() => navigate('/customer/orders')}>
            View My Orders
          </Button>
          <Button variant="light" color="gray" leftSection={<IconHome size={16} />} onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}