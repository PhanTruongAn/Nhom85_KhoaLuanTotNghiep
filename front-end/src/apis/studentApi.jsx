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
  leaveGroup: (data) => {
    return axiosClient.put(baseUrl + "/leave-group", data);
  },
  getMyGroup: (group) => {
    return axiosClient.get(baseUrl + `/my-group?group=${group}`);
  },
  getAll: (page, limit) => {
    return axiosClient.get(`${baseUrl}/get-all?page=${page}&limit=${limit}`);
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
  findByUserName: (page, limit, input) => {
    return axiosClient.get(
      `${baseUrl}/find-by-username?page=${page}&limit=${limit}&input=${input}`
    );
  },
  findByName: (page, limit, input) => {
    return axiosClient.get(
      `${baseUrl}/find-by-name?page=${page}&limit=${limit}&input=${input}`
    );
  },
  changePassword: (data) => {
    return axiosClient.put(baseUrl + "/change-password", data);
  },

  getAllGroup: (page, limit) => {
    return axiosClient.get(
      `${baseUrl}/get-all-group?page=${page}&limit=${limit}`
    );
  },
};
export default studentApi;
