import { 
  Paper, 
  Box, 
  Group, 
  Title, 
  Badge, 
  Text, 
  Table, 
  Skeleton, 
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPackage } from '@tabler/icons-react';

export default function OrderLoading() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');

  const getRowCount = () => {
    if (isMobile) return 4;
    if (isTablet) return 6;
    return 8;
  };

  return (
    <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
      <Box 
        p={isMobile ? 'sm' : 'md'} 
        style={{ 
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          background: 'white',
        }}
      >
        <Group justify="space-between" mb={0} wrap="wrap">
          <Group gap="xs" wrap="wrap">
            <ThemeIcon color="blue" size="lg" variant="light">
              <IconPackage size={24} />
            </ThemeIcon>
            <Title order={2}>Orders</Title>
            <Badge size="lg" color="blue" variant="light">
              <Skeleton w={30} h={16} />
            </Badge>
          </Group>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Text size="sm" c="dimmed" component="span">Total: </Text>
            <Skeleton w={60} h={16} display="inline-block" />
          </Box>
        </Group>
      </Box>

      <Box p={isMobile ? 0 : 'md'}>
        <Table 
          verticalSpacing={isMobile ? 'xs' : 'sm'}
          horizontalSpacing={isMobile ? 'xs' : 'sm'}
          style={{
            minWidth: isMobile ? 600 : 700,
          }}
        >
          <thead>
            <tr>
              <th style={{ 
                padding: isMobile ? '6px 4px' : '10px 12px',
                fontSize: isMobile ? 10 : 13,
                fontWeight: 600,
                color: theme.colors.gray[7],
                borderBottom: `2px solid ${theme.colors.gray[3]}`,
              }}>
                Order ID
              </th>
              <th style={{ 
                padding: isMobile ? '6px 4px' : '10px 12px',
                fontSize: isMobile ? 10 : 13,
                fontWeight: 600,
                color: theme.colors.gray[7],
                borderBottom: `2px solid ${theme.colors.gray[3]}`,
              }}>
                Customer
              </th>
              <th style={{ 
                padding: isMobile ? '6px 4px' : '10px 12px',
                fontSize: isMobile ? 10 : 13,
                fontWeight: 600,
                color: theme.colors.gray[7],
                borderBottom: `2px solid ${theme.colors.gray[3]}`,
                textAlign: 'center',
              }}>
                Items
              </th>
              <th style={{ 
                padding: isMobile ? '6px 4px' : '10px 12px',
                fontSize: isMobile ? 10 : 13,
                fontWeight: 600,
                color: theme.colors.gray[7],
                borderBottom: `2px solid ${theme.colors.gray[3]}`,
                textAlign: 'right',
              }}>
                Total
              </th>
              <th style={{ 
                padding: isMobile ? '6px 4px' : '10px 12px',
                fontSize: isMobile ? 10 : 13,
                fontWeight: 600,
                color: theme.colors.gray[7],
                borderBottom: `2px solid ${theme.colors.gray[3]}`,
                textAlign: 'center',
              }}>
                Status
              </th>
              <th style={{ 
                padding: isMobile ? '6px 4px' : '10px 12px',
                fontSize: isMobile ? 10 : 13,
                fontWeight: 600,
                color: theme.colors.gray[7],
                borderBottom: `2px solid ${theme.colors.gray[3]}`,
                textAlign: 'center',
              }}>
                Payment
              </th>
              <th style={{ 
                padding: isMobile ? '6px 4px' : '10px 12px',
                fontSize: isMobile ? 10 : 13,
                fontWeight: 600,
                color: theme.colors.gray[7],
                borderBottom: `2px solid ${theme.colors.gray[3]}`,
                textAlign: 'center',
              }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: getRowCount() }).map((_, index) => (
              <tr key={index} style={{
                borderBottom: `1px solid ${theme.colors.gray[2]}`,
              }}>
                <td style={{
                  padding: isMobile ? '6px 4px' : '10px 12px',
                  verticalAlign: 'middle',
                }}>
                  <Skeleton 
                    height={isMobile ? 14 : 18} 
                    width={isMobile ? 50 : 70} 
                    radius="sm"
                  />
                </td>
                <td style={{
                  padding: isMobile ? '6px 4px' : '10px 12px',
                  verticalAlign: 'middle',
                }}>
                  <Group gap="xs" wrap="nowrap">
                    <Skeleton circle height={isMobile ? 28 : 32} width={isMobile ? 28 : 32} />
                    <Box>
                      <Skeleton 
                        height={isMobile ? 12 : 16} 
                        width={isMobile ? 80 : 120} 
                        radius="sm"
                        mb={isMobile ? 2 : 4}
                      />
                      {!isMobile && (
                        <Skeleton 
                          height={10} 
                          width={isMobile ? 60 : 100} 
                          radius="sm"
                        />
                      )}
                    </Box>
                  </Group>
                </td>
                <td style={{
                  padding: isMobile ? '6px 4px' : '10px 12px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}>
                  <Skeleton 
                    height={isMobile ? 16 : 20} 
                    width={isMobile ? 24 : 30} 
                    radius="xl"
                    style={{ margin: '0 auto' }}
                  />
                </td>
                <td style={{
                  padding: isMobile ? '6px 4px' : '10px 12px',
                  textAlign: 'right',
                  verticalAlign: 'middle',
                }}>
                  <Skeleton 
                    height={isMobile ? 14 : 18} 
                    width={isMobile ? 50 : 70} 
                    radius="sm"
                    style={{ marginLeft: 'auto' }}
                  />
                </td>
                <td style={{
                  padding: isMobile ? '6px 4px' : '10px 12px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}>
                  <Skeleton 
                    height={isMobile ? 20 : 26} 
                    width={isMobile ? 50 : 70} 
                    radius="xl"
                    style={{ margin: '0 auto' }}
                  />
                </td>
                <td style={{
                  padding: isMobile ? '6px 4px' : '10px 12px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}>
                  <Skeleton 
                    height={isMobile ? 20 : 26} 
                    width={isMobile ? 50 : 70} 
                    radius="xl"
                    style={{ margin: '0 auto' }}
                  />
                </td>
                <td style={{
                  padding: isMobile ? '6px 4px' : '10px 12px',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}>
                  <Skeleton 
                    circle 
                    height={isMobile ? 28 : 32} 
                    width={isMobile ? 28 : 32} 
                    style={{ margin: '0 auto' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Paper>
  );
}