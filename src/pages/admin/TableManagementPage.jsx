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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  createTable,
  deleteTable,
  getAllTables,
  updateTableStatus,
} from "../../api/tableApi";

const statusOptions = ["available", "occupied", "reserved"];

const getStatusColor = (status) => {
  switch (status) {
    case "occupied":
      return "error";
    case "reserved":
      return "warning";
    case "available":
    default:
      return "success";
  }
};

const TableManagementPage = () => {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const [formData, setFormData] = useState({
    tableNumber: "",
    capacity: "",
    status: "available",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchTables = async () => {
    try {
      setError("");
      const response = await getAllTables();
      setTables(response.data.tables || []);
    } catch (err) {
      console.error("Failed to fetch tables:", err);
      setError(err?.response?.data?.message || "Failed to load tables");
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleOpenCreate = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreate = () => {
    setOpenCreateDialog(false);
    setFormData({
      tableNumber: "",
      capacity: "",
      status: "available",
    });
  };

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateTable = async () => {
    if (!formData.tableNumber || !formData.capacity) {
      setSnackbar({
        open: true,
        message: "Please fill table number and capacity",
        severity: "warning",
      });
      return;
    }

    try {
      setCreating(true);

      const payload = {
        tableNumber: Number(formData.tableNumber),
        capacity: Number(formData.capacity),
        status: formData.status,
      };

      const response = await createTable(payload);
      const createdTable = response.data.table;

      setTables((prev) => [createdTable, ...prev]);
      handleCloseCreate();

      setSnackbar({
        open: true,
        message: "Table created successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to create table:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to create table",
        severity: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleStatusChange = async (tableId, status) => {
    try {
      setUpdatingId(tableId);

      const response = await updateTableStatus(tableId, { status });
      const updatedTable = response.data.table;

      setTables((prev) =>
        prev.map((table) => (table._id === tableId ? updatedTable : table))
      );

      setSnackbar({
        open: true,
        message: "Table status updated",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to update table status:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to update table status",
        severity: "error",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const handleDeleteTable = async (tableId) => {
    try {
      setDeletingId(tableId);

      await deleteTable(tableId);

      setTables((prev) => prev.filter((table) => table._id !== tableId));

      setSnackbar({
        open: true,
        message: "Table deleted successfully",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to delete table:", err);
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || "Failed to delete table",
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
            TABLE MANAGEMENT
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
            Manage restaurant tables
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Add tables, update occupancy state, and maintain seating operations.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Add Table
        </Button>
      </Box>

      {error ? <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert> : null}

      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={table._id}>
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
                      Table {table.tableNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Capacity: {table.capacity}
                    </Typography>
                  </Box>

                  <Chip
                    label={table.status}
                    color={getStatusColor(table.status)}
                    size="small"
                    sx={{ textTransform: "capitalize" }}
                  />
                </Stack>

                <Box sx={{ mt: 2.5 }}>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    label="Change Status"
                    value={table.status}
                    disabled={updatingId === table._id}
                    onChange={(e) =>
                      handleStatusChange(table._id, e.target.value)
                    }
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {table.currentOrder ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Current Order:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                      #{table.currentOrder?._id?.slice(-6).toUpperCase()}
                    </Typography>
                  </Box>
                ) : null}

                <Button
                  fullWidth
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  sx={{ mt: 3 }}
                  disabled={deletingId === table._id}
                  onClick={() => handleDeleteTable(table._id)}
                >
                  Delete Table
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreate}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Table</DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Table Number"
              name="tableNumber"
              type="number"
              value={formData.tableNumber}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseCreate}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateTable}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create Table"}
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

export default TableManagementPage;