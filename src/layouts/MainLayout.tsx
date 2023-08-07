import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <Fragment>
            <Header />

            <Container sx={{ mt: 6 }}>
                <Outlet />
            </Container>

            <Footer />
        </Fragment>
    );
};

export default MainLayout;
