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
};
export default studentApi;
