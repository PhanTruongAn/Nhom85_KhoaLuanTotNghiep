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
  findLecturer: (search) => {
    return axiosClient.get(`${baseUrl}/find-lecturer?search=${search}`);
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
};
export default lecturerApi;
