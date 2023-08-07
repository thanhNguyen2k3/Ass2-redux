import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Box, Skeleton } from '@mui/material';

import { useGetProductsQuery, useRemoveProductMutation } from '../api/product';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';

// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//     return { name, calories, fat, carbs, protein };
// }

const TableAdmin = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    const [removeProduct, { isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveProductMutation();

    const confirm = (id: number) => {
        if (window.confirm('Bạn có muốn xóa?')) {
            removeProduct(id);
        }
    };

    if (isLoading)
        return (
            <Box sx={{ width: '100%' }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
        );

    if (error) return <Alert severity="error">This is an error alert — check it out!</Alert>;

    return (
        <div>
            <Link to={'/admin/create'}>
                <Button sx={{ mb: 1 }}>Thêm sản phẩm</Button>
            </Link>
            {removeSuccess && <Alert severity="success">This is a success alert — check it out!</Alert>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell align="right">Ảnh</TableCell>
                            <TableCell align="right">Giá sản phẩm</TableCell>
                            <TableCell align="right">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((product) => (
                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {product.name?.slice(0, 20)}...
                                </TableCell>
                                <TableCell align="right">
                                    <img src={product.image} alt={product.image} width={80} height={60} />
                                </TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/admin/product/${product.id}/update`}>
                                        <Button sx={{ mr: 1 }}>Cập nhật</Button>
                                    </Link>
                                    <Button loading={removeLoading} color="danger" onClick={() => confirm(product.id)}>
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableAdmin;
