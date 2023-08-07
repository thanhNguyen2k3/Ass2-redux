import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Button } from '@mui/joy';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { MeDocument, MeQuery, useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useAppSelector } from '../app/hook';
import Search from './Search';

const pages = [
    {
        id: 1,
        path: '/filter',
        title: 'Sản phẩm',
    },
];

const Header = () => {
    const { data: meData, loading } = useMeQuery();
    const { cartItems } = useAppSelector((state) => state.cart);
    const [logout, { loading: logoutLoading }] = useLogoutMutation();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    // Search query

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleLogout = async () => {
        try {
            await logout({
                update(cache, { data }) {
                    // const meData = cache.readQuery({ query: MeDocument });

                    if (data?.logout) {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: { me: null },
                        });
                    }
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    let body;

    if (loading) {
        body = null;
    } else if (!meData?.me) {
        body = (
            <Box sx={{ flexGrow: 0, gap: '10px', display: 'flex' }}>
                <Link to={'/login'}>Đăng nhập</Link>
                <Link to={'/register'}>Đăng ký</Link>
            </Box>
        );
    } else {
        body = (
            <Box sx={{ flexGrow: 0, gap: '10px', display: 'flex', alignItems: 'center' }}>
                <Button color="danger" loading={logoutLoading} onClick={handleLogout}>
                    Đăng xuất
                </Button>
            </Box>
        );
    }

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.id}>
                                    <Typography textAlign="center">
                                        <Link to={page.path}>{page.title}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Search />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'none',
                                md: 'flex',
                                padding: '0 20px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            {pages.map((page) => (
                                <Link key={page.id} to={page.path}>
                                    {page.title}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    <Link to={'/cart'} className="text-lg mr-8 relative">
                        <ShoppingCartIcon />
                        <span className="absolute top-0 -right-6 w-6 h-6 flex rounded-full bg-red-500 justify-center items-center ">
                            {cartItems.length}
                        </span>
                    </Link>

                    {/* Search */}

                    {body}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
