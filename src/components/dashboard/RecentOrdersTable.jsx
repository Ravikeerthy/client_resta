import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "served":
      return "info";
    case "preparing":
      return "warning";
    case "cancelled":
      return "error";
    case "pending":
    default:
      return "default";
  }
};

const getPaymentStatusColor = (paymentStatus) => {
  switch (paymentStatus) {
    case "paid":
      return "success";
    case "unpaid":
    default:
      return "warning";
  }
};

const RecentOrdersTable = ({ orders = [] }) => {
  return (
    <Card
      sx={{
        borderRadius: 5,
        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Recent Orders
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Table</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No recent orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    #{order._id?.slice(-6).toUpperCase()}
                  </TableCell>

                  <TableCell>
                    {order.table?.tableNumber ?? "N/A"}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={order.status || "pending"}
                      color={getStatusColor(order.status)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={order.paymentStatus || "unpaid"}
                      color={getPaymentStatusColor(order.paymentStatus)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>

                  <TableCell>
                    ₹ {Number(order.totalAmount || 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;