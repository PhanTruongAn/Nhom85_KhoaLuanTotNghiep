import { Box, useMediaQuery, useTheme } from "@mui/material";
function notificationHomePage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      <iframe
        src="https://fit.iuh.edu.vn/news.html@155@Thong-bao-Sinh-vien"
        title="Website IUH"
        style={{
          width: "100%",
          height: isSmallScreen ? "100vh" : "589px",
          overflowY: "auto",
          marginTop: "100px",
        }}
      ></iframe>
    </Box>
  );
}

export default notificationHomePage;
