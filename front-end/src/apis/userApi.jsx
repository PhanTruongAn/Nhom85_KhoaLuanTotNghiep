import axiosClient from "./axiosClient";
const baseUrl = "/user/";
const userApi = {
  login: (userData) => {
    return axiosClient.post("/login", userData);
  },
};
export default userApi;
