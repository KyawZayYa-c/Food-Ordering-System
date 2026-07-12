import { Navigate, Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../lib/features/auth/authApiSlice';
import {  Loader, Stack, Text, ThemeIcon, Box, Container } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react';

const ProtectedRoute = ({ allowedRole }) => {
  const { data: response, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return (
      <Box 
        style={{ 
          minHeight: '100vh', 
          width: '100%',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container size="sm">
          <Stack align="center" gap="xl" py={50}>
            <ThemeIcon 
              size={100} 
              radius="xl" 
              color="blue"
              style={{
                background: 'linear-gradient(135deg, #228be6, #15aabf)',
                animation: 'pulse 1.5s ease-in-out infinite',
                boxShadow: '0 8px 32px rgba(34, 139, 230, 0.3)',
              }}
            >
              <IconChefHat size={50} color="white" />
            </ThemeIcon>
            
            <Stack gap={8} align="center">
              <Text 
                fw={800} 
                size={42} 
                variant="gradient" 
                gradient={{ from: 'blue', to: 'cyan' }}
                style={{ letterSpacing: -1 }}
              >
                FoodDash
              </Text>
              <Text size="md" c="dimmed" fw={500}>
                Loading your account...
              </Text>
            </Stack>

            <Loader size="xl" color="blue" />
            
            <Box ta="center">
              <Text size="xs" c="dimmed" style={{ animation: 'bounce 2s infinite' }}>
                ⚡ Please wait a moment
              </Text>
            </Box>
          </Stack>
        </Container>
      </Box>
    );
  }

  if (isError || !response || !response.success) {
    return <Navigate to="/login" replace />; 
  }
  
  const userRole = response.data?.role; 
  
  if (allowedRole && userRole !== allowedRole) {
    return userRole === 'admin' 
      ? <Navigate to="/dashboard/products" replace /> 
      : <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;