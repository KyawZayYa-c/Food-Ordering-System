
import { AppShell } from '@mantine/core';

import { Outlet } from 'react-router-dom';
import CustomerHeader from './components/CustomerHeader';
import CustomerHome from './home/HomePage';
import PaymentButton from './order/PaymentButton';

export default function ClientPage() {

  return (
    <AppShell header={{ height: 60 }} >
      <CustomerHeader  />
      <AppShell.Main>
        {/* <PaymentButton /> */}
        <CustomerHome />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}