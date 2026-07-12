import { TextInput, Stack } from '@mantine/core';
export default function ShippingForm({ shippingInfo, setShippingInfo }) {
  return (
    <Stack gap="xs">
      <TextInput label="Address" placeholder="123, Main Street..." 
        value={shippingInfo.address} 
        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})} required />
      <TextInput label="City" placeholder="City..." 
        value={shippingInfo.city} 
        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})} required />
      <TextInput label="Phone" placeholder="09xxxxxxxxx" 
        value={shippingInfo.phone} 
        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})} required />
    </Stack>
  );
}