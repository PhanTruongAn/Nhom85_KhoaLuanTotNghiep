import React from "react";
import { Box } from "@mui/material";

function Event() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        marginTop: "50px",
        "@media (max-height: 600px)": {
          marginTop: "200px",
        },
        "@media (max-width: 600px)": {
          marginTop: "200px",
        },
      }}
    >
      <iframe
        src="https://fit.iuh.edu.vn/news.html@102@Tin-tuc-Su-kien"
        title="Website IUH"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          marginTop: "50px",
        }}
      ></iframe>
    </Box>
  );
}

export default Event;
