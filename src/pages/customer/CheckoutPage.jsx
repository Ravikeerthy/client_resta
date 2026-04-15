import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orderApi";
import SmokeBackGround from "../../components/common/SmokeBackGround";
import MainNavBar from "../../components/layout/MainNavBar";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, tax, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    orderType: "delivery",
    paymentMethod: "cash",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handlePlaceOrder = async () => {
    if (!items.length) {
      setSnackbar({
        open: true,
        message: "Your cart is empty",
        severity: "warning",
      });
      return;
    }

    if (!formData.customerName || !formData.phone) {
      setSnackbar({
        open: true,
        message: "Please fill customer name and phone number",
        severity: "warning",
      });
      return;
    }

    if (formData.orderType === "delivery" && !formData.address) {
      setSnackbar({
        open: true,
        message: "Please enter a delivery address",
        severity: "warning",
      });
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        items: items.map((item) => ({
          menuItem: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        orderType: formData.orderType,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        subtotal,
        tax,
        total,
      };

      const response = await createOrder(payload);
      const createdOrder =
        response?.data?.order || response?.data?.data || response?.data;

      clearCart();

      setSnackbar({
        open: true,
        message: "Order placed successfully",
        severity: "success",
      });

      setTimeout(() => {
        if (createdOrder?._id) {
          navigate("/orders");
        } else {
          navigate("/orders");
        }
      }, 800);
    } catch (error) {
      console.error("Checkout failed:", error);
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to place order",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <MainNavBar />
      <SmokeBackGround>
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
                CHECKOUT
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                Complete your order
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Review your items, enter delivery details, and place the order.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={7} lg={8}>
                <Card
                  sx={{
                    borderRadius: 5,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                      Customer Details
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Customer Name"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Order Type</InputLabel>
                          <Select
                            name="orderType"
                            value={formData.orderType}
                            label="Order Type"
                            onChange={handleChange}
                          >
                            <MenuItem value="delivery">Delivery</MenuItem>
                            <MenuItem value="takeaway">Takeaway</MenuItem>
                            <MenuItem value="dine-in">Dine In</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Payment Method</InputLabel>
                          <Select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            label="Payment Method"
                            onChange={handleChange}
                          >
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="card">Card</MenuItem>
                            <MenuItem value="online">Online</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {formData.orderType === "delivery" && (
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label="Delivery Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={3}
                          label="Order Notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Optional notes like less spicy, no onion, extra sauce..."
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={5} lg={4}>
                <Card
                  sx={{
                    borderRadius: 5,
                    boxShadow: "0 14px 36px rgba(0,0,0,0.08)",
                    position: "sticky",
                    top: 90,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                      Order Summary
                    </Typography>

                    {!items.length ? (
                      <Box
                        sx={{
                          py: 5,
                          textAlign: "center",
                          borderRadius: 4,
                          bgcolor: "#fafafa",
                          border: "1px dashed",
                          borderColor: "divider",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Cart is empty
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                          Add items from the menu before checkout.
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <Stack spacing={1.5}>
                          {items.map((item) => (
                            <Box
                              key={item._id}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 2,
                                alignItems: "center",
                              }}
                            >
                              <Box>
                                <Typography sx={{ fontWeight: 600 }}>
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  ₹ {item.price} × {item.quantity}
                                </Typography>
                              </Box>

                              <Typography sx={{ fontWeight: 700 }}>
                                ₹ {(item.price * item.quantity).toFixed(2)}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>

                        <Divider sx={{ my: 2.5 }} />

                        <Stack spacing={1.2}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography color="text.secondary">
                              Subtotal
                            </Typography>
                            <Typography sx={{ fontWeight: 600 }}>
                              ₹ {subtotal.toFixed(2)}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography color="text.secondary">Tax</Typography>
                            <Typography sx={{ fontWeight: 600 }}>
                              ₹ {tax.toFixed(2)}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: 1,
                            }}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                              Total
                            </Typography>
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{ fontWeight: 800 }}
                            >
                              ₹ {total.toFixed(2)}
                            </Typography>
                          </Box>
                        </Stack>

                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          sx={{ mt: 3, py: 1.4 }}
                          onClick={handlePlaceOrder}
                          disabled={submitting}
                        >
                          {submitting ? "Placing Order..." : "Place Order"}
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SmokeBackGround>

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
    </>
  );
};

export default CheckoutPage;
