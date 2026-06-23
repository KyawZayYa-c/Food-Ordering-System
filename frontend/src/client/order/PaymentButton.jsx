import { useState } from 'react';
import { Button, Alert } from '@mantine/core';
import { IconCreditCard } from '@tabler/icons-react';
import { BaseURL } from '../../lib/api/BaseURL';

export default function PaymentButton({ orderId, amount, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      if (typeof payhere === 'undefined') {
        throw new Error('PayHere SDK not loaded. Please refresh the page.');
      }

      const user = JSON.parse(localStorage.getItem('user')) || {};
      
      const paymentDetails = {
        order_id: orderId,
        amount: amount || '100.00',
        currency: 'LKR',
        first_name: user?.name?.split(' ')[0] || 'Customer',
        last_name: user?.name?.split(' ').slice(1).join(' ') || 'User',
        email: user?.email || 'customer@example.com',
        phone: user?.phone || '0771234567',
        address: '123, Main Street',
        city: 'Colombo',
        country: 'Sri Lanka',
      };

      const response = await fetch(`${BaseURL}/payment/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate payment hash');
      }
      console.log('data : ', data);
      if (data.hash && data.merchant_id) {
        const payment = {
          sandbox: true,
          merchant_id: data.merchant_id,
          return_url: `${window.location.origin}/payment/success?order_id=${paymentDetails.order_id}`,
          cancel_url: `${window.location.origin}/payment/cancel?order_id=${paymentDetails.order_id}`,
          notify_url: `${BaseURL}/payment/notify`,
          order_id: paymentDetails.order_id,
          items: `Order #${orderId?.slice(-6).toUpperCase()}`,
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          first_name: paymentDetails.first_name,
          last_name: paymentDetails.last_name,
          email: paymentDetails.email,
          phone: paymentDetails.phone,
          address: paymentDetails.address,
          city: paymentDetails.city,
          country: paymentDetails.country,
          hash: data.hash,
        };
        window.payhere.onCompleted = function(orderId) {
            console.log("✅ Payment completed. OrderID:", orderId);
            

            localStorage.setItem('lastOrderId', orderId);
            
            // 1. Update order.payment_status in database
            fetch(`${BaseURL}/orders/${orderId}/payment-status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    payment_status: 'Paid',
                    payment_id: 'PAY-' + Date.now()
                }),
            })
            .then(res => res.json())
            .then(data => {
                console.log('✅ Order payment status updated:', data);
                if (onSuccess) onSuccess(orderId);
            })
            .catch(err => {
                console.error('❌ Failed:', err);
                if (onSuccess) onSuccess(orderId);
            });
        };
        
        window.payhere.onDismissed = function() {
          console.log("❌ Payment dismissed");
          window.location.href = `/payment/cancel?order_id=${paymentDetails.order_id}`;
        };

        window.payhere.onError = function(error) {
          console.log("❌ Payment error:", error);
          if (onError) {
            onError(error);
          }
        };

        console.log('Starting PayHere payment...', payment);
        payhere.startPayment(payment);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'An error occurred while processing your payment.');
      if (onError) {
        onError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <Alert color="red" mb="sm" title="Payment Error">
          {error}
        </Alert>
      )}
      <Button
        onClick={handlePayment}
        size="md"
        radius="md"
        color="blue"
        leftSection={<IconCreditCard size={18} />}
        loading={loading}
        disabled={loading}
        fullWidth
      >
        Pay with PayHere
      </Button>
    </div>
  );
}