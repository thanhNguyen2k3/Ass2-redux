import Box from '@mui/material/Box';
import InputField from '../components/InputField';
import { Button } from '@mui/joy';

import {
    useGetCategoriesQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useUploadFileMutation,
} from '../api/product';
import { Formik, Form } from 'formik';
import { IProduct } from '../types/Product';
import { Alert, CircularProgress, FormControl, Skeleton, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';

const UpdateProduct = () => {
    const router = useNavigate();
    let { productId } = useParams();

    const [updateProduct, { isSuccess, isError }] = useUpdateProductMutation();
    const { data: product, isLoading: productLoading } = useGetProductByIdQuery(productId || '');
    const [uploadFile, { isLoading: uploadLoading, isSuccess: uploadSuccess }] = useUploadFileMutation();
    const { data: categories } = useGetCategoriesQuery();

    const [image, setImage] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const uploadFileSubmit = async (e: SyntheticEvent) => {
        const formData = new FormData();
        let target = e.target as HTMLInputElement;

        const file = target.files?.[0];

        formData.append('file', file as any);
        formData.append('upload_preset', 'uploads');

        try {
            const uploaded: any = await uploadFile(formData);

            const { url } = uploaded.data;

            setImage(url);
        } catch (error) {
            console.log(error);
        }
    };

    const initialValue: IProduct = {
        name: product?.name,
        price: product?.price,
        text: product?.text,
        image: product?.image,
    };

    const handleSelect = (e: SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        const value = target.value;

        setCategory(value);
    };

    const updateProductSubmit = async (values: IProduct) => {
        try {
            await updateProduct({
                id: productId,
                image,
                category,
                ...values,
            }).then(() => router('/admin'));
        } catch (error) {
            console.log(error);
        }
    };

    if (productLoading)
        return (
            <Box sx={{ width: '100%' }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
        );

    return (
        <Box>
            {isError && <Alert severity="warning">This is a success alert — check it out!</Alert>}

            {isSuccess && <Alert severity="success">This is a success alert — check it out!</Alert>}

            {uploadSuccess && <Alert severity="success">This is a success alert — check it out!</Alert>}
            <Formik initialValues={initialValue} onSubmit={updateProductSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="name" type="text" label="Name" />
                        <InputField name="text" type="text" textarea />
                        {uploadLoading ? (
                            <CircularProgress />
                        ) : (
                            <FormControl sx={{ width: '100%', mt: 1 }}>
                                <TextField
                                    id="image"
                                    name="image"
                                    type="file"
                                    variant="outlined"
                                    onChange={uploadFileSubmit}
                                />
                            </FormControl>
                        )}

                        <select
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="category"
                            id="category"
                            onChange={handleSelect}
                        >
                            <option value={''}> -- Loại hàng --</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.cateName}
                                </option>
                            ))}
                        </select>

                        <InputField name="price" type="number" label="Price" />
                        <Button type="submit" loading={isSubmitting} sx={{ mt: 1 }}>
                            Cập nhật
                        </Button>
                    </Form>
                )}
            </Formik>

            <Box sx={{ mt: 2, padding: '4px 0', borderTop: '1px solid #ccc' }}>
                <Typography>Ảnh của bạn</Typography>
                <img src={product?.image} alt={product?.image} width={80} height={60} />
            </Box>
        </Box>
    );
};

export default UpdateProduct;
