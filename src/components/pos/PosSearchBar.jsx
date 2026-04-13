import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PosSearchBar = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      placeholder="Search menu items..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PosSearchBar;