import express from "express";
import userController from "../controllers/userController";
import studentController from "../controllers/studentController";
import lecturerController from "../controllers/lecturerController";
import roleController from "../controllers/roleController";
import managerController from "../controllers/managerController";
import {
  authentication,
  checkUserPermission,
} from "../middleware/authentication";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  router.all("*", authentication, checkUserPermission);
  // Authenticate route
  router.post("/api/login", userController.handleLogin);
  router.get("/api/fetch-token", userController.handleGetDataFromToken);
  router.post("/api/log-out", userController.handleLogOut);
  router.post("/api/find-account", userController.handleFindAccount);
  router.put("/api/send-email", userController.handleSendEmail);
  //

  //Student route
  router.post(
    "/student/create-student",
    studentController.handleCreateStudentAccount
  );
  router.post(
    "/student/bulk-create-student",
    studentController.handleBulkCreate
  );
  router.get("/student/get-all", studentController.handleStudentGetAll);
  router.delete("/student/delete", studentController.handleDeleteStudent);
  router.put("/student/update", studentController.handleUpdateStudent);
  router.delete(
    "/student/delete-many",
    studentController.handleDeleteManyStudent
  );
  router.get(
    "/student/find-student",
    studentController.handleFindStudentsByUserNameOrFullName
  );
  router.get(
    "/student/find-by-name",
    studentController.handleFindStudentsByName
  );
  router.put("/student/change-password", userController.handleChangePassword);
  router.get("/find-account", userController.handleFindAccount);
  router.get(
    "/student/get-all-group",
    studentController.handleStudentGetAllGroup
  );
  router.get("/student/my-group", studentController.handleGetInfoMyGroup);
  router.post("/student/join-group", studentController.handleJoinGroup);
  router.put(
    "/student/leave-group",
    studentController.handleGStudentLeaveGroup
  );

  router.put(
    "/student/remove-member-from-group",
    studentController.handleRemoveMemberFromGroup
  );
  router.put(
    "/student/transfer-team-leader",
    studentController.handleTransferTeamLeader
  );
  router.get("/student/my-topic", studentController.handleGetInfoMyTopic);
  router.get("/student/topics", studentController.handleStudentGetAllTopics);
  router.get("/student/details-topic", studentController.handleGetDetailsTopic);
  router.post("/student/join-topic", studentController.handleJoinTopic);
  router.put("/student/leave-topic", studentController.handleLeaveTopic);
  router.get(
    "/student/find-topic",
    studentController.handleSearchTopicWithNameOrLecturer
  );
  router.get("/student/term", studentController.handleGetTerm);
  router.get("/student/notes", studentController.handleGetNotes);
  router.get("/student/majors", studentController.handleGetMajors);
  router.get("/student/evaluation", studentController.handleGetEvaluation);

  //Lecturer route
  router.post(
    "/lecturer/create-lecturer",
    lecturerController.handleCreateLecturerAccount
  );
  router.post(
    "/lecturer/bulk-create-lecturer",
    lecturerController.handleBulkCreateLecturer
  );
  router.get("/lecturer/get-all", lecturerController.handleLecturerGetAll);
  router.get("/lecturer/get-roles", roleController.handleGetRolesForLecturer);
  router.delete("/lecturer/delete", lecturerController.handleDeleteLecturer);
  router.put("/lecturer/update", lecturerController.handleUpdateLecturer);
  router.delete(
    "/lecturer/delete-many",
    lecturerController.handleDeleteManyLecturer
  );
  router.get(
    "/lecturer/find-lecturer",
    lecturerController.handleFindLecturersByUserNameOrFullName
  );
  router.get(
    "/lecturer/find-by-name",
    lecturerController.handleFindLecturersByName
  );
  router.put("/lecturer/change-password", userController.handleChangePassword);
  router.post("/lecturer/create-topic", lecturerController.handleCreateTopics);
  router.get("/lecturer/term", lecturerController.handleGetTerm);
  router.get("/lecturer/notes", lecturerController.handleGetNotes);
  router.get("/lecturer/my-topics", lecturerController.handleGetPersonalTopics);
  router.delete("/lecturer/delete-topic", lecturerController.handleDeleteTopic);
  router.put("/lecturer/update-topic", lecturerController.handleUpdateTopic);
  router.post("/lecturer/evaluations", lecturerController.handlePointGroup);
  router.get(
    "/lecturer/my-groups-student",
    lecturerController.handleGetGroupTopic
  );
  router.get(
    "/lecturer/review-groups-student",
    lecturerController.handleGetReviewStudentGroups
  );
  router.get("/lecturer/my-group", lecturerController.handleMyGroup);
  router.get(
    "/lecturer/get-group-evaluation",
    lecturerController.handleGetGroupEvaluation
  );
  router.put("/lecturer/choose-leader", lecturerController.handleChooseLeader);
  router.put(
    "/lecturer/add-student-to-group",
    lecturerController.handleAddStudentToGroup
  );
  //Manager Route
  router.get(
    "/manager/get-all-permission",
    managerController.handleGetAllPermission
  );
  router.post(
    "/manager/create-permission",
    managerController.handleCreatePermission
  );
  router.put(
    "/manager/update-permission",
    managerController.handleUpdatePermission
  );
  router.delete(
    "/manager/delete-permission",
    managerController.handleDeletePermission
  );
  router.delete(
    "/manager/delete-group-student",
    managerController.handleDeleteGroupStudent
  );
  router.get(
    "/manager/find-permission",
    managerController.handleFindByDescription
  );
  router.post(
    "/manager/get-role-permissions",
    managerController.handleGetRolePermissions
  );
  router.post(
    "/manager/assign-permissions",
    managerController.handleAssignPermissions
  );
  router.post(
    "/manager/create-groups-student",
    managerController.handleCreateGroupsStudent
  );
  router.get(
    "/manager/get-groups-student",
    managerController.handleGetAllGroupsStudent
  );
  router.get(
    "/manager/find-group-student",
    managerController.handleFindGroupStudent
  );
  router.get("/manager/count-student", managerController.handleCountStudent);
  router.post("/manager/create-term", managerController.handleCreateNewTerm);
  router.get("/manager/terms", managerController.handleGetTerms);
  router.put("/manager/update-term", managerController.handleUpdateTerm);
  router.post("/manager/create-major", managerController.handleCreateMajor);
  router.delete("/manager/delete-major", managerController.handleDeleteMajor);
  router.put("/manager/update-major", managerController.handleUpdateMajor);
  router.get("/manager/majors", managerController.handleGetMajors);
  router.post("/manager/create-note", managerController.handleCreateNote);
  router.get("/manager/notes", managerController.handleGetNotes);
  router.delete("/manager/delete-note", managerController.handleDeleteNote);
  router.put("/manager/update-note", managerController.handleUpdateNote);
  router.get(
    "/manager/lecturer-topics",
    managerController.handleGetAllLecturerTopics
  );
  router.get(
    "/manager/find-topics",
    managerController.handleFindTopicByTitleOrLecturerName
  );
  router.put(
    "/manager/assign-topic",
    managerController.handleAssignTopicToGroup
  );
  router.get(
    "/manager/get-lecturers",
    lecturerController.handleReviewLecturers
  );
  router.post(
    "/manager/create-group-lecturer",
    managerController.handleCreateGroupLecturer
  );
  router.get(
    "/manager/get-group-lecturer",
    managerController.handleGetGroupLecturer
  );
  router.get(
    "/manager/review-group-student",
    managerController.handleGetAllReviewGroupStudent
  );
  router.put(
    "/manager/assign-group-lecturer",
    managerController.handleAssignGroupLecturer
  );
  router.delete(
    "/manager/delete-group-lecturer",
    managerController.handleDeleteGroupLecturer
  );
  router.delete(
    "/manager/delete-lecturer-from-group",
    managerController.handleDeleteLecturerFromGroup
  );
  router.put(
    "/manager/add-lecturer-to-group",
    managerController.handleAddLecturerToGroup
  );
  router.get(
    "/manager/group-student-evaluation",
    managerController.handleGetAllGroupEvaluation
  );

  router.get("/manager/statistics", managerController.handleGetStatistics);
  router.get(
    "/manager/find-evaluation",
    managerController.handleFindEvaluation
  );
  router.put(
    "/manager/edit-evaluation",
    managerController.handleEditEvaluation
  );
  router.delete(
    "/manager/delete-evaluation",
    managerController.handleDeleteEvaluation
  );
  return app.use("/", router);
};

export default initWebRoutes;
