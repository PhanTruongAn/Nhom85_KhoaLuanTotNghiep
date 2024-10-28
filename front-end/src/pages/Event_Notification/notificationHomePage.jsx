import React from "react";
import { Box } from "@mui/material";
function notificationHomePage() {
  return (
    <Box
      sx={{
        "@media (max-height: 600px)": {
          marginTop: "140px",
        },
        "@media (max-width: 600px)": {
          marginTop: "140px",
        },
      }}
    >
      <iframe
        src="https://fit.iuh.edu.vn/news.html@155@Thong-bao-Sinh-vien"
        title="Website IUH"
        style={{
          width: "100%",
          height: "589px",
          overflowY: "auto",
          marginTop: "100px",
        }}
      ></iframe>
    </Box>
  );
}

export default notificationHomePage;
