import { Box, Typography } from "@mui/material";
import registerImage from "../../assets/food.png"
import SmokeBackGround from "../common/SmokeBackGround";

const authImage = registerImage

const AuthSplitLayout = ({ title, subtitle, children }) => {
  return (
    <SmokeBackGround>
      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "relative",
            minHeight: "100vh",
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.22)), url(${authImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "@keyframes floatTagline": {
              "0%": { transform: "translateY(0px)", opacity: 0.9 },
              "50%": { transform: "translateY(-8px)", opacity: 1 },
              "100%": { transform: "translateY(0px)", opacity: 0.9 },
            },
            "@keyframes glowPulse": {
              "0%": { textShadow: "0 6px 20px rgba(0,0,0,0.18)" },
              "50%": { textShadow: "0 10px 28px rgba(0,0,0,0.32)" },
              "100%": { textShadow: "0 6px 20px rgba(0,0,0,0.18)" },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 40,
              left: 40,
              right: 40,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.4rem",
                lineHeight: 1.35,
                maxWidth: 360,
                animation: "floatTagline 4.5s ease-in-out infinite, glowPulse 4.5s ease-in-out infinite",
              }}
            >
              Where every plate tells a story.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, sm: 4, md: 6 },
            py: 5,
            minHeight: "100vh",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 480 }}>
            <Typography
              variant="overline"
              color="secondary"
              sx={{ fontWeight: 700, letterSpacing: 1.2 }}
            >
              Keerthy's Kitchen
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
              {title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1, mb: 4, lineHeight: 1.7 }}
            >
              {subtitle}
            </Typography>

            {children}
          </Box>
        </Box>
      </Box>
    </SmokeBackGround>
  );
};

export default AuthSplitLayout;
