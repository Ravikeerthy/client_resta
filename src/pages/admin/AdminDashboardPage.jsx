import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Grid, Stack, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PaidIcon from "@mui/icons-material/Paid";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import { getAllMenuItems } from "../../api/menuApi";
import { getAllTables } from "../../api/tableApi";
import { getAllOrders } from "../../api/orderApi";

const AdminDashboardPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError("");

        const [menuResponse, tablesResponse, ordersResponse] = await Promise.all([
          getAllMenuItems(),
          getAllTables(),
          getAllOrders(),
        ]);

        setMenuItems(menuResponse.data.menuItems || []);
        setTables(tablesResponse.data.tables || []);
        setOrders(ordersResponse.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err?.response?.data?.message || "Failed to load dashboard");
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardStats = useMemo(() => {
    const totalMenuItems = menuItems.length;
    const totalTables = tables.length;
    const availableTables = tables.filter((table) => table.status === "available").length;
    const occupiedTables = tables.filter((table) => table.status === "occupied").length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((order) => order.status === "pending").length;
    const paidOrders = orders.filter((order) => order.paymentStatus === "paid").length;
    const totalRevenue = orders
      .filter((order) => order.paymentStatus === "paid")
      .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

    return {
      totalMenuItems,
      totalTables,
      availableTables,
      occupiedTables,
      totalOrders,
      pendingOrders,
      paidOrders,
      totalRevenue,
    };
  }, [menuItems, tables, orders]);

  const recentOrders = orders.slice(0, 6);

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          ADMIN DASHBOARD
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
          Restaurant performance overview
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Track menu inventory, table occupancy, order activity, and payment performance.
        </Typography>
      </Box>

      {error ? <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert> : null}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Menu Items"
            value={dashboardStats.totalMenuItems}
            subtitle="Currently available items"
            icon={<RestaurantMenuIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Tables"
            value={dashboardStats.totalTables}
            subtitle="Restaurant seating capacity"
            icon={<TableRestaurantIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Available Tables"
            value={dashboardStats.availableTables}
            subtitle="Ready for new guests"
            icon={<EventSeatIcon />}
            color="success.main"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Occupied Tables"
            value={dashboardStats.occupiedTables}
            subtitle="Currently active dine-in"
            icon={<TableRestaurantIcon />}
            color="error.main"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Orders"
            value={dashboardStats.totalOrders}
            subtitle="All recorded orders"
            icon={<ReceiptLongIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Pending Orders"
            value={dashboardStats.pendingOrders}
            subtitle="Need kitchen/action attention"
            icon={<PendingActionsIcon />}
            color="warning.main"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Paid Orders"
            value={dashboardStats.paidOrders}
            subtitle="Successfully settled bills"
            icon={<PaidIcon />}
            color="success.main"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Revenue"
            value={`₹ ${dashboardStats.totalRevenue.toFixed(2)}`}
            subtitle="From paid orders"
            icon={<PaidIcon />}
            color="secondary.main"
          />
        </Grid>
      </Grid>

      <Stack sx={{ mt: 4 }} spacing={3}>
        <RecentOrdersTable orders={recentOrders} />
      </Stack>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;