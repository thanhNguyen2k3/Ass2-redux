import { Form, Formik } from 'formik';
import InputField from '../components/InputField';
import { Button } from '@mui/joy';
import { useMeQuery } from '../generated/graphql';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { CheckoutSchema } from '../schemas';
import { useCheckoutMutation } from '../api/product';
import { ICheckout } from '../types/Checkout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { clear } from '../slices/cart';

const Checkout = () => {
    const dispatch = useAppDispatch();
    const { data: meData } = useMeQuery();
    const { cartItems } = useAppSelector((state) => state.cart);
    const [checkoutUser, { isLoading }] = useCheckoutMutation();
    const router = useNavigate();

    const initialValue = {
        username: meData?.me?.username as string,
        email: meData?.me?.email as string,
        userId: meData?.me?.id as string,
        products: cartItems,
        address: '',
        phone: '',
        state: 1,
    };

    const handleSubmit = async (values: ICheckout) => {
        try {
            await checkoutUser({
                ...values,
            });

            dispatch(clear());

            router('/');

            toast.success('Đã đặt hàng', {
                position: 'bottom-right',
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={CheckoutSchema}>
            {({ isSubmitting }) => (
                <Form>
                    <InputField disable name="username" type="text" label="Tên đăng nhập" />
                    <InputField disable name="email" type="text" label="Email" />
                    <InputField name="phone" type="text" label="Số điện thoại" />
                    <InputField name="address" type="text" textarea label="Địa chỉ" placeholder="Địa chỉ..." />
                    <Button type="submit" loading={isSubmitting} sx={{ mt: 1 }}>
                        Gửi biểu mẫu
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default Checkout;
