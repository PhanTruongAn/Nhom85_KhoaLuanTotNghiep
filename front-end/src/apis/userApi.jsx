import axiosClient from "./axiosClient";
const baseUrl = "/user/";
const userApi = {
  login: (userData) => {
    return axiosClient.post("/login", userData);
  },
  fetchToken: () => {
    return axiosClient.get("/fetch-token");
  },
  logOut: () => {
    return axiosClient.post("/log-out");
  },
  createAccountsStudent: (data) => {
    return axiosClient.post("/bulk-create-student", data);
  },
  createSingleAccountStudent: (data) => {
    return axiosClient.post("/create-student", data);
  },
  createAccountsLecturer: (data) => {
    return axiosClient.post("/bulk-create-lecturer", data);
  },
  createSingleAccountLecturer: (data) => {
    return axiosClient.post("/create-lecturer", data);
  },
};
export default userApi;
