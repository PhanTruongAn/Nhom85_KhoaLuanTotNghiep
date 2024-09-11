import { Routes, Route, Navigate } from "react-router-dom"; // Ensure you import Navigate
import { path } from "../utils/routePath";
import HomePage from "../pages/HomePage/HomePage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import DashBoardStudent from "../pages/DashBoard/DashBoardStudent/DashBoardStudent";
import DashBoardManager from "../pages/DashBoard/DashBoardManager/DashBoardManager";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
const AppRoute = () => {
  const defaultData = {
    fullName: "",
    username: "",
    role: {
      id: "",
      name: "",
    },
  };
  const user = useSelector((state) =>
    isEmpty(state.userInit.user) ? defaultData : state.userInit.user
  );
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/" element={<HomePage />}>
          <Route index path="home" element={<Home />} />
          {/* Default child route */}
          <Route path="login" element={<Login />} />
        </Route>

        <Route
          path={path.DASHBOARD}
          element={
            <PrivateRoute
              component={
                user.role.name === "Student" ? (
                  <DashBoardStudent />
                ) : (
                  <DashBoardManager />
                )
              }
            />
          }
        />
      </Routes>
    </>
  );
};

export default AppRoute;
