import axiosClient from "./axiosClient";
const baseUrl = "/lecturer";
const lecturerApi = {
  createAccountsLecturer: (data) => {
    return axiosClient.post(baseUrl + "/bulk-create-lecturer", data);
  },
  createSingleAccountLecturer: (data) => {
    return axiosClient.post(baseUrl + "/create-lecturer", data);
  },
  getAll: (page, limit) => {
    return axiosClient.get(`${baseUrl}/get-all?page=${page}&limit=${limit}`);
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
  createTopics: (data) => {
    return axiosClient.post(baseUrl + "/create-topic", data);
  },
};
export default lecturerApi;
