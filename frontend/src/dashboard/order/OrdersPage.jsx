import { useState } from 'react';
import {
  Container,
} from '@mantine/core';
import { useGetAllOrdersQuery } from '../../lib/features/order/orderApiSlice';
import OrderDetailModal from './orderdetails/OrderDetailModal';
import OrderListShowTable from './compoents/OrderListShowTable';
import ErrorDisplay from '../../components/ErrorDisplay';
import OrderLoading from '../../components/OrderLoading';


export default function OrderPage() {
  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery(undefined, {
    refetchOnFocus: true, //  Tab open refresh 
    refetchOnReconnect: true, // Internet connect  refresh 
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const orders = data?.data || [];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setSelectedOrder(null);
    refetch(); 
  };


  if (isLoading) {
      return (
         <Container size="xl" py="md">
        <OrderLoading />
      </Container>
    );
  }

  if (isError) {
    return (
      <ErrorDisplay 
        title="Error loading orders"
        message={'Something went wrong. Please try again.'}
        buttonText="Retry Connection"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Container size="xl" >
      <OrderListShowTable orders={orders} handleViewOrder={handleViewOrder} />

      <OrderDetailModal
        opened={modalOpened}
        onClose={handleModalClose}
        order={selectedOrder}
        refetchOrders={refetch}
      />
    </Container>
  );

  
}

