import React from "react";
import emptyDataImage from "../../images/anhdong/overdue.gif";
import { Box, Typography } from "@mui/material";

function overDate({ text, overDate }) {
  console.log("OverDate: ", overDate);

  // Format the overDate to dd/MM/yyyy
  const formattedDate = new Date(overDate).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100%" }}
    >
      <Box
        component="img"
        src={emptyDataImage}
        alt="Loading animation"
        sx={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <Typography variant="h6" sx={{ marginTop: "16px" }}>
        {text ? (
          <>
            {text}
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "red",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              ({formattedDate})
            </Typography>
          </>
        ) : (
          "Đang tải dữ liệu..."
        )}
      </Typography>
    </Box>
  );
}

export default overDate;
