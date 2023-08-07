import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../page/Home';
import About from '../page/About';
import Dashboard from '../page/Dashboard';
import CreateProduct from '../page/CreateProduct';
import UpdateProduct from '../page/UpdateProduct';
import Cart from '../page/Cart';
import ProductDetail from '../page/ProductDetail';
import FilterPage from '../page/FilterPage';
import RegisterPage from '../page/RegisterPage';
import LoginPage from '../page/LoginPage';
import Checkout from '../page/Checkout';
import Orders from '../page/Orders';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'filter',
                element: <FilterPage />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'product/:id',
                element: <ProductDetail />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'checkout',
                element: <Checkout />,
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
            {
                path: 'create',
                element: <CreateProduct />,
            },
            {
                path: 'product/:productId/update',
                element: <UpdateProduct />,
            },
            {
                path: 'orders',
                element: <Orders />,
            },
        ],
    },
]);

export default router;
