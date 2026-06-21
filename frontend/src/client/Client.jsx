
import { AppShell } from '@mantine/core';

import { Outlet } from 'react-router-dom';
import CustomerHeader from './components/CustomerHeader';
import CustomerHome from './home/HomePage';

export default function ClientPage() {

  return (
    <AppShell header={{ height: 60 }} >
      <CustomerHeader  />
      <AppShell.Main>
        <CustomerHome />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}