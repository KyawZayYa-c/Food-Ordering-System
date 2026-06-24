import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  TextInput, 
  Container, 
  Text, 
  Anchor, 
  PasswordInput, 
  Button, 
  Stack, 
  Paper, 
  Title, 
  Box, 
  ThemeIcon, 
  Divider, 
  Group,
  Alert,
} from "@mantine/core";
import { registerSchema } from "../lib/schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../lib/features/auth/authApiSlice";
import { IconChefHat, IconUser, IconMail, IconPhone, IconLock, IconAlertCircle } from "@tabler/icons-react";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setErrorMessage(null);
    try {
      await registerUser(data).unwrap();
      navigate('/');
    } catch (err) {
      console.error("Registration failed:", err);
      setErrorMessage(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

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
              Create your account and start ordering!
            </Text>
          </Box>

          {/* Error Alert */}
          {errorMessage && (
            <Alert 
              icon={<IconAlertCircle size={18} />} 
              title="Registration Failed" 
              color="red" 
              mb="md"
              radius="md"
              variant="filled"
              withCloseButton
              onClose={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                {...register("name")}
                error={errors.name?.message}
                leftSection={<IconUser size={16} />}
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

              <TextInput
                label="Phone Number"
                placeholder="Enter your phone number"
                {...register("phone")}
                error={errors.phone?.message}
                leftSection={<IconPhone size={16} />}
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
                placeholder="Create a password"
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
                Create Account
              </Button>

              <Group justify="center" mt="xs">
                <Text size="sm" c="dimmed">
                  Already have an account?{' '}
                  <Anchor 
                    component={Link} 
                    to="/login"
                    style={{
                      color: '#228be6',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign In
                  </Anchor>
                </Text>
              </Group>
            </Stack>
          </form>

          <Divider my="xl" />

          <Text ta="center" size="xs" c="dimmed">
            By creating an account, you agree to our{' '}
            <Anchor href="#" size="xs">Terms of Service</Anchor> and{' '}
            <Anchor href="#" size="xs">Privacy Policy</Anchor>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterForm;