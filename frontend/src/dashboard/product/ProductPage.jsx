import { Box, Button, Modal, Group, Title } from '@mantine/core';
import ProductList from "./components/ProductList";
import { useDisclosure } from '@mantine/hooks';
import AddProductForm from './components/AddProductForm';
import { useState } from 'react';

export default function ProductPage() {
    const [opened, { open, close }] = useDisclosure(false);
    const [editData, setEditData] = useState(null);

    const handleEditClicked = (product) => {
        setEditData(product);
        open();
    }

    return (
      <Box> 
          <Group justify='space-between' mb='md'>
              <Title order={2} >Menu Items</Title>
              <Button onClick={open}> + Add New Product</Button>
          </Group>
          <ProductList onEdit={handleEditClicked} />
          <Modal
              opened={opened}
                onClose={() => {
                    close();
                    setEditData(null);
              }}
              size='lg'
          >
                <AddProductForm
                    key={editData ? editData.id : "new"}
                    onClose={close}
                    editData={editData} />
          </Modal>
    </Box>
  );
}