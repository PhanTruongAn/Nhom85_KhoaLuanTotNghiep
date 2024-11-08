import emptyDataImage from "../../images/anhdong/overdate.gif";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
// Helper function to format date and time
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  });
};

function OverDate({ text, startDate, endDate }) {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <Box
      marginTop="70px"
      // alignSelf="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign={"center"}
      justifyContent="center"
      width={"100%"}
      height={"auto"}
    >
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
          sx={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            mixBlendMode: "multiply",
          }}
        />
        <Typography variant="h6" sx={{ marginTop: "16px" }}>
          {text ? (
            <>
              {text}
              <br />
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "red",
                  borderRadius: "4px",
                }}
              >
                {`Thời gian đăng ký: ${formattedStartDate} - ${formattedEndDate}`}
              </Typography>
            </>
          ) : (
            "Đang tải dữ liệu..."
          )}
        </Typography>
      </Box>
    </Box>
  );
}
OverDate.propTypes = {
  text: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};
export default OverDate;
