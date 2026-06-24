import { useState } from 'react';
import {
  AppShell,
  Group,
  ActionIcon,
  Indicator,
  Menu,
  Avatar,
  Text,
  Badge,
  Tooltip,
  useMantineTheme,
  ThemeIcon,
  Box,
} from '@mantine/core';

import {
  IconShoppingCart,
  IconHistory,
  IconLogout,
  IconChefHat,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProfileQuery, useLogoutMutation } from '../../lib/features/auth/authApiSlice';
import { useSelector } from 'react-redux';
import CartDrawer from '../order/components/CartDrawer';

export default function CustomerHeader() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;
  const { data: user } = useGetProfileQuery();
  const [logout] = useLogoutMutation();
  

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AppShell.Header p="xs" style={{ borderBottom: `1px solid ${theme.colors.gray[2]}`, zIndex: 1000 }}>
      <Group style={{ height: '100%' }} px="md" justify="space-between" wrap="nowrap">
        {/* Left Section - Logo */}
        <Group wrap="nowrap" gap="xs">
           <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <ThemeIcon color="blue" size={30}>
                <IconChefHat size={20} />
              </ThemeIcon>
              <Text fw={700} size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                FoodDash
              </Text>
            </Group>
        </Group>

        {/* Right Section - Actions */}
        <Group gap="xs" wrap="nowrap">

          {/* Cart */}
           <CartDrawer opened={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <Tooltip label="Cart">
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              onClick={() => setIsCartOpen(!isCartOpen)}
              styles={{
                root: {
                  '&:hover': {
                    background: theme.colors.orange[0],
                    color: theme.colors.orange[6],
                  },
                },
              }}
            >
              <Indicator inline label={cartCount} size={18} color="red" disabled={cartCount === 0}>
                <IconShoppingCart size={20} />
              </Indicator>
            </ActionIcon>
          </Tooltip>

          {/* User Menu */}
          <Menu shadow="md" width={250} position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon variant="subtle" size="lg" style={{ padding: 0 }}>
                <Avatar size="sm" radius="xl" color="blue">
                  {user?.data?.name?.substring(0, 2).toUpperCase() || 'GU'}
                </Avatar>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>
                <Group gap="xs">
                  <Avatar size="sm" radius="xl" color="blue">
                    {user?.data?.name?.substring(0, 2).toUpperCase() || 'GU'}
                  </Avatar>
                  <Box>
                    <Text size="sm" fw={600}>{user?.data?.name || 'Guest'}</Text>
                    <Badge size="xs" color="blue">Customer</Badge>
                  </Box>
                </Group>
              </Menu.Label>
              <Menu.Divider />
              <Menu.Item leftSection={<IconHistory size={16} />} component={Link} to="/customer/orders">
                My Orders
              </Menu.Item>
              <Menu.Divider />
          
              <Menu.Item
                leftSection={<IconLogout size={16} />}
                color="red"
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShell.Header>
  );
}