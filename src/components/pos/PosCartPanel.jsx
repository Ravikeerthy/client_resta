import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const PosCartPanel = ({
  items,
  subtotal,
  tax,
  total,
  onIncrease,
  onDecrease,
  onPlaceOrder,
  onClear,
}) => {
  return (
    <Card
      sx={{
        position: "sticky",
        top: 20,
        borderRadius: 5,
        boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }} gutterBottom>
          Current Bill
        </Typography>

        {items.length === 0 ? (
          <Box
            sx={{
              py: 6,
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
              Add menu items to begin creating an order.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ maxHeight: 360, overflowY: "auto", pr: 0.5 }}>
              {items.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹ {item.price} × {item.quantity}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onDecrease(item._id)}
                    >
                      -
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onIncrease(item._id)}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "grid", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  ₹ {subtotal.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Tax</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  ₹ {tax.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Total
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                  ₹ {total.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.3 }}
          disabled={items.length === 0}
          onClick={onPlaceOrder}
        >
          Place Order
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 1.5, py: 1.2 }}
          onClick={onClear}
        >
          Clear Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default PosCartPanel;