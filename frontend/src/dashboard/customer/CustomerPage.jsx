import { useState } from 'react';
import { Container } from '@mantine/core';
import { useGetAllUsersQuery } from '../../lib/features/user/userApiSlice';
import { useGetAllOrdersQuery } from '../../lib/features/order/orderApiSlice';
import CustomerStats from './components/CustomerStats';
import CustomerTable from './components/CustomerTable';
import CustomerLoading from './components/CustomerLoading';
import CustomerDetailModal from './components/CustomerDetailModal';
import ErrorDisplay from '../../components/ErrorDisplay';

export default function CustomerPage() {
  const { data: usersData, isLoading: usersLoading, isError: usersError, error, refetch: refetchUsers } = useGetAllUsersQuery();
  const { data: ordersData } = useGetAllOrdersQuery();
  
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const customers = usersData?.data || [];
  const allOrders = ordersData?.data || [];

  const handleViewCustomer = (customer) => {
    const customerOrders = allOrders.filter(order => order.customer?._id === customer._id);
    setSelectedCustomer({
      ...customer,
      orders: customerOrders  
    });
    setModalOpened(true);
  };

  if (usersLoading) {
    return <CustomerLoading />;
  }

  if (usersError) {
    return (
      <ErrorDisplay 
        title="Error loading customers"
        message={error?.data?.message || 'Something went wrong. Please try again.'}
        buttonText="Retry Connection"
        onRetry={() => refetchUsers()}
      />
    );
  }

  return (
    <Container size="xl" py="md">
      <CustomerStats customers={customers} />
      <CustomerTable 
        customers={customers} 
        onViewCustomer={handleViewCustomer}
      />
      
      <CustomerDetailModal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
      />
    </Container>
  );
}