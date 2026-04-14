import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pt: 7,
        pb: 4,
        borderTop: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(247,247,249,1) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Keerthy's Kitchen
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ mt: 1.5, lineHeight: 1.8 }}
            >
              A modern restaurant platform with menu browsing, POS flow,
              payments, kitchen operations, and staff management.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton>
                <FacebookRoundedIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
              <IconButton>
                <XIcon />
              </IconButton>
              <IconButton>
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Opening Hours
            </Typography>
            <Typography color="text.secondary">
              Mon - Fri: 10:00 AM - 10:30 PM
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Sat - Sun: 9:00 AM - 11:30 PM
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Address
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              24 XYZ Road,
              <br />
              XYZ Nagar,
              <br />
              INDIA
            </Typography>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Menu
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                component={RouterLink}
                to="/"
                sx={{ px: 0, minWidth: "auto" }}
              >
                Home
              </Button>
              <Button
                component={RouterLink}
                to="/menu"
                sx={{ px: 0, minWidth: "auto" }}
              >
                Menu
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                sx={{ px: 0, minWidth: "auto" }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                sx={{ px: 0, minWidth: "auto" }}
              >
                Sign Up
              </Button>
            </Stack>
          </Grid> */}
        </Grid>

        <Box
          sx={{
            mt: 5,
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Subscribe for updates and offers
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Get updates on special combos, new dishes, and offers.
              </Typography>
            </Grid>

            <Grid item xs={12} md={5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your email"
                />
                <Button size="small" variant="contained" sx={{ px: 3 }}>
                  Sign Up
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          © {new Date().getFullYear()} Keerthy's Kitchen. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
