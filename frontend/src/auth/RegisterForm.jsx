import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput,Center, Container, Text , Anchor, PasswordInput, Button, Stack, Paper, Title } from "@mantine/core";
import { registerSchema } from "../../lib/schemas/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../lib/features/auth/authApiSlice";
const RegisterForm = () => {
    const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

    const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      navigate('/');
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

    return (
        <Center size={500} style={{ minHeight: '100vh' , width: '100%' }}>
          <Container size={500} w="100%">
            <Paper withBorder p="xl" radius="md">
            <Title order={3} mb="md">Create Account</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                <TextInput label="Name" {...register("name")} error={errors.name?.message} />
                <TextInput label="Email" {...register("email")} error={errors.email?.message} />
                <TextInput label="Phone" {...register("phone")} error={errors.phone?.message} />
                <PasswordInput label="Password" {...register("password")} error={errors.password?.message} />
                    <Button type="submit" fullWidth loading={isLoading}>Register</Button>
                    <Text ta="center" size="sm">
                        Already have an account? <Anchor component={Link} to="/login">Login</Anchor>
                </Text>
                 </Stack>
            </form>
        </Paper>
       </Container>
    </Center>
  );
};

export default RegisterForm;