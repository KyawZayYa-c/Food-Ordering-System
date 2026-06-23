
import { AppShell, Container } from '@mantine/core';

import { Outlet, Route, Routes } from 'react-router-dom';
import CustomerHeader from './components/CustomerHeader';
import CustomerHome from './home/HomePage';
import PaymentButton from './order/PaymentButton';
import CustomerMyOrders from './myorders/CustomerMyOrders';

export default function ClientPage() {

  return (
    <AppShell header={{ height: 60 }} >
      <CustomerHeader  />
       <AppShell.Main>
              <Container fluid p="sm">
                    <Routes>
                      <Route path="/" element={<CustomerHome />} />
                      {/* <Route path="/customers" element={<CustomerPage />} />
                      <Route path="/products" element={<ProductPage />} /> */}
                      <Route path="customer/orders" element={<CustomerMyOrders />} />
                    </Routes>
              </Container>
            </AppShell.Main>
    </AppShell>
  );
}