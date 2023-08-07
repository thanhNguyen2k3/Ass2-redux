import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../types/Product';
import { pause } from '../utils/pause';
import { ICategory } from '../types/Category';
import { ICheckout } from '../types/Checkout';

const productApi = createApi({
    reducerPath: 'product',
    tagTypes: ['Product', 'User'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg);
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => '/products',
            providesTags: ['Product'],
        }),
        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`,
        }),
        removeProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        createProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
        }),
        updateProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),

        // User checkout

        checkout: builder.mutation<ICheckout, ICheckout>({
            query: (checkout) => ({
                url: '/orders',
                method: 'POST',
                body: checkout,
            }),
        }),

        getOrders: builder.query<ICheckout[], void>({
            query: () => '/orders',
            providesTags: ['Product'],
        }),

        updateStateOrder: builder.mutation<ICheckout, number | any>({
            query: (checkout) => ({
                url: `/orders/${checkout.id}`,
                method: 'PATCH',
                body: checkout,
            }),
            invalidatesTags: ['Product'],
        }),

        // upload file
        uploadFile: builder.mutation<FormData, FormData>({
            query: (formData) => ({
                url: 'https://api.cloudinary.com/v1_1/dkyhn68qq/image/upload',
                method: 'POST',
                body: formData,
            }),
        }),
        // Search
        search: builder.query<IProduct[], string>({
            query: (q) => `http://localhost:3000/products?q=${q}`,
            providesTags: ['Product'],
        }),
        //

        getCategories: builder.query<ICategory[], void>({
            query: () => '/categories',
        }),

        getCategoryById: builder.query<string, number | string>({
            query: (id) => ({
                url: `http://localhost:3000/products${id ? `?category=${id}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useRemoveProductMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadFileMutation,
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCheckoutMutation,
    useGetOrdersQuery,
    useUpdateStateOrderMutation,
    useSearchQuery,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
