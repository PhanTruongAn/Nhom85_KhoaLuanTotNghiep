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
import StudentTopic from "../pages/DashBoard/DashBoardStudent/topic/StudentTopic";
import ManagerTopic from "../pages/DashBoard/DashBoardManager/topic/topic";
import AccountStudent from "../pages/DashBoard/DashBoardManager/student/accountStudent";
import ListStudent from "../pages/DashBoard/DashBoardManager/student/listStudent";
import AccountLecturer from "../pages/DashBoard/DashBoardManager/lecturer/accountLecturer";
import ListLecturer from "../pages/DashBoard/DashBoardManager/lecturer/listLecturer";
import RolePermission from "../pages/DashBoard/DashBoardManager/permission/rolePermission";
import ListPermission from "../pages/DashBoard/DashBoardManager/permission/listPermission";
import ChangePassword from "../pages/Setting/ChangePassword";
import ForgetPassword from "../pages/Login/forgetPassword/ForgetPassword";
import ListGroupStudent from "../pages/DashBoard/DashBoardManager/groupStudent/ListGroupStudent";
import CreateGroupStudent from "../pages/DashBoard/DashBoardManager/groupStudent/CreateGroupStudent";
import ListTopic from "../pages/DashBoard/DashBoardStudent/topic/ListTopic";
import ListStudentGroup from "../pages/DashBoard/DashBoardStudent/group/ListStudentGroup";
import StudentGroup from "../pages/DashBoard/DashBoardStudent/group/StudentGroup";
import MyPoint from "../pages/DashBoard/DashBoardStudent/point/MyPoint";
import Criteria from "../pages/DashBoard/DashBoardStudent/criteria/Criteria";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import PersonalTopics from "../pages/DashBoard/DashBoardManager/topic/personalTopics";
import ListGroupTopicLecturer from "../pages/DashBoard/DashBoardManager/point/listGroupTopicLecturer";
import CreateNotification from "../pages/DashBoard/DashBoardManager/notifications/manageNotification/createNotification";
import ManageNotification from "../pages/DashBoard/DashBoardManager/notifications/manageNotification/manageNotification";
import ListTerm from "../pages/DashBoard/DashBoardManager/term/listTerm";
import CreateTerm from "../pages/DashBoard/DashBoardManager/term/createTerm";
import Statistical from "../pages/DashBoard/DashBoardManager/home/statistical";
import Event from "../pages/Event_Notification/eventHomePage";
import NotificationHomePage from "../pages/Event_Notification/notificationHomePage";
import ManageMajor from "../pages/DashBoard/DashBoardManager/term/major/manageMajor";
import ManagerTopics from "../pages/DashBoard/DashBoardManager/topic/managerTopics";
import ListGroupStudentLecturer from "../pages/DashBoard/DashBoardManager/groupStudent/ListGroupStudentLecturer";
import ClassifyTypeLecturer from "../pages/DashBoard/DashBoardManager/classifyLecturer/ClassifyTypeLecturer";
import CreateLecturerGroup from "../pages/DashBoard/DashBoardManager/classifyLecturer/CreateLecturerGroup";
import ManageGroupLecturer from "../pages/DashBoard/DashBoardManager/classifyLecturer/ManageGroupLecturer";
import GroupLecturer from "../pages/DashBoard/DashBoardManager/groupLecturer/GroupLecturer";
import ManagePointStudent from "../pages/DashBoard/DashBoardManager/point/ManagePointStudent";
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
          <Route path="information" element={<Event />} />
          <Route path="notification" element={<NotificationHomePage />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<PageNotFound />} />
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
            path="create-group-student"
            element={<PrivateRoute component={<CreateGroupStudent />} />}
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
          <Route
            path="list-topic"
            element={<PrivateRoute component={<ListTopic />} />}
          />
          <Route
            path="my-topic"
            element={<PrivateRoute component={<StudentTopic />} />}
          />
          <Route
            path="list-student-group"
            element={<PrivateRoute component={<ListStudentGroup />} />}
          />
          <Route
            path="my-group"
            element={<PrivateRoute component={<StudentGroup />} />}
          />
          <Route
            path="my-point"
            element={<PrivateRoute component={<MyPoint />} />}
          />
          <Route
            path="criteria"
            element={<PrivateRoute component={<Criteria />} />}
          />
          <Route
            path="personal-list-topic"
            element={<PrivateRoute component={<PersonalTopics />} />}
          />
          <Route
            path="point-list-group"
            element={<PrivateRoute component={<ListGroupTopicLecturer />} />}
          />
          <Route
            path="create-notification"
            element={<PrivateRoute component={<CreateNotification />} />}
          />
          <Route
            path="manage-notification"
            element={<PrivateRoute component={<ManageNotification />} />}
          />
          <Route
            path="list-term"
            element={<PrivateRoute component={<ListTerm />} />}
          />
          <Route
            path="create-term"
            element={<PrivateRoute component={<CreateTerm />} />}
          />
          <Route
            path="statistical"
            element={<PrivateRoute component={<Statistical />} />}
          />
          <Route
            path="information"
            element={<PrivateRoute component={<ManagerHome />} />}
          />
          <Route
            path="manage-major"
            element={<PrivateRoute component={<ManageMajor />} />}
          />
          <Route
            path="manage-list-topic"
            element={<PrivateRoute component={<ManagerTopics />} />}
          />
          <Route
            path="list-group-student-lecturer"
            element={<PrivateRoute component={<ListGroupStudentLecturer />} />}
          />
          <Route
            path="classify-type-lecturer"
            element={<PrivateRoute component={<ClassifyTypeLecturer />} />}
          />
          <Route
            path="create-lecturer-group"
            element={<PrivateRoute component={<CreateLecturerGroup />} />}
          />
          <Route
            path="manage-group-lecturer"
            element={<PrivateRoute component={<ManageGroupLecturer />} />}
          />
          <Route
            path="my-group-lecturer"
            element={<PrivateRoute component={<GroupLecturer />} />}
          />
          <Route
            path="manage-point-student"
            element={<PrivateRoute component={<ManagePointStudent />} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoute;
