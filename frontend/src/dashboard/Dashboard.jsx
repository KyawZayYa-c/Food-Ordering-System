import { useState } from 'react';
import {
  AppShell,
  Text,
  Burger,
  useMantineTheme,
  Group,
  Code,
  Container,
  Button,
  ActionIcon,
  ThemeIcon,
} from '@mantine/core';
import {
  IconUserPlus,
  IconBell,
  IconChefHat,
} from '@tabler/icons-react';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './product/ProductPage';
import OrdersPage from './order/OrdersPage';
import CustomerPage from './customer/CustomerPage';
import Overview from './overview/Overview';

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        main: {
          background: theme.colors.gray[0],
          minHeight: '100vh',
        },
      }}
    >
      {/* Header */}
      <AppShell.Header p="xs">
        <Group style={{ height: '100%' }} px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              hiddenFrom="sm"
            />
            <Group gap="xs">
              <ThemeIcon color="blue" size={30}>
                <IconChefHat size={20} />
              </ThemeIcon>
              <Text fw={700} size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                FoodDash
              </Text>
              <Code>v1.0</Code>
            </Group>
          </Group>
          <Group gap="sm">
            <ActionIcon variant="subtle" color="gray">
              <IconBell size={20} />
            </ActionIcon>
            <Button variant="light" leftSection={<IconUserPlus size={16} />} size="xs">
              Add Staff
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <AppShell.Main>
        <Container fluid p="sm">
              <Routes>
                <Route path="/overviews" element={<Overview />} />
                <Route path="/customers" element={<CustomerPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
