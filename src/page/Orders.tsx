import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetOrdersQuery, useUpdateStateOrderMutation } from '../api/product';
import TableBody from '@mui/material/TableBody';
import { Button } from '@mui/joy';
import Box from '@mui/material/Box';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const Orders = () => {
    const { data: orders, isLoading } = useGetOrdersQuery();

    const [updateState, {}] = useUpdateStateOrderMutation();

    const checkState = (state: number) => {
        if (state === 0) {
            return 'Đã bị hủy';
        } else if (state === 1) {
            return 'Đang giao hàng';
        } else if (state >= 2) {
            return 'Hoàn thành';
        } else {
            return 'Chưa cập nhật';
        }
    };

    const handleUpdateState = async (id: number | undefined, state: number) => {
        await updateState({
            id,
            state: state + 1,
        });

        toast.success('Đã cập nhật trạng thái thành công', {
            position: 'top-right',
        });
    };

    if (isLoading) return <Loading />;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tên</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Địa chỉ</TableCell>
                        <TableCell align="right">Số điện thoại</TableCell>
                        <TableCell align="center">Sản phẩm</TableCell>
                        <TableCell align="right">Trạng thái</TableCell>
                        <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                opacity: order.state >= 2 ? 0.6 : 1,
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {order.username}
                            </TableCell>
                            <TableCell align="right">{order.email}</TableCell>
                            <TableCell align="right">{order.address}</TableCell>
                            <TableCell align="right">{order.phone}</TableCell>
                            <TableCell>
                                <Box>
                                    {order.products.map((product) => (
                                        <p key={product.id}>
                                            {product.name?.slice(0, 20)}... - Số lượng: {product.quantity}{' '}
                                        </p>
                                    ))}
                                </Box>
                            </TableCell>
                            <TableCell align="right">{checkState(order.state)}</TableCell>
                            <TableCell align="right">
                                <Button
                                    disabled={order.state >= 2}
                                    onClick={() => handleUpdateState(order.id, order.state)}
                                    sx={{ mr: 1 }}
                                >
                                    Cập nhật trạng thái
                                </Button>
                                <Button color="danger">Disable</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Orders;
