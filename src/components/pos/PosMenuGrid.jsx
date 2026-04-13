import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

const fallbackImage =
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80";

const PosMenuGrid = ({ menuItems, onAdd }) => {
  if (!menuItems.length) {
    return (
      <Box
        sx={{
          minHeight: 220,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          bgcolor: "background.paper",
          borderRadius: 4,
          border: "1px dashed",
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            No menu items found
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Try another category or search term.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {menuItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item._id}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 16px 36px rgba(0,0,0,0.10)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="170"
              image={item.image || fallbackImage}
              alt={item.name}
            />

            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {item.name}
                </Typography>

                {item.category && (
                  <Chip
                    label={item.category}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                )}
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, minHeight: 42 }}
              >
                {item.description || "Freshly prepared with signature flavor."}
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                  ₹ {item.price}
                </Typography>

                <Button variant="contained" onClick={() => onAdd(item)}>
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PosMenuGrid;