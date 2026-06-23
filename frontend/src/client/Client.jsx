
import { AppShell, Container } from '@mantine/core';

import {  Route, Routes } from 'react-router-dom';
import CustomerHeader from './components/CustomerHeader';
import CustomerHome from './home/HomePage';
import CustomerMyOrders from './myorders/CustomerMyOrders';
import PaymentSuccess from './order/components/PaymentSuccess';
import PaymentCancel from './order/components/PaymentCancel';

export default function ClientPage() {

  return (
    <AppShell header={{ height: 60 }} >
      <CustomerHeader  />
       <AppShell.Main>
              <Container fluid p="sm">
                    <Routes>
                      <Route path="/" element={<CustomerHome />} />
                      <Route path="/payment/success" element={<PaymentSuccess />} />
                      <Route path="/payment/cancel" element={<PaymentCancel />} />
                      <Route path="customer/orders" element={<CustomerMyOrders />} />
                    </Routes>
              </Container>
            </AppShell.Main>
    </AppShell>
  );
}