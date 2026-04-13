import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import MainNavbar from "../../components/layout/MainNavbar";
import MenuCard from "../../components/menu/MenuCard";
import { getAllMenuItems } from "../../api/menuApi";
import { useCart } from "../../context/CartContext";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllMenuItems();
        setMenuItems(response.data.menuItems || []);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        menuItems
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return menuItems;
    }

    return menuItems.filter((item) => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);

  return (
    <>
      <MainNavbar />

      <Box
        sx={{
          background:
            "linear-gradient(180deg, #fff7f3 0%, #ffffff 30%, #f7f7f9 100%)",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Box
            sx={{
              textAlign: "center",
              mb: 5,
              maxWidth: 780,
              mx: "auto",
            }}
          >
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 700, letterSpacing: 1.2 }}
            >
              OUR MENU
            </Typography>

            <Typography
              variant="h3"
              sx={{
                mt: 1,
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Discover dishes crafted for every craving
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 2,
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              Explore our carefully curated menu with signature mains, snacks,
              beverages, and customer favorites designed for a modern restaurant experience.
            </Typography>
          </Box>

          {categories.length > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 4,
              }}
            >
              <Tabs
                value={selectedCategory}
                onChange={(_, newValue) => setSelectedCategory(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                {categories.map((category) => (
                  <Tab
                    key={category}
                    label={category}
                    value={category}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          {loading ? (
            <Box
              sx={{
                minHeight: 300,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Stack alignItems="center" spacing={2}>
                <CircularProgress />
                <Typography color="text.secondary">Loading menu...</Typography>
              </Stack>
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : filteredItems.length === 0 ? (
            <Box
              sx={{
                minHeight: 220,
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                bgcolor: "background.paper",
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  No menu items found
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Try selecting a different category.
                </Typography>
              </Box>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <MenuCard item={item} onAddToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default MenuPage;