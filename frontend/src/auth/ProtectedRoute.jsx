import { Navigate, Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../lib/features/auth/authApiSlice';
import { Loader, Stack, Text, ThemeIcon, Box, Container, Paper } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react';

const ProtectedRoute = ({ allowedRole }) => {
  const { data: response, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return (
      <Box 
        style={{ 
          position: 'fixed',    
          top: 0,
          left: 0,
          height: '100vh',      
          width: '100vw',       
          backgroundColor: '#f8f9fa', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,       
          overflow: 'hidden',   
        }}
      >
        <Container size={400} w="100%">
          <Paper
            withBorder
            p="xl"
            radius="lg"
            shadow="md"
            style={{
              background: 'white',
              textAlign: 'center',
            }}
          >
            <Stack align="center" gap="md">
              {/* Spinning / Pulsing Logo */}
              <ThemeIcon 
                size={54} 
                radius="xl" 
                style={{
                  background: 'linear-gradient(135deg, #228be6, #15aabf)',
                  animation: 'pulse 2s infinite ease-in-out',
                }}
              >
                <IconChefHat size={26} color="white" />
              </ThemeIcon>

              {/* FoodDash Logo Text */}
              <Text 
                variant="gradient" 
                gradient={{ from: 'blue', to: 'cyan' }}
                fw={800}
                size={24}
              >
                FoodDash
              </Text>
              <Loader size="sm" color="blue" type="bars" />

              <Text 
                size="sm" 
                c="dimmed" 
                fw={500}
                style={{ animation: 'bounce 1.5s infinite alternate' }}
              >
                Loading your delicious experience...
              </Text>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (isError || !response || !response.success) {
      return <Navigate to="/login" replace />; 
  }
  
  const userRole = response.data?.role; 
  
  if (allowedRole && userRole !== allowedRole) {
      return userRole === 'admin' ? <Navigate to="/dashboard/products" replace /> : <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;