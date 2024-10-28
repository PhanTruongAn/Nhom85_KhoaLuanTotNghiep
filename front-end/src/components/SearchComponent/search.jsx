import React, { useState } from "react";

import { Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CloseCircleFilled } from "@ant-design/icons";

function SearchComponent({ onChange, loading, onSearch, value, placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingTop: "10px", paddingLeft: "10px" }}
    >
      <Grid item xs={12} sm={4}>
        <TextField
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={value}
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
    // <Search
    //   placeholder={placeholder}
    //   onSearch={onSearch}
    //   onChange={onChange}
    //   enterButton
    //   loading={loading}
    //   style={{ width: "100%" }}
    //   value={value}
    // />
  );
}

export default SearchComponent;
