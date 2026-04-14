import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createStaffUser, updateUserRole, deleteUser, getStaffUsers } from "../../api/staffApi";


const roleOptions = ["admin", "waiter", "kitchen"];

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "waiter",
};

const StaffManagementPage = () => {
  const [staffUsers, setStaffUsers] = useState([]);
  const [error, setError] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchStaffUsers = async () => {
    try {
      setError("");
      const response = await getStaffUsers();
      setStaffUsers(response.data.users || []);
    } catch (err) {
      console.error("Failed to fetch staff users:", err);
      setError(err?.response?.data?.message || "Failed to load staff users");
    }
  };

  useEffect(() => {
    fetchStaffUsers();
  }, []);

  const handleOpenCreate = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreate = () => {
    setOpenCreateDialog(false);
    setFormData(initialFormData);
  };

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateStaff = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "warning",
      });
      return;
    }

    try {
      setCreating(true);
      const response = await createStaffUser(formData);
      const createdUser = response.data.user;

      setStaffUsers((prev) => [createdUser, ...prev]);
      handleCloseCreate();

      setSnackbar({
        open: true,
        message: "Staff user created successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to create staff user:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to create staff user",
        severity: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      setUpdatingId(userId);
      const response = await updateUserRole(userId, { role });
      const updatedUser = response.data.user;

      setStaffUsers((prev) =>
        prev.map((user) => (user._id === userId || user.id === userId ? updatedUser : user))
      );

      setSnackbar({
        open: true,
        message: "User role updated successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to update user role:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to update user role",
        severity: "error",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setDeletingId(userId);
      await deleteUser(userId);

      setStaffUsers((prev) =>
        prev.filter((user) => user._id !== userId && user.id !== userId)
      );

      setSnackbar({
        open: true,
        message: "User deleted successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to delete user:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to delete user",
        severity: "error",
      });
    } finally {
      setDeletingId("");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
            STAFF MANAGEMENT
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
            Manage staff and admin accounts
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Create and manage internal users like admin, waiter, and kitchen staff.
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Add Staff
        </Button>
      </Box>

      {error ? <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert> : null}

      <Grid container spacing={3}>
        {staffUsers.map((user) => {
          const userId = user._id || user.id;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={userId}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 5,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {user.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {user.email}
                  </Typography>

                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Role"
                    sx={{ mt: 2.5 }}
                    value={user.role}
                    disabled={updatingId === userId}
                    onChange={(e) => handleRoleChange(userId, e.target.value)}
                  >
                    {roleOptions.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Button
                    fullWidth
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    sx={{ mt: 3 }}
                    disabled={deletingId === userId}
                    onClick={() => handleDeleteUser(userId)}
                  >
                    Delete User
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openCreateDialog} onClose={handleCloseCreate} fullWidth maxWidth="sm">
        <DialogTitle>Add Staff User</DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseCreate}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateStaff} disabled={creating}>
            {creating ? "Creating..." : "Create Staff"}
          </Button>
        </DialogActions>
      </Dialog>

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

export default StaffManagementPage;