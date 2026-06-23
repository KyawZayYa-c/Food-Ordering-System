import { Container, SimpleGrid, Skeleton, Paper, Box, Table, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function CustomerLoading() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container size="xl" py="md">
      {/* Stats Skeleton */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md" mb="md">
        {Array.from({ length: 4 }).map((_, i) => (
          <Paper key={i} p="md" radius="md" withBorder>
            <Group justify="space-between">
              <Box>
                <Skeleton height={14} width={80} mb="xs" />
                <Skeleton height={32} width={50} />
              </Box>
              <Skeleton circle height={45} width={45} />
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      {/* Table Skeleton */}
      <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
          <Group justify="space-between">
            <Skeleton height={24} width={120} />
            <Skeleton height={24} width={80} />
          </Group>
        </Box>
        <Box p={isMobile ? 0 : 'md'}>
          <Table>
            <thead>
              <tr>
                <th><Skeleton height={16} width={80} /></th>
                <th><Skeleton height={16} width={120} /></th>
                <th><Skeleton height={16} width={80} /></th>
                <th style={{ textAlign: 'center' }}><Skeleton height={16} width={60} /></th>
                <th style={{ textAlign: 'center' }}><Skeleton height={16} width={50} /></th>
                <th style={{ textAlign: 'center' }}><Skeleton height={16} width={40} /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Group gap="xs">
                      <Skeleton circle height={32} width={32} />
                      <Skeleton height={16} width={100} />
                    </Group>
                  </td>
                  <td><Skeleton height={16} width={120} /></td>
                  <td><Skeleton height={16} width={80} /></td>
                  <td style={{ textAlign: 'center' }}><Skeleton height={20} width={60} /></td>
                  <td style={{ textAlign: 'center' }}><Skeleton height={20} width={50} /></td>
                  <td style={{ textAlign: 'center' }}><Skeleton circle height={32} width={32} /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
}