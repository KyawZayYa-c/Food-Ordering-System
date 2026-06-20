import { Card, Image , Text, Button, Group, Badge, Stack } from '@mantine/core'; 
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { ImageURL } from '../../../../lib/api/BaseURL';
import { useDeleteProductMutation } from '../../../../lib/features/product/productApiSlice';
import { openConfirmModal } from '../../../../lib/modals/confirmModal';

const ProductUiCard = ({ product, onEdit }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleConfirmDelete = async () => {
    deleteProduct(product._id);
  };


  const imageSrc = product.image_url 
    ? `${ImageURL}${product.image_url}` 
    : 'https://placehold.co/400x400?text=No+Image';
  
  const user = "admin";

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Card.Section>
          <Image
            crossOrigin="anonymous"
            src={imageSrc}
            h={160}
            fit="cover" 
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400?text=Error';
            }}
          />
        </Card.Section>

      <Stack mt="md" gap="xs">
       
        <Group justify="space-between">
          <Text fw={500}>{product.name}</Text>
          <Badge color="pink" variant="light">
            {product.category}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {product.description}
        </Text>

        <Text fw={700} size="xl">
          ${product.price.toFixed(2)}
        </Text>
        {
          user == 'admin' ? (
            <>
              <Group gap="xs" grow style={{ width: '100%' }}>
                <Button 
                  leftSection={<IconEdit size={16} />} 
                  variant="light" 
                  color="blue" 
                  onClick={() => onEdit(product)}
                >
                  Edit
                </Button>
                <Button 
                  leftSection={<IconTrash size={16} />} 
                  variant="light" 
                  color="red" 
                 onClick={() => openConfirmModal({
                      title: 'Delete Product',
                      message: 'Are you sure you want to delete this product? This will remove the image and all data.',
                      confirmLabel: 'Delete Now',
                      onConfirm: handleConfirmDelete
                    })}
                >
                  Delete
                </Button>
              </Group>
            </>
          ) : <Button color="blue" fullWidth radius="md"> Add to Order</Button>
        }
      </Stack>
    </Card>
  );
};

export default ProductUiCard;