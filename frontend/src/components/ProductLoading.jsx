import { SimpleGrid, Skeleton, Card, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const ProductLoading = () => {
  const theme = useMantineTheme();
  
  const isLarge = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`); 
  const isMedium = useMediaQuery(`(min-width: ${theme.breakpoints.md})`); 
  const isSmall = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`);  

  const getSkeletonCount = () => {
    if (isLarge) return 8;
    if (isMedium) return 8;
    if (isSmall) return 4;
    return 2; 
  };

    return (
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="sm">
        {Array.from({ length: getSkeletonCount() }).map((_, index) => (
          <Card key={index} shadow="sm" padding="sm" radius="md" withBorder>
            <Card.Section>
              <Skeleton height={160} />
            </Card.Section>
            <Stack mt="md" gap="xs">
              <Skeleton height={20} width="70%" />
              <Skeleton height={15} width="100%" />
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    );
  
};

export default ProductLoading;