import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinkStyles = {
  color: "inherit",
  textDecoration: "none",
};

const MainNavbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  console.log("NavBar User: ", user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isCustomer = user?.role === "customer";
  const isAdmin = user?.role === "admin";
  const isWaiter = user?.role === "waiter";
  const isKitchen = user?.role === "kitchen";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.9)",
        color: "text.primary",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: 0, justifyContent: "space-between" }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <RestaurantMenuIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Keerthy&apos;s Kitchen
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Button component={RouterLink} to="/" sx={navLinkStyles}>
              Home
            </Button>

            <Button component={RouterLink} to="/menu" sx={navLinkStyles}>
              Menu
            </Button>

            {!isAuthenticated ? (
              <>
                <Button component={RouterLink} to="/login" sx={navLinkStyles}>
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                {isCustomer && (
                  <Button
                    component={RouterLink}
                    to="/orders"
                    sx={navLinkStyles}
                  >
                    Orders
                  </Button>
                )}

                {isWaiter && (
                  <>
                    <Button component={RouterLink} to="/pos" sx={navLinkStyles}>
                      POS
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/orders"
                      sx={navLinkStyles}
                    >
                      Orders
                    </Button>
                  </>
                )}

                {isAdmin && (
                  <>
                    <Button component={RouterLink} to="/pos" sx={navLinkStyles}>
                      POS
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/admin"
                      sx={navLinkStyles}
                    >
                      Dashboard
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/admin/orders"
                      sx={navLinkStyles}
                    >
                      Manage Orders
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/admin/tables"
                      sx={navLinkStyles}
                    >
                      Manage Tables
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/admin/menu"
                      sx={navLinkStyles}
                    >
                      Manage Menu
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/kitchen"
                      sx={navLinkStyles}
                    >
                      Kitchen
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/admin/staff"
                      sx={navLinkStyles}
                    >
                      Manage Staff
                    </Button>
                  </>
                )}

                {isKitchen && (
                  <Button
                    component={RouterLink}
                    to="/kitchen"
                    sx={navLinkStyles}
                  >
                    Kitchen
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavbar;
