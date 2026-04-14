import { Box } from "@mui/material";

const SmokeBackGround = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
       background:
"radial-gradient(circle at top left, #fff3e8 0%, #fff8f2 34%, #f3ece6 100%)"      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(198,40,40,0.08)",
            filter: "blur(90px)",
            top: -80,
            left: -60,
            animation: "floatSmoke1 14s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255,179,0,0.10)",
            filter: "blur(100px)",
            top: "25%",
            right: -80,
            animation: "floatSmoke2 16s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(120,120,120,0.06)",
            filter: "blur(95px)",
            bottom: -60,
            left: "30%",
            animation: "floatSmoke3 18s ease-in-out infinite",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          "@keyframes floatSmoke1": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(40px, 30px) scale(1.08)" },
            "100%": { transform: "translate(0, 0) scale(1)" },
          },
          "@keyframes floatSmoke2": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(-35px, 20px) scale(1.1)" },
            "100%": { transform: "translate(0, 0) scale(1)" },
          },
          "@keyframes floatSmoke3": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "50%": { transform: "translate(20px, -25px) scale(1.06)" },
            "100%": { transform: "translate(0, 0) scale(1)" },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SmokeBackGround;