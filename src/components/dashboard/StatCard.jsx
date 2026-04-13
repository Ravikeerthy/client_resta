import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, subtitle, icon, color = "primary.main" }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 5,
        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: "grid",
            placeItems: "center",
            bgcolor: "rgba(198,40,40,0.08)",
            color,
            mb: 2,
          }}
        >
          {icon}
        </Box>

        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
          {value}
        </Typography>

        {subtitle ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default StatCard;