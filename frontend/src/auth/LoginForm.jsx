import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, PasswordInput, Button, Stack, Paper, Title, Container, Anchor, Text, Center } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../lib/schemas/authSchema";
import { useLoginMutation } from "../lib/features/auth/authApiSlice";


const LoginForm = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();

      if (response.role === 'admin') {
        navigate('/dashboard/overviews');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

    return (
        <Center size={500} style={{ minHeight: '100vh' , width: '100%' }}>
            <Container size={500} w="100%">
            <Paper withBorder p="xl" radius="md">
                <Title order={3} mb="md">Login</Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                    <TextInput label="Email" {...register("email")} error={errors.email?.message} />
                    <PasswordInput label="Password" {...register("password")} error={errors.password?.message} />
                        <Button type="submit" fullWidth loading={isLoading}>Login</Button>
                        <Text ta="center" size="sm">
                        Don't have an account? <Anchor component={Link} to="/register">Register</Anchor>
                    </Text>
                    </Stack>
                    </form>
                </Paper>
            </Container>
        </Center>
     
    
  );
};

export default LoginForm;