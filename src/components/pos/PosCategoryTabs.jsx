import { Box, Tab, Tabs } from "@mui/material";

const PosCategoryTabs = ({ categories, value, onChange }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 4,
        px: 1,
        py: 1,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {categories.map((category) => (
          <Tab
            key={category}
            label={category}
            value={category}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default PosCategoryTabs;