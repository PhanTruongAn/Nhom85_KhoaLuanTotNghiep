import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer.jsx";
import HomePageTest from "../../components/Swiper/HomePageTest.jsx";
import { Box } from "@mui/material";

const Home = () => {
  const [themes, setThemes] = useState(
    localStorage.getItem("themeDark") === "true"
  );

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem("themeDark");
      const themeValue = storedTheme === "true";
      if (themeValue !== themes) {
        setThemes(themeValue);
      }
    };

    // Kiểm tra giá trị themeDark trong localStorage mỗi 100ms
    const intervalId = setInterval(checkTheme, 100);

    // Cleanup interval khi component unmount
    return () => clearInterval(intervalId);
  }, [themes]); // Chạy khi themes thay đổi
  return (
    <Box>
      <HomePageTest />
      {/* <TiltComponent /> */}
      <Footer />
    </Box>
  );
};

export default Home;
