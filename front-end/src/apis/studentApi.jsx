import axiosClient from "./axiosClient";
const baseUrl = "/student";
const studentApi = {
  createAccountsStudent: (data) => {
    return axiosClient.post(baseUrl + "/bulk-create-student", data);
  },
  createSingleAccountStudent: (data) => {
    return axiosClient.post(baseUrl + "/create-student", data);
  },
  joinGroup: (data) => {
    return axiosClient.post(baseUrl + "/join-group", data);
  },
  joinTopic: (data) => {
    return axiosClient.post(baseUrl + "/join-topic", data);
  },
  leaveTopic: (data) => {
    return axiosClient.put(baseUrl + "/leave-topic", data);
  },
  leaveGroup: (data) => {
    return axiosClient.put(baseUrl + "/leave-group", data);
  },
  removeMember: (data) => {
    return axiosClient.put(baseUrl + "/remove-member-from-group", data);
  },
  transferLeader: (data) => {
    return axiosClient.put(baseUrl + "/transfer-team-leader", data);
  },
  getMyGroup: (group) => {
    return axiosClient.get(baseUrl + `/my-group?group=${group}`);
  },
  getMyTopic: (topic) => {
    return axiosClient.get(baseUrl + `/my-topic?topic=${topic}`);
  },
  viewDetailsTopic: (id) => {
    return axiosClient.get(baseUrl + `/details-topic?id=${id}`);
  },
  getAll: (page, limit, term) => {
    return axiosClient.get(
      `${baseUrl}/get-all?term=${term}&page=${page}&limit=${limit}`
    );
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
  findByUserNameOrFullName: (term, search) => {
    return axiosClient.get(
      `${baseUrl}/find-student?term=${term}&search=${search}`
    );
  },
  findByName: (page, limit, input) => {
    return axiosClient.get(
      `${baseUrl}/find-by-name?page=${page}&limit=${limit}&input=${input}`
    );
  },
  findTopic: (value) => {
    return axiosClient.get(`${baseUrl}/find-topic?search=${value}`);
  },
  changePassword: (data) => {
    return axiosClient.put(baseUrl + "/change-password", data);
  },

  getAllGroup: (page, limit) => {
    return axiosClient.get(
      `${baseUrl}/get-all-group?page=${page}&limit=${limit}`
    );
  },
  getAllTopics: (page, limit, term) => {
    return axiosClient.get(
      `${baseUrl}/topics?term=${term}&page=${page}&limit=${limit}`
    );
  },
  getTerm: (id) => {
    return axiosClient.get(baseUrl + `/term?student=${id}`);
  },
  getNotes: (termId, roleId) => {
    return axiosClient.get(`${baseUrl}/notes?term=${termId}&role=${roleId}`);
  },
  getMajors: () => {
    return axiosClient.get(baseUrl + "/majors");
  },
};
export default studentApi;
