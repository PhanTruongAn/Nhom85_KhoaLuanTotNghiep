"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _studentController = _interopRequireDefault(require("../controllers/studentController"));
var _lecturerController = _interopRequireDefault(require("../controllers/lecturerController"));
var _roleController = _interopRequireDefault(require("../controllers/roleController"));
var _managerController = _interopRequireDefault(require("../controllers/managerController"));
var _authentication = require("../middleware/authentication");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

/**
 *
 * @param {*} app : express app
 */

var initWebRoutes = function initWebRoutes(app) {
  router.all("*", _authentication.authentication, _authentication.checkUserPermission);
  // Authenticate route
  router.post("/login", _userController["default"].handleLogin);
  router.get("/fetch-token", _userController["default"].handleGetDataFromToken);
  router.post("/log-out", _userController["default"].handleLogOut);
  router.post("/find-account", _userController["default"].handleFindAccount);
  router.put("/send-email", _userController["default"].handleSendEmail);
  //

  //Student route
  router.post("/student/create-student", _studentController["default"].handleCreateStudentAccount);
  router.post("/student/bulk-create-student", _studentController["default"].handleBulkCreate);
  router.get("/student/get-all", _studentController["default"].handleStudentGetAll);
  router["delete"]("/student/delete", _studentController["default"].handleDeleteStudent);
  router.put("/student/update", _studentController["default"].handleUpdateStudent);
  router["delete"]("/student/delete-many", _studentController["default"].handleDeleteManyStudent);
  router.get("/student/find-student", _studentController["default"].handleFindStudentsByUserNameOrFullName);
  router.get("/student/find-by-name", _studentController["default"].handleFindStudentsByName);
  router.put("/student/change-password", _userController["default"].handleChangePassword);
  router.get("/find-account", _userController["default"].handleFindAccount);
  router.get("/student/get-all-group", _studentController["default"].handleStudentGetAllGroup);
  router.get("/student/my-group", _studentController["default"].handleGetInfoMyGroup);
  router.post("/student/join-group", _studentController["default"].handleJoinGroup);
  router.put("/student/leave-group", _studentController["default"].handleGStudentLeaveGroup);
  router.put("/student/remove-member-from-group", _studentController["default"].handleRemoveMemberFromGroup);
  router.put("/student/transfer-team-leader", _studentController["default"].handleTransferTeamLeader);
  router.get("/student/my-topic", _studentController["default"].handleGetInfoMyTopic);
  router.get("/student/topics", _studentController["default"].handleStudentGetAllTopics);
  router.get("/student/details-topic", _studentController["default"].handleGetDetailsTopic);
  router.post("/student/join-topic", _studentController["default"].handleJoinTopic);
  router.put("/student/leave-topic", _studentController["default"].handleLeaveTopic);
  router.get("/student/find-topic", _studentController["default"].handleSearchTopicWithNameOrLecturer);
  router.get("/student/term", _studentController["default"].handleGetTerm);
  router.get("/student/notes", _studentController["default"].handleGetNotes);
  router.get("/student/majors", _studentController["default"].handleGetMajors);
  router.get("/student/evaluation", _studentController["default"].handleGetEvaluation);

  //Lecturer route
  router.post("/lecturer/create-lecturer", _lecturerController["default"].handleCreateLecturerAccount);
  router.post("/lecturer/bulk-create-lecturer", _lecturerController["default"].handleBulkCreateLecturer);
  router.get("/lecturer/get-all", _lecturerController["default"].handleLecturerGetAll);
  router.get("/lecturer/get-roles", _roleController["default"].handleGetRolesForLecturer);
  router["delete"]("/lecturer/delete", _lecturerController["default"].handleDeleteLecturer);
  router.put("/lecturer/update", _lecturerController["default"].handleUpdateLecturer);
  router["delete"]("/lecturer/delete-many", _lecturerController["default"].handleDeleteManyLecturer);
  router.get("/lecturer/find-lecturer", _lecturerController["default"].handleFindLecturersByUserNameOrFullName);
  router.get("/lecturer/find-by-name", _lecturerController["default"].handleFindLecturersByName);
  router.put("/lecturer/change-password", _userController["default"].handleChangePassword);
  router.post("/lecturer/create-topic", _lecturerController["default"].handleCreateTopics);
  router.get("/lecturer/term", _lecturerController["default"].handleGetTerm);
  router.get("/lecturer/notes", _lecturerController["default"].handleGetNotes);
  router.get("/lecturer/my-topics", _lecturerController["default"].handleGetPersonalTopics);
  router["delete"]("/lecturer/delete-topic", _lecturerController["default"].handleDeleteTopic);
  router.put("/lecturer/update-topic", _lecturerController["default"].handleUpdateTopic);
  router.post("/lecturer/evaluations", _lecturerController["default"].handlePointGroup);
  router.get("/lecturer/my-groups-student", _lecturerController["default"].handleGetGroupTopic);
  router.get("/lecturer/review-groups-student", _lecturerController["default"].handleGetReviewStudentGroups);
  router.get("/lecturer/my-group", _lecturerController["default"].handleMyGroup);
  router.get("/lecturer/get-group-evaluation", _lecturerController["default"].handleGetGroupEvaluation);
  router.put("/lecturer/choose-leader", _lecturerController["default"].handleChooseLeader);
  router.put("/lecturer/add-student-to-group", _lecturerController["default"].handleAddStudentToGroup);
  //Manager Route
  router.get("/manager/get-all-permission", _managerController["default"].handleGetAllPermission);
  router.post("/manager/create-permission", _managerController["default"].handleCreatePermission);
  router.put("/manager/update-permission", _managerController["default"].handleUpdatePermission);
  router["delete"]("/manager/delete-permission", _managerController["default"].handleDeletePermission);
  router["delete"]("/manager/delete-group-student", _managerController["default"].handleDeleteGroupStudent);
  router.get("/manager/find-permission", _managerController["default"].handleFindByDescription);
  router.post("/manager/get-role-permissions", _managerController["default"].handleGetRolePermissions);
  router.post("/manager/assign-permissions", _managerController["default"].handleAssignPermissions);
  router.post("/manager/create-groups-student", _managerController["default"].handleCreateGroupsStudent);
  router.get("/manager/get-groups-student", _managerController["default"].handleGetAllGroupsStudent);
  router.get("/manager/find-group-student", _managerController["default"].handleFindGroupStudent);
  router.get("/manager/count-student", _managerController["default"].handleCountStudent);
  router.post("/manager/create-term", _managerController["default"].handleCreateNewTerm);
  router.get("/manager/terms", _managerController["default"].handleGetTerms);
  router.put("/manager/update-term", _managerController["default"].handleUpdateTerm);
  router.post("/manager/create-major", _managerController["default"].handleCreateMajor);
  router["delete"]("/manager/delete-major", _managerController["default"].handleDeleteMajor);
  router.put("/manager/update-major", _managerController["default"].handleUpdateMajor);
  router.get("/manager/majors", _managerController["default"].handleGetMajors);
  router.post("/manager/create-note", _managerController["default"].handleCreateNote);
  router.get("/manager/notes", _managerController["default"].handleGetNotes);
  router["delete"]("/manager/delete-note", _managerController["default"].handleDeleteNote);
  router.put("/manager/update-note", _managerController["default"].handleUpdateNote);
  router.get("/manager/lecturer-topics", _managerController["default"].handleGetAllLecturerTopics);
  router.get("/manager/find-topics", _managerController["default"].handleFindTopicByTitleOrLecturerName);
  router.put("/manager/assign-topic", _managerController["default"].handleAssignTopicToGroup);
  router.get("/manager/get-lecturers", _lecturerController["default"].handleReviewLecturers);
  router.post("/manager/create-group-lecturer", _managerController["default"].handleCreateGroupLecturer);
  router.get("/manager/get-group-lecturer", _managerController["default"].handleGetGroupLecturer);
  router.get("/manager/review-group-student", _managerController["default"].handleGetAllReviewGroupStudent);
  router.put("/manager/assign-group-lecturer", _managerController["default"].handleAssignGroupLecturer);
  router["delete"]("/manager/delete-group-lecturer", _managerController["default"].handleDeleteGroupLecturer);
  router["delete"]("/manager/delete-lecturer-from-group", _managerController["default"].handleDeleteLecturerFromGroup);
  router.put("/manager/add-lecturer-to-group", _managerController["default"].handleAddLecturerToGroup);
  router.get("/manager/statistics", _managerController["default"].handleGetStatistics);
  return app.use("/", router);
};
var _default = exports["default"] = initWebRoutes;