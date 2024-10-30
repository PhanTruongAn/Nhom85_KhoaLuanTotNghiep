import React, { useState } from "react";
import { Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchComponent({ onChange, placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onChange(value);
  };

  return (
    <Grid container spacing={2} sx={{ paddingLeft: "10px" }}>
      <Grid item xs={12} sm={4}>
        <TextField
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          fullWidth
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

export default SearchComponent;
