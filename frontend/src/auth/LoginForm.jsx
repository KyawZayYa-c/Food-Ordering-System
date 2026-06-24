import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack, 
  Paper, 
  Title, 
  Container, 
  Anchor, 
  Text, 
  Alert,
  Box,
  ThemeIcon,
  Divider,
  Group,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../lib/schemas/authSchema";
import { useLoginMutation } from "../lib/features/auth/authApiSlice";
import { IconAlertCircle, IconChefHat, IconMail, IconLock } from "@tabler/icons-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      console.log('Login response:', response);

      if (response.role === 'admin') {
        navigate('/dashboard/products');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const errorMessage = error?.data?.message || error?.message || 'Login failed. Please try again.';

  return (
    <Box 
      style={{ 
        minHeight: '100vh', 
        width: '100%',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Container size={450} w="100%">
        <Paper 
          withBorder 
          p="xl" 
          radius="lg" 
          shadow="xl"
          style={{
            background: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Logo and Title */}
          <Box ta="center" mb="xl">
            <ThemeIcon 
              size={60} 
              radius="xl" 
              color="blue"
              style={{
                background: 'linear-gradient(135deg, #228be6, #15aabf)',
                marginBottom: '12px',
              }}
            >
              <IconChefHat size={30} color="white" />
            </ThemeIcon>
            <Title 
              order={1} 
              size={32} 
              variant="gradient" 
              gradient={{ from: 'blue', to: 'cyan' }}
              fw={800}
            >
              FoodDash
            </Title>
            <Text size="sm" c="dimmed" mt={4}>
              Welcome back! Please login to your account
            </Text>
          </Box>

          {/* Error Alert */}
          {isError && (
            <Alert 
              icon={<IconAlertCircle size={18} />} 
              title="Login Failed" 
              color="red" 
              mb="md"
              radius="md"
              variant="filled"
            >
              {errorMessage}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email Address"
                placeholder="Enter your email"
                {...register("email")}
                error={errors.email?.message}
                leftSection={<IconMail size={16} />}
                size="md"
                styles={{
                  input: {
                    borderRadius: 8,
                    '&:focus': {
                      borderColor: '#228be6',
                    },
                  },
                }}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password?.message}
                leftSection={<IconLock size={16} />}
                size="md"
                styles={{
                  input: {
                    borderRadius: 8,
                    '&:focus': {
                      borderColor: '#228be6',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                size="md"
                loading={isLoading}
                styles={{
                  root: {
                    background: 'linear-gradient(135deg, #228be6, #15aabf)',
                    borderRadius: 8,
                    height: 44,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(34, 139, 230, 0.4)',
                    },
                  },
                }}
              >
                Sign In
              </Button>

              <Group justify="space-between" mt="xs">
                <Text size="sm" c="dimmed">
                  Don't have an account?{' '}
                  <Anchor 
                    component={Link} 
                    to="/register"
                    style={{
                      color: '#228be6',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Register
                  </Anchor>
                </Text>
                <Anchor 
                  component={Link} 
                  to="/forgot-password"
                  size="sm"
                  style={{
                    color: '#228be6',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot password?
                </Anchor>
              </Group>
            </Stack>
          </form>

          <Divider my="xl" />

          <Text ta="center" size="xs" c="dimmed">
            By continuing, you agree to our{' '}
            <Anchor href="#" size="xs">Terms of Service</Anchor> and{' '}
            <Anchor href="#" size="xs">Privacy Policy</Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginForm;