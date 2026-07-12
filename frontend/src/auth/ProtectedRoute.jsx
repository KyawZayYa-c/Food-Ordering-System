import { Navigate, Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../lib/features/auth/authApiSlice';
import { Center, Loader, Stack, Text, ThemeIcon, Paper } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react';

const ProtectedRoute = ({ allowedRole }) => {
  const { data: response, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return (
      <Center style={{ minHeight: '100vh', width: '100%' }}>
        <Paper 
          withBorder 
          p="xl" 
          radius="lg" 
          shadow="xl"
          style={{
            background: 'white',
            textAlign: 'center',
            maxWidth: 400,
          }}
        >
          <Stack align="center" gap="md">
            <ThemeIcon 
              size={70} 
              radius="xl" 
              color="blue"
              style={{
                background: 'linear-gradient(135deg, #228be6, #15aabf)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            >
              <IconChefHat size={35} color="white" />
            </ThemeIcon>
            
            <Loader size="lg" type="dots" color="blue" />
            
            <Stack gap={0}>
              <Text fw={700} size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                FoodDash
              </Text>
              <Text size="sm" c="dimmed">
                Loading your account...
              </Text>
            </Stack>
          </Stack>
        </Paper>
      </Center>
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