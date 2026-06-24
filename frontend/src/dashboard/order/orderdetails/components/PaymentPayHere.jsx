import { Button } from "@mantine/core";
import PaymentButton from "../../../../client/order/PaymentButton";
import { IconCreditCard } from "@tabler/icons-react";

export default function PaymentPayHere({
    showPayment,
    handlePayNow,
    order,
    handlePaymentSuccess,
    handlePaymentError
}) {
  return <>
    {!showPayment ? (
      <Button
        color="green"
        size="md"
        fullWidth
        leftSection={<IconCreditCard size={18} />}
        onClick={handlePayNow}
        styles={{
          root: {
            borderRadius: 8,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 15px rgba(34, 139, 230, 0.3)',
            },
          },
        }}
      >
        Pay Now
      </Button>
    ) : (
      <PaymentButton
        orderId={order._id}
        amount={order.total_amount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError} />
    )}
  </>;
}