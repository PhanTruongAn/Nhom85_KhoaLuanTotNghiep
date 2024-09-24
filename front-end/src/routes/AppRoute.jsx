import { Routes, Route, Navigate } from "react-router-dom"; // Ensure you import Navigate
import { path } from "../utils/routePath";
import HomePage from "../pages/HomePage/HomePage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import DashBoardStudent from "../pages/DashBoard/DashBoardStudent/DashBoardStudent";
import DashBoardManager from "../pages/DashBoard/DashBoardManager/DashBoardManager";
import StudentHome from "../pages/DashBoard/DashBoardStudent/home/home";
import ManagerHome from "../pages/DashBoard/DashBoardManager/home/home";
import PrivateRoute from "./PrivateRoute";
import StudentTopic from "../pages/DashBoard/DashBoardStudent/topic/topic";
import ManagerTopic from "../pages/DashBoard/DashBoardManager/topic/topic";
import AccountStudent from "../pages/DashBoard/DashBoardManager/student/accountStudent";
import ListStudent from "../pages/DashBoard/DashBoardManager/student/listStudent";
import AccountLecturer from "../pages/DashBoard/DashBoardManager/lecturer/accountLecturer";
import ListLecturer from "../pages/DashBoard/DashBoardManager/lecturer/listLecturer";
import RolePermission from "../pages/DashBoard/DashBoardManager/permission/rolePermission";
import ListPermission from "../pages/DashBoard/DashBoardManager/permission/listPermission";
import ChangePassword from "../pages/setting/ChangePassword";
import ForgetPassword from "../pages/Login/forgetPassword/ForgetPassword";
import ListGroupStudent from "../pages/DashBoard/DashBoardManager/groupStudent/ListGroupStudent";
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
          <Route path="login" element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>

        <Route
          path={path.DASHBOARD}
          element={
            <PrivateRoute
              component={
                user.role.name === "STUDENT" ? (
                  <DashBoardStudent />
                ) : (
                  <DashBoardManager />
                )
              }
            />
          }
        >
          <Route
            path="home"
            element={
              user.role.name === "STUDENT" ? (
                <PrivateRoute component={<StudentHome />} />
              ) : (
                <PrivateRoute component={<ManagerHome />} />
              )
            }
          />
          <Route
            path="topic"
            element={
              user.role.name === "STUDENT" ? (
                <PrivateRoute component={<StudentTopic />} />
              ) : (
                <PrivateRoute component={<ManagerTopic />} />
              )
            }
          />
          <Route
            path="account-student"
            element={<PrivateRoute component={<AccountStudent />} />}
          />
          <Route
            path="list-student"
            element={<PrivateRoute component={<ListStudent />} />}
          />
          <Route
            path="list-group-student"
            element={<PrivateRoute component={<ListGroupStudent />} />}
          />
          <Route
            path="account-lecturer"
            element={<PrivateRoute component={<AccountLecturer />} />}
          />
          <Route
            path="list-lecturer"
            element={<PrivateRoute component={<ListLecturer />} />}
          />
          <Route
            path="role-permission"
            element={<PrivateRoute component={<RolePermission />} />}
          />
          <Route
            path="list-permission"
            element={<PrivateRoute component={<ListPermission />} />}
          />
          <Route
            path="change-password"
            element={<PrivateRoute component={<ChangePassword />} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoute;
