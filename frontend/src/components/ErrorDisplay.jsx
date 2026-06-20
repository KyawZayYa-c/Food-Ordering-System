import { Button, Center, Stack, Text, Card, ThemeIcon } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

const ErrorDisplay = ({ 
  title = "Oops! Something went wrong", 
  message = "We couldn't load the data. Please try again or check your connection.", 
  buttonText = "Retry Connection",
  onRetry 
}) => {
  return (
    <Center style={{ height: '60vh' }}>
      <Card shadow="sm" padding="xl" radius="md" withBorder style={{ width: '100%', maxWidth: 450 }}>
        <Stack align="center" gap="sm">
          <ThemeIcon size={60} radius="xl" color="red" variant="light">
            <IconAlertTriangle size={30} />
          </ThemeIcon>

          <Text fw={700} size="lg" mt="sm">{title}</Text>
          
          <Text size="sm" c="dimmed" ta="center">
            {message}
          </Text>

          {onRetry && (
            <Button 
              variant="filled" 
              color="red" 
              mt="md" 
              fullWidth 
              onClick={onRetry}
            >
              {buttonText}
            </Button>
          )}
        </Stack>
      </Card>
    </Center>
  );
};

export default ErrorDisplay;