import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

const fallbackImage =
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80";

const MenuCard = ({ item, onAddToCart }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 36px rgba(0,0,0,0.10)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={item.image || fallbackImage}
        alt={item.name}
      />

      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          flexGrow: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
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
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
            minHeight: 48,
          }}
        >
          {item.description || "Freshly prepared and served with signature flavor."}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: "auto", pt: 1 }}
        >
          <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
            ₹ {item.price}
          </Typography>

          <Button variant="contained" onClick={() => onAddToCart(item)}>
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MenuCard;