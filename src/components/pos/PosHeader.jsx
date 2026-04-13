import { Box, MenuItem, Select, Typography } from "@mui/material";

const PosHeader = ({
  orderType,
  setOrderType,
  selectedTable,
  setSelectedTable,
  tables,
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">POS Dashboard</Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          size="small"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="dine-in">Dine In</MenuItem>
          <MenuItem value="takeaway">Takeaway</MenuItem>
          <MenuItem value="delivery">Delivery</MenuItem>
        </Select>

        {orderType === "dine-in" && (
          <Select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            displayEmpty
            size="small"
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">Select Table</MenuItem>
            {tables.map((table) => (
              <MenuItem key={table._id} value={table._id}>
                {table.name || `Table ${table.number}`}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
    </Box>
  );
};

export default PosHeader;