import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/joy';
import { useGetProductsQuery } from '../api/product';
import { useAppDispatch } from '../app/hook';
import { add } from '../slices/cart';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { Box } from '@mui/material';

const List = () => {
    const { data: products, isLoading } = useGetProductsQuery();

    const dispath = useAppDispatch();

    if (isLoading) return <Loading />;

    return (
        <Box sx={{ mt: 6 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {products?.map((product) => (
                    <Grid key={product.id} item xs={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia sx={{ height: 140 }} image={product.image} title={product.name} />
                            <CardContent>
                                <Typography minHeight={96} gutterBottom variant="h5" component="div">
                                    <Link to={`product/${product.id}`}>{product.name?.slice(0, 50)}...</Link>
                                </Typography>
                                <Typography minHeight={40} variant="body2" color="text.secondary">
                                    {product.text?.slice(0, 50)}...
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => dispath(add({ ...product, quantity: 1 }))}>Thêm giỏ hàng</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default List;
