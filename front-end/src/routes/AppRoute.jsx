import { Routes, Route, Navigate } from "react-router-dom"; // Ensure you import Navigate
import { path } from "../utils/routePath";
import HomePage from "../pages/HomePage/HomePage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/DashBoard/DashBoard";

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/" element={<HomePage />}>
          <Route index path="home" element={<Home />} />
          {/* Default child route */}
          <Route path="login" element={<Login />} />
        </Route>

        <Route path={path.DASHBOARD} element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default AppRoute;
