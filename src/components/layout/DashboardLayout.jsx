import { Box, Container } from "@mui/material";
import SmokeBackGround from "../common/SmokeBackgrounds";
import MainNavBar from "./MainNavBars";


const DashboardLayout = ({ children }) => {
  return (
    <>
    <MainNavBar />
      <SmokeBackGround>
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
      </SmokeBackGround>
    </>
  );
};

export default DashboardLayout;