import { Box, Container } from "@mui/material";
import MainNavbar from "./MainNavbar";
import SmokeBackground from "../common/SmokeBackGround";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <MainNavbar />
      <SmokeBackground>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #f8f9fb 0%, #ffffff 35%, #f5f6f8 100%)",
          py: 4,
        }}
      >
        <Container maxWidth="xl">{children}</Container>
      </Box>
      </SmokeBackground>
    </>
  );
};

export default DashboardLayout;