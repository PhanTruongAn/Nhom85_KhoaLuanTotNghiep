import axiosClient from "./axiosClient";
const authApi = {
  login: (userData) => {
    return axiosClient.post("/login", userData);
  },
  fetchToken: () => {
    return axiosClient.get("/fetch-token");
  },
  logOut: () => {
    return axiosClient.post("/log-out");
  },
};
export default authApi;
