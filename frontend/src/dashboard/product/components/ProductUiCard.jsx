import { Card, Image , Text, Button, Group, Badge, Stack } from '@mantine/core'; 
import { IconTrash, IconEdit } from '@tabler/icons-react';

const ProductUiCard = ({ product, onEdit }) => {
  const user = "admin";

  const onDelete = (id)=> {
    console.log('Product deleted : ', id);
  }


  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Card.Section>
        <Image
          src={product.image_url}
          height={160}
          alt={product.name}
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
                  onClick={() => onDelete(product._id)}
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