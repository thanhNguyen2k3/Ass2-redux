import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/joy';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputField from '../components/InputField';
import { Form, Formik } from 'formik';
import { LoginSchema } from '../schemas';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { LoginInput, MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const router = useNavigate();

    const initialValues: LoginInput = {
        usernameOrEmail: '',
        password: '',
    };

    const [login, { loading }] = useLoginMutation();

    const handleLoginSubmit = async (values: LoginInput) => {
        try {
            await login({
                variables: {
                    loginInput: values,
                },
                update(cache, { data }) {
                    if (data?.login.success) {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: { me: data.login.user },
                        });
                    }
                },
            });

            router('/');

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
                    Đăng nhập
                </Typography>
                <Formik initialValues={initialValues} onSubmit={handleLoginSubmit} validationSchema={LoginSchema}>
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField name="usernameOrEmail" type="text" label="Tên đăng nhập hoặc email" />

                            <InputField name="password" type="password" label="Mật khẩu" />
                            <Button type="submit" loading={isSubmitting} sx={{ mt: 1 }}>
                                Đăng nhập
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default LoginPage;
