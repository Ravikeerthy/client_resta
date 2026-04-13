import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import StarIcon from "@mui/icons-material/Star";
import { Link as RouterLink } from "react-router-dom";
import MainNavbar from "../../components/layout/MainNavbar";

const featureCards = [
  {
    title: "Modern POS Experience",
    description:
      "Fast billing, table handling, and real-time order creation in a clean restaurant dashboard.",
    icon: <PointOfSaleIcon color="primary" fontSize="large" />,
  },
  {
    title: "Delicious Menu Showcase",
    description:
      "Display categories, food details, pricing, and polished menu cards with a smooth customer flow.",
    icon: <LocalDiningIcon color="primary" fontSize="large" />,
  },
  {
    title: "Online Ordering Ready",
    description:
      "A strong full stack flow with cart, checkout, payment integration, and order management support.",
    icon: <DeliveryDiningIcon color="primary" fontSize="large" />,
  },
];

const highlights = [
  "Beautiful restaurant landing page",
  "Material UI based modern design",
  "Customer ordering and POS workflow",
  "Stripe-ready payment flow",
];

const HomePage = () => {
  return (
    <>
      <MainNavbar />

      <Box
        sx={{
          background:
            "linear-gradient(180deg, #fff5f2 0%, #fff 45%, #f7f7f9 100%)",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 700, letterSpacing: 1.2 }}
              >
                FULL STACK RESTAURANT PLATFORM
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                }}
              >
                Restaurant ordering,
                <Box component="span" sx={{ color: "primary.main" }}>
                  {" "}POS billing,
                </Box>
                {" "}and a polished customer experience.
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: 3, maxWidth: 620, fontWeight: 400, lineHeight: 1.7 }}
              >
                A portfolio-grade MERN restaurant application built with Material UI,
                featuring menu browsing, POS workflow, authentication, and payment-ready architecture.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Button
                  component={RouterLink}
                  to="/menu"
                  variant="contained"
                  size="large"
                  sx={{ px: 4, py: 1.4 }}
                >
                  Explore Menu
                </Button>

                <Button
                  component={RouterLink}
                  to="/pos"
                  variant="outlined"
                  size="large"
                  sx={{ px: 4, py: 1.4 }}
                >
                  Open POS
                </Button>
              </Stack>

              <Stack spacing={1.2} sx={{ mt: 4 }}>
                {highlights.map((item) => (
                  <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <StarIcon sx={{ fontSize: 18, color: "secondary.main" }} />
                    <Typography color="text.secondary">{item}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  minHeight: { xs: 380, md: 520 },
                }}
              >
                <Card
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: { xs: "100%", md: "82%" },
                    borderRadius: 6,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
                    overflow: "hidden",
                    bgcolor: "#1f1f25",
                    color: "#fff",
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      background:
                        "linear-gradient(135deg, rgba(198,40,40,1) 0%, rgba(255,179,0,0.95) 100%)",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Today’s Best Sellers
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                      Fast-moving menu items in the restaurant
                    </Typography>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    {[
                      ["Chicken Biryani", "₹ 220"],
                      ["Paneer Tikka", "₹ 180"],
                      ["Cheese Burger", "₹ 160"],
                      ["Cold Coffee", "₹ 110"],
                    ].map(([name, price]) => (
                      <Box
                        key={name}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          py: 1.5,
                          borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <Typography>{name}</Typography>
                        <Typography sx={{ fontWeight: 700 }}>{price}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>

                <Card
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    width: { xs: "85%", md: "52%" },
                    borderRadius: 5,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      POS Snapshot
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 1, fontWeight: 800 }}>
                      24 Orders
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Live restaurant billing flow with dine-in, takeaway, and table-based ordering.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="xl" sx={{ pb: 10 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>
            Why this project stands out
          </Typography>

          <Grid container spacing={3}>
            {featureCards.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;