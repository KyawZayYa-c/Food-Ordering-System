import {
  AppShell,
  Text,
  Group,
  ScrollArea,
  Box,
  Button,
  Divider,
  ActionIcon,
  Avatar,
  Stack,
} from '@mantine/core';
import {
  IconShoppingCart,
  IconUsers,
  IconChartBar,
  IconLogout,
  IconCategory,
} from '@tabler/icons-react';

import { Link, useLocation } from 'react-router-dom';
export default function Sidebar() {
    
    const location = useLocation();
    const isSelected = (path) => location.pathname === path;
    return (
         <AppShell.Navbar p="md">
                <AppShell.Section grow component={ScrollArea} ml={-10} mr={-10} px={10}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c="dimmed" mb="xs">
                      MAIN MENU
                    </Text>
                    <Button
                    component={Link}
                    to = "/dashboard/overviews"  
                     variant={isSelected('/dashboard/overviews') ? 'filled' : 'subtle'}
                      leftSection={<IconChartBar size={18} />}
                      fullWidth
                      justify="start"
                    >
                      Overview
                    </Button>
                    <Button
                    component={Link}
                    to = "/dashboard/foods"  
                     variant={isSelected('/dashboard/foods') ? 'filled' : 'subtle'}
                      leftSection={<IconCategory size={18} />}
                      fullWidth
                      justify="start"
                    >
                      Menu Items
                    </Button>
                     <Button
                    component={Link}
                    to = "/dashboard/orders"  
                     variant={isSelected('/dashboard/orders') ? 'filled' : 'subtle'}
                      leftSection={<IconShoppingCart size={18} />}
                      fullWidth
                      justify="start"
                    >
                      Orders
                    </Button>
                    <Button
                    component={Link}
                    to = "/dashboard/customers"  
                     variant={isSelected('/dashboard/customers') ? 'filled' : 'subtle'}
                      leftSection={<IconUsers size={18} />}
                      fullWidth
                      justify="start"
                    >
                      Customers
                    </Button>
                    
                  </Stack>
                </AppShell.Section>
                <AppShell.Section>
                  <Stack gap="xs">
                    <Divider />
                    <Group>
                      <Avatar color="blue" radius="xl">KZY</Avatar>
                      <Box>
                        <Text size="sm" fw={500}>Kyaw zay Ya</Text>
                        <Text size="xs" c="dimmed">Admin</Text>
                      </Box>
                      <ActionIcon variant="subtle" color="gray">
                        <IconLogout size={18} />
                      </ActionIcon>
                    </Group>
                  </Stack>
                </AppShell.Section>
              </AppShell.Navbar>
    )
}