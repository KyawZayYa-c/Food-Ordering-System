import { Badge,Image, Box,Text, Group, Paper, Stack, ThemeIcon, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPhoto, IconShoppingCart } from "@tabler/icons-react";
import { ImageURL } from "../../../../lib/api/BaseURL";

export default function OrderItems({order}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Paper withBorder p="md" radius="md">
      <Group gap="xs" mb="md">
        <ThemeIcon color="orange" size="sm" variant="light">
          <IconShoppingCart size={14} />
        </ThemeIcon>
        <Text fw={600} size="sm">Order Items</Text>
        <Badge size="sm" variant="light">{order.items?.length || 0} items</Badge>
      </Group>

      <Stack gap="sm">
        {order.items?.map((item, index) => (
          <Paper 
            key={index} 
            withBorder 
            p="sm" 
            radius="md"
            style={{
              background: theme.colors.gray[0],
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'white',
                boxShadow: theme.shadows.sm,
              },
            }}
          >
            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm" wrap="nowrap" style={{ flex: 1 }}>
                {item.product?.image_url ? (
                  <Image
                    crossOrigin="anonymous"
                    src={`${ImageURL}${item.product.image_url}`}
                    w={isMobile ? 50 : 60}
                    h={isMobile ? 50 : 60}
                    radius="md"
                    fit="cover"
                    fallbackSrc="https://placehold.co/60x60?text=No+Image"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/60x60?text=Error';
                    }}
                  />
                ) : (
                  <Box
                    w={isMobile ? 50 : 60}
                    h={isMobile ? 50 : 60}
                    style={{
                      background: theme.colors.gray[2],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: theme.radius.md,
                    }}
                  >
                    <IconPhoto size={isMobile ? 24 : 30} color={theme.colors.gray[5]} />
                  </Box>
                )}
                
                <Box style={{ flex: 1 }}>
                  <Text fw={600} size={isMobile ? 'sm' : 'md'}>
                    {item.product?.name || 'Unknown'}
                  </Text>
                  {item.product?.category && (
                    <Text size="xs" c="dimmed">
                      {item.product.category}
                    </Text>
                  )}
                </Box>
              </Group>

              <Group gap="xl" wrap="nowrap">
                <Box style={{ textAlign: 'center' }}>
                  <Text size="xs" c="dimmed">Price</Text>
                  <Text size={isMobile ? 'sm' : 'md'} fw={500}>
                    ${item.product?.price?.toFixed(2) || '0.00'}
                  </Text>
                </Box>
                
                <Box style={{ textAlign: 'center' }}>
                  <Text size="xs" c="dimmed">Qty</Text>
                  <Badge size="md" variant="light" color="blue" radius="xl">
                    {item.quantity}
                  </Badge>
                </Box>
                
                <Box style={{ textAlign: 'right' }}>
                  <Text size="xs" c="dimmed">Total</Text>
                  <Text fw={700} size={isMobile ? 'sm' : 'md'} c="blue">
                    ${(item.product?.price * item.quantity)?.toFixed(2) || '0.00'}
                  </Text>
                </Box>
              </Group>
            </Group>
          </Paper>
        ))}
      </Stack>

      {/* Total */}
      <Paper 
        withBorder 
        p="md" 
        radius="md" 
        mt="sm"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.blue[0]}, ${theme.colors.cyan[0]})`,
          borderColor: theme.colors.blue[3],
        }}
      >
        <Group justify="space-between">
          <Text fw={700} size="lg">Total Amount</Text>
          <Text fw={800} size="xl" c="blue">
            ${order.total_amount?.toFixed(2) || '0.00'}
          </Text>
        </Group>
      </Paper>
    </Paper>
  );
}