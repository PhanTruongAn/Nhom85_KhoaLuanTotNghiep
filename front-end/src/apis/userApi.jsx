import axiosClient from "./axiosClient";
const baseUrl = "/user/";
const userApi = {
  login: (userData) => {
    return axiosClient.post("/login", userData);
  },
  fetchToken: () => {
    return axiosClient.get("/fetch-token");
  },
};
export default userApi;
