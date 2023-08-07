import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/joy';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputField from '../components/InputField';
import { Form, Formik } from 'formik';
import { RegisterSchema } from '../schemas';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { MeDocument, MeQuery, RegisterInput, useRegisterMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const RegisterPage = () => {
    const router = useNavigate();

    const initialValues: RegisterInput = {
        username: '',
        email: '',
        password: '',
    };

    const [register, { loading }] = useRegisterMutation();

    const handleRegisterSubmit = async (values: RegisterInput) => {
        try {
            await register({
                variables: {
                    registerInput: values,
                },
                update(cache, { data }) {
                    // const meData = cache.readQuery({ query: MeDocument });

                    if (data?.register?.success) {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: { me: data.register.user },
                        });
                    }
                },
            });

            router('/login');

            toast.success('Đăng ký thành công', {
                position: 'top-right',
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <Loading />;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik initialValues={initialValues} onSubmit={handleRegisterSubmit} validationSchema={RegisterSchema}>
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField name="username" type="text" label="Tên đăng nhập" />
                            <InputField name="email" type="email" label="Email" />

                            <InputField name="password" type="password" label="Mật khẩu" />
                            <Button type="submit" loading={isSubmitting} sx={{ mt: 1 }}>
                                Đăng ký
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default RegisterPage;
