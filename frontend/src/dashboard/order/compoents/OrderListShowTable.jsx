import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Group,
    Paper,
    ScrollArea,
    Table,
    ThemeIcon,
    Title,
    Text,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { IconEye, IconPackage } from "@tabler/icons-react";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

export default function OrderListShow({ orders, handleViewOrder }) {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
            {/* Header - Fixed on top */}
            <Box 
                p={isMobile ? 'sm' : 'md'} 
                style={{ 
                    borderBottom: `1px solid ${theme.colors.gray[2]}`,
                    background: 'white',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}
            >
                <Group justify="space-between" mb={0} wrap="wrap">
                    <Group gap="xs" wrap="wrap">
                        <ThemeIcon color="blue" size="lg" variant="light">
                            <IconPackage size={24} />
                        </ThemeIcon>
                        <Title order={2}>Orders</Title>
                        <Badge size="lg" color="blue" variant="light">
                            {orders.length} orders
                        </Badge>
                    </Group>
                    <Text size="sm" c="dimmed">
                        Total: ${orders.reduce((sum, o) => sum + (o.total_amount || 0), 0).toFixed(2)}
                    </Text>
                </Group>
            </Box>

            {/* Scrollable Area - Both X and Y */}
            <ScrollArea 
                style={{ 
                    width: '100%', 
                    height: 'calc(100vh - 140px)', 
                    minHeight: 300,
                }} 
                type="auto" 
                offsetScrollbars
            >
                <Box p={isMobile ? 0 : 'md'}>
                    <Table 
                        striped 
                        highlightOnHover
                        verticalSpacing={isMobile ? 'xs' : 'sm'}
                        horizontalSpacing={isMobile ? 'xs' : 'sm'}
                        style={{
                            minWidth: isMobile ? 600 : 700,
                            fontSize: isMobile ? 12 : 14,
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ 
                                    whiteSpace: 'nowrap',
                                    textAlign: 'left',
                                    padding: isMobile ? '6px 4px' : '10px 12px',
                                    fontSize: isMobile ? 10 : 13,
                                    fontWeight: 600,
                                    color: theme.colors.gray[7],
                                    borderBottom: `2px solid ${theme.colors.gray[3]}`,
                                    position: 'sticky',
                                    top: 0,
                                    background: theme.colors.gray[0],
                                    zIndex: 5,
                                }}>
                                    Order ID
                                </th>
                                <th style={{ 
                                    whiteSpace: 'nowrap',
                                    textAlign: 'left',
                                    padding: isMobile ? '6px 4px' : '10px 12px',
                                    fontSize: isMobile ? 10 : 13,
                                    fontWeight: 600,
                                    color: theme.colors.gray[7],
                                    borderBottom: `2px solid ${theme.colors.gray[3]}`,
                                    position: 'sticky',
                                    top: 0,
                                    background: theme.colors.gray[0],
                                    zIndex: 5,
                                }}>
                                    Customer
                                </th>
                                <th style={{ 
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    padding: isMobile ? '6px 4px' : '10px 12px',
                                    fontSize: isMobile ? 10 : 13,
                                    fontWeight: 600,
                                    color: theme.colors.gray[7],
                                    borderBottom: `2px solid ${theme.colors.gray[3]}`,
                                    position: 'sticky',
                                    top: 0,
                                    background: theme.colors.gray[0],
                                    zIndex: 5,
                                }}>
                                    Items
                                </th>
                                <th style={{ 
                                    whiteSpace: 'nowrap',
                                    textAlign: 'right',
                                    padding: isMobile ? '6px 4px' : '10px 12px',
                                    fontSize: isMobile ? 10 : 13,
                                    fontWeight: 600,
                                    color: theme.colors.gray[7],
                                    borderBottom: `2px solid ${theme.colors.gray[3]}`,
                                    position: 'sticky',
                                    top: 0,
                                    background: theme.colors.gray[0],
                                    zIndex: 5,
                                }}>
                                    Total
                                </th>
                                <th style={{ 
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    padding: isMobile ? '6px 4px' : '10px 12px',
                                    fontSize: isMobile ? 10 : 13,
                                    fontWeight: 600,
                                    color: theme.colors.gray[7],
                                    borderBottom: `2px solid ${theme.colors.gray[3]}`,
                                    position: 'sticky',
                                    top: 0,
                                    background: theme.colors.gray[0],
                                    zIndex: 5,
                                }}>
                                    Status
                                </th>
                                <th style={{ 
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    padding: isMobile ? '6px 4px' : '10px 12px',
                                    fontSize: isMobile ? 10 : 13,
                                    fontWeight: 600,
                                    color: theme.colors.gray[7],
                                    borderBottom: `2px solid ${theme.colors.gray[3]}`,
                                    position: 'sticky',
                                    top: 0,
                                    background: theme.colors.gray[0],
                                    zIndex: 5,
                                }}>
                                    Payment
                                </th>
                                <th style={{ 
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    padding: isMobile ? '6px 4px' : '10px 12px',
                                    fontSize: isMobile ? 10 : 13,
                                    fontWeight: 600,
                                    color: theme.colors.gray[7],
                                    borderBottom: `2px solid ${theme.colors.gray[3]}`,
                                    position: 'sticky',
                                    top: 0,
                                    background: theme.colors.gray[0],
                                    zIndex: 5,
                                }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>
                                        <Text c="dimmed">No orders found</Text>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} style={{
                                        borderBottom: `1px solid ${theme.colors.gray[2]}`,
                                    }}>
                                        <td style={{
                                            padding: isMobile ? '6px 4px' : '10px 12px',
                                            verticalAlign: 'middle',
                                        }}>
                                            <Text 
                                                size={isMobile ? 'xs' : 'sm'} 
                                                fw={600} 
                                                style={{ 
                                                    fontFamily: 'monospace',
                                                    color: theme.colors.blue[7],
                                                    fontSize: isMobile ? 10 : 13,
                                                }}
                                            >
                                                #{order._id?.slice(-6).toUpperCase()}
                                            </Text>
                                        </td>
                                        <td style={{
                                            padding: isMobile ? '6px 4px' : '10px 12px',
                                            verticalAlign: 'middle',
                                        }}>
                                            <Group gap="xs" wrap="nowrap">
                                                <Avatar 
                                                    size={isMobile ? 'sm' : 'sm'} 
                                                    radius="xl" 
                                                    color="blue"
                                                    style={{ minWidth: 24 }}
                                                >
                                                    {order.customer?.name?.substring(0, 2).toUpperCase() || '?'}
                                                </Avatar>
                                                <Box style={{ minWidth: 0 }}>
                                                    <Text 
                                                        size={isMobile ? 'xs' : 'sm'} 
                                                        fw={500}
                                                        style={{ 
                                                            whiteSpace: 'nowrap',
                                                            fontSize: isMobile ? 11 : 14,
                                                        }}
                                                    >
                                                        {order.customer?.name || 'N/A'}
                                                    </Text>
                                                    {!isMobile && (
                                                        <Text size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                                                            {order.customer?.email || 'N/A'}
                                                        </Text>
                                                    )}
                                                </Box>
                                            </Group>
                                        </td>
                                        <td style={{
                                            padding: isMobile ? '6px 4px' : '10px 12px',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}>
                                            <Badge 
                                                size={isMobile ? 'xs' : 'sm'} 
                                                variant="light" 
                                                color="gray"
                                            >
                                                {order.items?.length || 0}
                                            </Badge>
                                        </td>
                                        <td style={{
                                            padding: isMobile ? '6px 4px' : '10px 12px',
                                            textAlign: 'right',
                                            verticalAlign: 'middle',
                                        }}>
                                            <Text 
                                                fw={700} 
                                                size={isMobile ? 'sm' : 'md'}
                                                style={{ 
                                                    color: theme.colors.blue[6],
                                                    fontSize: isMobile ? 12 : 15,
                                                }}
                                            >
                                                ${order.total_amount?.toFixed(2) || '0.00'}
                                            </Text>
                                        </td>
                                        <td style={{
                                            padding: isMobile ? '6px 4px' : '10px 12px',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}>
                                            <OrderStatusBadge status={order.status} />
                                        </td>
                                        <td style={{
                                            padding: isMobile ? '6px 4px' : '10px 12px',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}>
                                            <PaymentStatusBadge status={order.payment_status} />
                                        </td>
                                        <td style={{
                                            padding: isMobile ? '6px 4px' : '10px 12px',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}>
                                            <Tooltip label="View Details">
                                                <ActionIcon
                                                    color="blue"
                                                    variant="light"
                                                    onClick={() => handleViewOrder(order)}
                                                    size={isMobile ? 'sm' : 'md'}
                                                >
                                                    <IconEye size={isMobile ? 16 : 18} />
                                                </ActionIcon>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Box>
            </ScrollArea>
        </Paper>
    );
}