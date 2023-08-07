import * as Yup from 'yup';

export const FormCreateSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Quá ngắn').required('Không được bỏ trống'),
    text: Yup.string().min(6, 'Quá ngắn').required('Không được bỏ trống'),
    price: Yup.number().min(1, 'Lớn hơn 0'),
});

export const RegisterSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Quá ngắn').required('Không được bỏ trống'),
    email: Yup.string().email('Vui lòng nhập đúng dạng email').required('Không được bỏ trống'),
    password: Yup.string().min(3, 'Mật khẩu lớn hơn 3 ký tự').required('Không được bỏ trống'),
});

export const LoginSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required('Không được bỏ trống'),
    password: Yup.string().required('Không được bỏ trống'),
});

export const CheckoutSchema = Yup.object().shape({
    username: Yup.string().required('Bắt buộc'),
    email: Yup.string().required('Bắt buộc'),
    phone: Yup.string().required('Bắt buộc'),
    address: Yup.string().required('Bắt buộc'),
});
