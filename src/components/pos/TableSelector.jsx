import { Box, Chip, Paper, Typography } from "@mui/material";

const getTableStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "occupied":
      return "error";
    case "reserved":
      return "warning";
    case "available":
    default:
      return "success";
  }
};

const TableSelector = ({ tables = [], selectedTable, onSelectTable }) => {
  if (!tables.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          border: "1px dashed",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No tables available right now.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {tables.map((table) => {
        const isSelected = selectedTable === table._id;
        const status = table.status || "available";

        return (
          <Paper
            key={table._id}
            onClick={() => onSelectTable(table._id)}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 4,
              cursor: "pointer",
              border: "1px solid",
              borderColor: isSelected ? "primary.main" : "divider",
              bgcolor: isSelected ? "rgba(198,40,40,0.06)" : "background.paper",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "primary.main",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {table.name || `Table ${table.tableNumber}`}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Capacity: {table.capacity || 4}
            </Typography>

            <Chip
              label={status}
              size="small"
              color={getTableStatusColor(status)}
              sx={{ mt: 1.5, textTransform: "capitalize" }}
            />
          </Paper>
        );
      })}
    </Box>
  );
};

export default TableSelector;