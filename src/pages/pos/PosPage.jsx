import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { getAllMenuItems } from "../../api/menuApi";
import { getAllTables } from "../../api/tableApi";
import { createOrder } from "../../api/orderApi";
import { useCart } from "../../context/CartContext";
import { usePos } from "../../context/PosContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PosHeader from "./PosHeader";
import PosMenuGrid from "../../components/pos/PosMenuGrid";
import PosCartPanel from "../../components/pos/PosCartPanel";
import TableSelector from "../../components/pos/TableSelector";
import PosSearchBar from "../../components/pos/PosSearchBar";
import PosCategoryTabs from "../../components/pos/PosCategoryTabs";
import PaymentDialog from "../../components/payment/PaymentDialog";

const PosPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    items,
    addToCart,
    increaseQty,
    decreaseQty,
    clearCart,
    subtotal,
    tax,
    total,
  } = useCart();

  const {
    orderType,
    selectedTable,
    paymentMethod,
    setOrderType,
    setSelectedTable,
    setPaymentMethod,
    resetPosState,
  } = usePos();

  useEffect(() => {
    const fetchPosData = async () => {
      try {
        const [menuResponse, tablesResponse] = await Promise.all([
          getAllMenuItems(),
          getAllTables(),
        ]);

        setMenuItems(menuResponse.data.menuItems || menuResponse.data || []);
        setTables(tablesResponse.data.tables || tablesResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch POS data:", error);
        setSnackbar({
          open: true,
          message: "Failed to load POS data",
          severity: "error",
        });
      }
    };

    fetchPosData();
  }, []);

  const categories = useMemo(() => {
    const unique = [
      ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
    ];
    return ["All", ...unique];
  }, [menuItems]);

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchTerm]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setSnackbar({
      open: true,
      message: `${item.name} added to cart`,
      severity: "success",
    });
  };

 const handlePlaceOrder = async () => {
  try {
    if (orderType === "dine-in" && !selectedTable) {
      setSnackbar({
        open: true,
        message: "Please select a table for dine-in order",
        severity: "warning",
      });
      return;
    }

    const payload = {
      orderType,
      table: orderType === "dine-in" ? selectedTable : null,
      items: items.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentMethod,
      notes: "",
      orderType,
    };

    const response = await createOrder(payload);
    const createdOrder = response.data.order;

    if (paymentMethod === "cash") {
      clearCart();
      resetPosState();
      setSearchTerm("");
      setSelectedCategory("All");

      setSnackbar({
        open: true,
        message: "Order placed successfully",
        severity: "success",
      });
      return;
    }

    setPendingPaymentOrder(createdOrder);
    setPaymentDialogOpen(true);
  } catch (error) {
    console.error("Failed to place order:", error);
    setSnackbar({
      open: true,
      message: error?.response?.data?.message || "Failed to place order",
      severity: "error",
    });
  }
};

const handlePaymentSuccess = () => {
  setPaymentDialogOpen(false);
  setPendingPaymentOrder(null);

  clearCart();
  resetPosState();
  setSearchTerm("");
  setSelectedCategory("All");

  setSnackbar({
    open: true,
    message: "Payment successful and order confirmed",
    severity: "success",
  });
};

  const handleClear = () => {
    clearCart();
    resetPosState();
    setSnackbar({
      open: true,
      message: "Cart cleared",
      severity: "info",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <DashboardLayout>
      <PosHeader
        orderType={orderType}
        setOrderType={setOrderType}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      {orderType === "dine-in" && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 5,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Select Table
          </Typography>

          <TableSelector
            tables={tables}
            selectedTable={selectedTable}
            onSelectTable={setSelectedTable}
          />
        </Paper>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Stack spacing={2.5} sx={{ mb: 2.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Menu Items
            </Typography>

            <PosSearchBar value={searchTerm} onChange={setSearchTerm} />

            {categories.length > 1 && (
              <PosCategoryTabs
                categories={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            )}
          </Stack>

          <PosMenuGrid menuItems={filteredMenuItems} onAdd={handleAddToCart} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <PosCartPanel
            items={items}
            subtotal={subtotal}
            tax={tax}
            total={total}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onPlaceOrder={handlePlaceOrder}
            onClear={handleClear}
          />
        </Grid>
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
      <PaymentDialog
      open={paymentDialogOpen}
      onClose={() => {
        setPaymentDialogOpen(false);
        setPendingPaymentOrder(null);
      }}
      orderId={pendingPaymentOrder?._id}
      amount={pendingPaymentOrder?.totalAmount}
      onSuccess={handlePaymentSuccess}
    />
    </DashboardLayout>
    
  );
};

export default PosPage;
