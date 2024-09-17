import axiosClient from "./axiosClient";
const baseUrl = "/student";
const studentApi = {
  createAccountsStudent: (data) => {
    return axiosClient.post(baseUrl + "/bulk-create-student", data);
  },
  createSingleAccountStudent: (data) => {
    return axiosClient.post(baseUrl + "/create-student", data);
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
};
export default studentApi;
