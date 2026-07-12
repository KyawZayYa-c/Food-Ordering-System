import { Navigate, Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../lib/features/auth/authApiSlice';
import { Skeleton, Stack, Text, ThemeIcon, Box, Container, Paper, Center } from '@mantine/core';
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
          width: '100vw',       // 👈 Force fully occupy the full viewport width
          backgroundColor: '#ffffff', // Clean white background matching your request
          zIndex: 99999,        
          overflow: 'hidden',   
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Full Width Top Skeleton Bar resembling Header */}
        <Box px="md" py="sm" style={{ borderBottom: '1px solid #e9ecef', width: '100%' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Skeleton height={35} circle />
              <Skeleton height={20} width={100} radius="xl" />
            </Box>
            <Skeleton height={30} width={40} circle />
          </Box>
        </Box>

        {/* Full-width Page Content Shimmer Component */}
        <Container size="xl" w="100%" px="md" mt="xl" style={{ flex: 1 }}>
          <Stack gap="xl" w="100%">
            {/* Huge Hero Section Banner Shimmer */}
            <Skeleton height={300} radius="lg" width="100%" />

            {/* Grid Layout Shimmer representing items */}
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                width: '100%',
              }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Paper key={index} withBorder p="md" radius="md" style={{ width: '100%' }}>
                  <Stack gap="sm">
                    <Skeleton height={160} radius="md" />
                    <Skeleton height={20} width="70%" radius="xl" />
                    <Skeleton height={15} width="100%" radius="xl" />
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Stack>
        </Container>

        {/* Centered Overlay Toast Message with high visibility text */}
        <Center 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 100000 
          }}
        >
          <Paper 
            withBorder 
            p="xl" 
            radius="xl" 
            shadow="xl" 
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '2px solid #228be6',
              textAlign: 'center',
              minWidth: '280px'
            }}
          >
            <Stack align="center" gap="xs">
              <ThemeIcon 
                size={50} 
                radius="xl" 
                style={{
                  background: 'linear-gradient(135deg, #228be6, #15aabf)',
                  animation: 'pulse 2s infinite ease-in-out',
                }}
              >
                <IconChefHat size={24} color="white" />
              </ThemeIcon>

              <Text 
                variant="gradient" 
                gradient={{ from: 'blue', to: 'cyan' }}
                fw={850} 
                size="xl"
              >
                FoodDash
              </Text>

              <Text 
                size="sm" 
                c="dark.7" // Darker typography to prevent invisibility issues
                fw={700}
              >
                Loading your delicious experience...
              </Text>
            </Stack>
          </Paper>
        </Center>
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