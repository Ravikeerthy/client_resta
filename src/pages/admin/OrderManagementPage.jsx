import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../../api/orderApi";

const orderStatusOptions = [
  "pending",
  "preparing",
  "served",
  "completed",
  "cancelled",
];

const paymentStatusOptions = ["unpaid", "paid"];
const paymentMethodOptions = ["cash", "card", "online"];

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

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchOrders = async () => {
    try {
      setError("");
      const response = await getAllOrders();
      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(err?.response?.data?.message || "Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, { status });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );

      setSnackbar({
        open: true,
        message: "Order status updated",
        severity: "success",
      });

      if (status === "completed" || status === "cancelled") {
       await fetchOrders();
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
      setSnackbar({
        open: true,
        message:
          err?.response?.data?.message || "Failed to update order status",
        severity: "error",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const handlePaymentUpdate = async (orderId, paymentStatus, paymentMethod) => {
    try {
      setUpdatingId(orderId);
      await updatePaymentStatus(orderId, {
        paymentStatus,
        paymentMethod,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, paymentStatus, paymentMethod }
            : order,
        ),
      );

      setSnackbar({
        open: true,
        message: "Payment updated",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to update payment:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to update payment",
        severity: "error",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          ORDER MANAGEMENT
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
          Manage restaurant orders
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Update kitchen flow, payment progress, and order lifecycle.
        </Typography>
      </Box>

      {error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : null}

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} lg={6} key={order._id}>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {order.orderType === "takeaway"
                        ? "Takeaway"
                        : order.orderType === "delivery"
                          ? "Delivery"
                          : `Table ${order.table?.tableNumber ?? "N/A"}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Order ID: #{order._id?.slice(-6).toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      label={order.status || "pending"}
                      color={getStatusColor(order.status)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
                    <Chip
                      label={order.paymentStatus || "unpaid"}
                      color={getPaymentStatusColor(order.paymentStatus)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
                  </Stack>
                </Stack>

                <Box sx={{ mt: 2.5 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Items
                  </Typography>

                  <Stack spacing={1.2}>
                    {order.items?.map((item, index) => (
                      <Box
                        key={item._id || `${order._id}-${index}`}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.menuItem?.name || "Menu Item"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Qty: {item.quantity} × ₹ {item.price}
                          </Typography>
                        </Box>

                        <Typography sx={{ fontWeight: 700 }}>
                          ₹ {(item.quantity * item.price).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ mt: 2.5 }}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    Total: ₹ {Number(order.totalAmount || 0).toFixed(2)}
                  </Typography>
                </Box>

                {order.notes ? (
                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Notes
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {order.notes}
                    </Typography>
                  </Box>
                ) : null}

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={order.status || "pending"}
                        label="Status"
                        disabled={updatingId === order._id}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        {orderStatusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Payment Status</InputLabel>
                      <Select
                        value={order.paymentStatus || "unpaid"}
                        label="Payment Status"
                        disabled={updatingId === order._id}
                        onChange={(e) =>
                          handlePaymentUpdate(
                            order._id,
                            e.target.value,
                            order.paymentMethod || "cash",
                          )
                        }
                      >
                        {paymentStatusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Payment Method</InputLabel>
                      <Select
                        value={order.paymentMethod || "cash"}
                        label="Payment Method"
                        disabled={updatingId === order._id}
                        onChange={(e) =>
                          handlePaymentUpdate(
                            order._id,
                            order.paymentStatus || "unpaid",
                            e.target.value,
                          )
                        }
                      >
                        {paymentMethodOptions.map((method) => (
                          <MenuItem key={method} value={method}>
                            {method}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
};

export default OrderManagementPage;
