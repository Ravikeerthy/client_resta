import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/customer/HomePage"
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import MenuPage from "../pages/customer/MenuPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import OrdersPage from "../pages/customer/OrdersPage";
import PosPage from "../pages/pos/PosPage";
import ProtectedRoute from "../components/common/ProtectedRouote";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import OrderManagementPage from "../pages/admin/OrderManagementPage";
import TableManagementPage from "../pages/admin/TableManagementPage";
import MenuManagementPage from "../pages/admin/MenuManagementPage";
import RoleRoute from "../components/common/RoleRoute";
import KitchenPage from "../pages/kitchen/KitchenPage";
import StaffManagementPage from "../pages/admin/StaffManagementPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/checkout"
        element={
          <RoleRoute allowedRoles={["customer", "admin", "waiter"]}>
            <CheckoutPage />
          </RoleRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pos"
        element={
          <RoleRoute allowedRoles={["admin", "waiter"]}>
            <PosPage />
          </RoleRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminDashboardPage />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <OrderManagementPage />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/tables"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <TableManagementPage />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/menu"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <MenuManagementPage />
          </RoleRoute>
        }
      />
      <Route
        path="/kitchen"
        element={
          <RoleRoute allowedRoles={["admin", "kitchen"]}>
            <KitchenPage />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/staff"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <StaffManagementPage />
          </RoleRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
