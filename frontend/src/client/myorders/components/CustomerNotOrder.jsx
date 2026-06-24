import { Box, Center, ThemeIcon } from "@mantine/core";
import { IconPackage } from "@tabler/icons-react";

export default 
function CustomerNotOrder() {
  return <Center h={300}>
    <Box ta="center">
      <ThemeIcon size={60} radius="xl" color="gray" variant="light" mb="md">
        <IconPackage size={30} />
      </ThemeIcon>
      <Text fw={600} size="lg">No Orders Yet</Text>
      <Text size="sm" c="dimmed">You haven't placed any orders yet.</Text>
    </Box>
  </Center>;
}