import { useState } from 'react';
import {
  AppShell,
  Group,
  ActionIcon,
  TextInput,
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
  IconSearch,
  IconBell,
  IconShoppingCart,
  IconUser,
  IconHeart,
  IconHistory,
  IconLogout,
  IconSettings,
  IconHelpCircle,
  IconChefHat,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProfileQuery, useLogoutMutation } from '../../../lib/features/auth/authApiSlice';

export default function CustomerHeader() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data: user } = useGetProfileQuery();
  const [logout] = useLogoutMutation();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const cartCount = 0;

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
          <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => navigate('/customer/home')}>
            <ThemeIcon color="blue" size={30} radius="md">
              <IconChefHat size={18} />
            </ThemeIcon>
            <Text fw={700} size="md" visibleFrom="xs">
              FoodDash
            </Text>
          </Group>
        </Group>

        {/* Center Section - Search (Desktop) */}
        <TextInput
          placeholder="Search for food, restaurants..."
          visibleFrom="md"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          styles={{
            root: {
              width: '100%',
              maxWidth: 500,
            },
            input: {
              borderRadius: theme.radius.xl,
              background: theme.colors.gray[0],
              border: 'none',
              '&:focus': {
                background: 'white',
                border: `1px solid ${theme.colors.blue[4]}`,
              },
            },
          }}
        />

        {/* Right Section - Actions */}
        <Group gap="xs" wrap="nowrap">
          <Box hiddenFrom="md">
            {!isSearchActive ? (
              <ActionIcon variant="subtle" color="gray" size="lg" onClick={() => setIsSearchActive(true)}>
                <IconSearch size={20} />
              </ActionIcon>
            ) : (
              <TextInput
                placeholder="Search..."
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                style={{ width: 140 }}
                size="xs"
                onBlur={() => {
                  setTimeout(() => setIsSearchActive(false), 150);
                }}
              />
            )}
          </Box>

          {/* Notifications */}
          <Menu shadow="md" width={300} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="lg">
                <Indicator inline label="3" size={16} color="red">
                  <IconBell size={20} />
                </Indicator>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Notifications</Menu.Label>
              <Menu.Item>New order update</Menu.Item>
              <Menu.Item>Special offer available</Menu.Item>
              <Menu.Item>Your order is delivered</Menu.Item>
              <Menu.Divider />
              <Menu.Item component={Link} to="/customer/notifications" fw={500}>
                View all notifications
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* Cart */}
          <Tooltip label="Cart">
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              onClick={() => navigate('/customer/cart')}
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
              <Menu.Item leftSection={<IconUser size={16} />} component={Link} to="/customer/profile">
                My Profile
              </Menu.Item>
              <Menu.Item leftSection={<IconHistory size={16} />} component={Link} to="/customer/orders">
                My Orders
              </Menu.Item>
              <Menu.Item leftSection={<IconHeart size={16} />} component={Link} to="/customer/favorites">
                Favorites
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IconSettings size={16} />}>Settings</Menu.Item>
              <Menu.Item leftSection={<IconHelpCircle size={16} />}>Help & Support</Menu.Item>
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