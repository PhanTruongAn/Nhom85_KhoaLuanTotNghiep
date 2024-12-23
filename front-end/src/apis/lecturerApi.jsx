import axiosClient from "./axiosClient";
const baseUrl = "/lecturer";
const lecturerApi = {
  createAccountsLecturer: (data) => {
    return axiosClient.post(baseUrl + "/bulk-create-lecturer", data);
  },
  createSingleAccountLecturer: (data) => {
    return axiosClient.post(baseUrl + "/create-lecturer", data);
  },
  getAll: (page, limit, term) => {
    return axiosClient.get(
      `${baseUrl}/get-all?term=${term}&page=${page}&limit=${limit}`
    );
  },
  getRoles: () => {
    return axiosClient.get(baseUrl + "/get-roles");
  },
  deleteById: (data) => {
    return axiosClient.delete(baseUrl + "/delete", { data });
  },
  updateById: (data) => {
    return axiosClient.put(baseUrl + "/update", data);
  },
  deleteMany: (data) => {
    return axiosClient.delete(baseUrl + "/delete-many", { data });
  },
  findLecturer: (term, search) => {
    return axiosClient.get(
      `${baseUrl}/find-lecturer?term=${term}&search=${search}`
    );
  },
  findByName: (page, limit, input) => {
    return axiosClient.get(
      `${baseUrl}/find-by-name?page=${page}&limit=${limit}&input=${input}`
    );
  },
  getTerm: (id) => {
    return axiosClient.get(`${baseUrl}/term?id=${id}`);
  },

  changePassword: (data) => {
    return axiosClient.put(baseUrl + "/change-password", data);
  },
  createTopics: (data) => {
    return axiosClient.post(baseUrl + "/create-topic", data);
  },
  getPersonalTopic: (term, id) => {
    return axiosClient.get(baseUrl + `/my-topics?term=${term}&id=${id}`);
  },
  deleteTopicById: (data) => {
    return axiosClient.delete(baseUrl + "/delete-topic", { data });
  },
  updateTopicById: (data) => {
    return axiosClient.put(baseUrl + "/update-topic", data);
  },
  getNotes: (termId, roleId) => {
    return axiosClient.get(`${baseUrl}/notes?term=${termId}&role=${roleId}`);
  },
  evaluations: (data) => {
    return axiosClient.post(baseUrl + "/evaluations", data);
  },
  getMyGroupStudent: (termId, lecturerId) => {
    return axiosClient.get(
      `${baseUrl}/my-groups-student?term=${termId}&lecturer=${lecturerId}`
    );
  },
  getMyGroup: (lecturerId, termId) => {
    return axiosClient.get(
      `${baseUrl}/my-group?lecturer=${lecturerId}&termId=${termId}`
    );
  },
  reviewStudentGroups: (group, term) => {
    return axiosClient.get(
      `${baseUrl}/review-groups-student?group=${group}&term=${term}`
    );
  },
  getGroupEvaluation: (group, term) => {
    return axiosClient.get(
      `${baseUrl}/get-group-evaluation?group=${group}&term=${term}`
    );
  },
  chooseLeader: (data) => {
    return axiosClient.put(baseUrl + "/choose-leader", data);
  },
  addStudentToGroup: (data) => {
    return axiosClient.put(baseUrl + "/add-student-to-group", data);
  },
};
export default lecturerApi;
