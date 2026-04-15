import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
// import MainNavbar from "../../components/layout/MainNavbar";
import { getAllOrders } from "../../api/orderApi";
import SmokeBackground from "../../components/common/SmokeBackGround";
import MainNavBar from "../../components/layout/MainNavBar";

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

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllOrders();
        const orderData =
          response.data.orders || response.data.data || response.data || [];

        setOrders(orderData);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err?.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <MainNavBar />
      <SmokeBackground>
        <Box
          sx={{
            minHeight: "100vh",
            background:
              "linear-gradient(180deg, #fff8f4 0%, #ffffff 35%, #f7f7f9 100%)",
            py: 6,
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                ORDER HISTORY
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                Restaurant orders overview
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Track order status, payment progress, and table-wise details.
              </Typography>
            </Box>

            {loading ? (
              <Box
                sx={{
                  minHeight: 320,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <CircularProgress />
                  <Typography color="text.secondary">
                    Loading orders...
                  </Typography>
                </Stack>
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : orders.length === 0 ? (
              <Card sx={{ borderRadius: 5 }}>
                <CardContent sx={{ py: 8, textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    No orders found
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Place an order from the POS page to see it here.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {orders.map((order) => (
                  <Grid item xs={12} md={6} lg={4} key={order._id}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 5,
                        boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
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
                              Table{" "}
                              {order.orderType === "takeaway"
                                ? "Takeaway"
                                : order.orderType === "delivery"
                                  ? "Delivery"
                                  : `Table ${order.table?.tableNumber ?? order.tableNumber ?? "N/A"}`}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.5 }}
                            >
                              Order ID: {order._id?.slice(-6).toUpperCase()}
                            </Typography>
                          </Box>

                          <Chip
                            label={order.status || "pending"}
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                          />
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mt: 2, flexWrap: "wrap", rowGap: 1 }}
                        >
                          <Chip
                            label={order.paymentStatus || "unpaid"}
                            color={getPaymentStatusColor(order.paymentStatus)}
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                          />
                          <Chip
                            label={order.paymentMethod || "cash"}
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: "capitalize" }}
                          />
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Ordered Items
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
                              <Box sx={{ minWidth: 0 }}>
                                <Typography sx={{ fontWeight: 600 }}>
                                  {item.menuItem?.name || "Menu Item"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Qty: {item.quantity} × ₹ {item.price}
                                </Typography>
                              </Box>

                              <Typography sx={{ fontWeight: 700 }}>
                                ₹ {(item.quantity * item.price).toFixed(2)}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: "grid", gap: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography color="text.secondary">
                              Total Amount
                            </Typography>
                            <Typography
                              sx={{ fontWeight: 800 }}
                              color="primary"
                            >
                              ₹ {Number(order.totalAmount || 0).toFixed(2)}
                            </Typography>
                          </Box>

                          {order.notes ? (
                            <Box>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                Notes
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {order.notes}
                              </Typography>
                            </Box>
                          ) : null}

                          <Box sx={{ pt: 1 }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Created:{" "}
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleString()
                                : "N/A"}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </SmokeBackground>
    </>
  );
};

export default OrdersPage;
