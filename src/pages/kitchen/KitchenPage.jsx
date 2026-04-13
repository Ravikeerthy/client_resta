import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllOrders, updateOrderStatus } from "../../api/orderApi";

const getStatusColor = (status) => {
  switch (status) {
    case "preparing":
      return "warning";
    case "served":
      return "success";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    case "pending":
    default:
      return "default";
  }
};

const getOrderTitle = (order) => {
  if (order.orderType === "takeaway") return "Takeaway";
  if (order.orderType === "delivery") return "Delivery";
  return `Table ${order.table?.tableNumber ?? "N/A"}`;
};

const KitchenPage = () => {
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
      console.error("Failed to fetch kitchen orders:", err);
      setError(err?.response?.data?.message || "Failed to load kitchen orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const kitchenOrders = useMemo(() => {
    return orders.filter(
      (order) => order.status === "pending" || order.status === "preparing"
    );
  }, [orders]);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      const response = await updateOrderStatus(orderId, { status });
      const updatedOrder = response.data.order;

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updatedOrder : order))
      );

      setSnackbar({
        open: true,
        message:
          status === "preparing"
            ? "Order moved to preparing"
            : "Order marked as served",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to update kitchen order status:", err);
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

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          KITCHEN
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
          Kitchen queue
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Track active orders and move them through the kitchen workflow.
        </Typography>
      </Box>

      {error ? <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert> : null}

      {kitchenOrders.length === 0 ? (
        <Card sx={{ borderRadius: 5 }}>
          <CardContent sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              No active kitchen orders
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Pending and preparing orders will appear here.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {kitchenOrders.map((order) => (
            <Grid item xs={12} md={6} lg={4} key={order._id}>
              <Card
                sx={{
                  height: "100%",
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
                        {getOrderTitle(order)}
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

                    <Chip
                      label={order.status || "pending"}
                      color={getStatusColor(order.status)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
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
                            alignItems: "flex-start",
                          }}
                        >
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>
                              {item.menuItem?.name || "Menu Item"}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Qty: {item.quantity}
                            </Typography>
                          </Box>

                          <Typography sx={{ fontWeight: 700 }}>
                            ₹ {(item.quantity * item.price).toFixed(2)}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {order.notes ? (
                    <Box sx={{ mt: 2.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        Notes
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {order.notes}
                      </Typography>
                    </Box>
                  ) : null}

                  <Box sx={{ mt: 3, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                    {order.status === "pending" && (
                      <Button
                        variant="contained"
                        disabled={updatingId === order._id}
                        onClick={() =>
                          handleUpdateStatus(order._id, "preparing")
                        }
                      >
                        Start Preparing
                      </Button>
                    )}

                    {order.status === "preparing" && (
                      <Button
                        variant="contained"
                        color="success"
                        disabled={updatingId === order._id}
                        onClick={() => handleUpdateStatus(order._id, "served")}
                      >
                        Mark Served
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

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

export default KitchenPage;