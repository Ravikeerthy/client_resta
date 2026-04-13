import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  createMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  updateMenuItem,
} from "../../api/menuApi";

const categoryOptions = ["starter", "main", "dessert", "drinks", "sides"];

const formatCategoryLabel = (value) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const initialFormState = {
  name: "",
  description: "",
  price: "",
  category: "main",
  image: "",
  isAvailable: true,
};

const MenuManagementPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState("");

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const [formData, setFormData] = useState(initialFormState);
  const [editingItem, setEditingItem] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchMenuItems = async () => {
    try {
      setError("");
      const response = await getAllMenuItems();
      setMenuItems(response.data.menuItems || []);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      setError(err?.response?.data?.message || "Failed to load menu items");
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "isAvailable" ? value === "true" : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingItem(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setOpenCreateDialog(true);
  };

  const handleCloseCreate = () => {
    setOpenCreateDialog(false);
    resetForm();
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price ?? "",
      category: item.category || "main",
      image: item.image || "",
      isAvailable: item.isAvailable ?? true,
    });
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    resetForm();
  };

  const handleCreateItem = async () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "warning",
      });
      return;
    }

    try {
      setCreating(true);

      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      const response = await createMenuItem(payload);
      const createdItem = response.data.menuItem;

      setMenuItems((prev) => [createdItem, ...prev]);
      handleCloseCreate();

      setSnackbar({
        open: true,
        message: "Menu item created successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to create menu item:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to create menu item",
        severity: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateItem = async () => {
    if (!editingItem?._id) return;

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "warning",
      });
      return;
    }

    try {
      setUpdatingId(editingItem._id);

      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      const response = await updateMenuItem(editingItem._id, payload);
      const updatedItem = response.data.menuItem;

      setMenuItems((prev) =>
        prev.map((item) => (item._id === editingItem._id ? updatedItem : item))
      );

      handleCloseEdit();

      setSnackbar({
        open: true,
        message: "Menu item updated successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to update menu item:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to update menu item",
        severity: "error",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      setDeletingId(itemId);

      await deleteMenuItem(itemId);

      setMenuItems((prev) => prev.filter((item) => item._id !== itemId));

      setSnackbar({
        open: true,
        message: "Menu item deleted successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to delete menu item:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to delete menu item",
        severity: "error",
      });
    } finally {
      setDeletingId("");
    }
  };

  const handleToggleAvailability = async (item) => {
    try {
      setUpdatingId(item._id);

      const response = await updateMenuItem(item._id, {
        ...item,
        isAvailable: !item.isAvailable,
      });

      const updatedItem = response.data.menuItem;

      setMenuItems((prev) =>
        prev.map((menuItem) => (menuItem._id === item._id ? updatedItem : menuItem))
      );

      setSnackbar({
        open: true,
        message: "Availability updated",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to update availability:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to update availability",
        severity: "error",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const renderFormFields = () => (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <TextField
        fullWidth
        label="Item Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        multiline
        minRows={3}
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        {categoryOptions.map((category) => (
          <MenuItem key={category} value={category}>
            {formatCategoryLabel(category)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Image URL"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Optional for now"
      />

      <TextField
        fullWidth
        select
        label="Availability"
        name="isAvailable"
        value={String(formData.isAvailable)}
        onChange={handleChange}
      >
        <MenuItem value="true">Available</MenuItem>
        <MenuItem value="false">Unavailable</MenuItem>
      </TextField>
    </Stack>
  );

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
            MENU MANAGEMENT
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
            Manage restaurant menu
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Add, update, remove, and control menu item availability.
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Add Menu Item
        </Button>
      </Box>

      {error ? <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert> : null}

      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 5,
                boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {formatCategoryLabel(item.category)}
                    </Typography>
                  </Box>

                  <Chip
                    label={item.isAvailable ? "Available" : "Unavailable"}
                    color={item.isAvailable ? "success" : "default"}
                    size="small"
                  />
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2, minHeight: 48 }}
                >
                  {item.description}
                </Typography>

                <Typography variant="h6" color="primary" sx={{ fontWeight: 800, mt: 2 }}>
                  ₹ {Number(item.price).toFixed(2)}
                </Typography>

                <Stack spacing={1.2} sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => handleOpenEdit(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => handleToggleAvailability(item)}
                    disabled={updatingId === item._id}
                  >
                    {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
                  </Button>

                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    disabled={deletingId === item._id}
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openCreateDialog} onClose={handleCloseCreate} fullWidth maxWidth="sm">
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>{renderFormFields()}</DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseCreate}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateItem} disabled={creating}>
            {creating ? "Creating..." : "Create Item"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Menu Item</DialogTitle>
        <DialogContent>{renderFormFields()}</DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdateItem}
            disabled={updatingId === editingItem?._id}
          >
            {updatingId === editingItem?._id ? "Updating..." : "Update Item"}
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

export default MenuManagementPage;