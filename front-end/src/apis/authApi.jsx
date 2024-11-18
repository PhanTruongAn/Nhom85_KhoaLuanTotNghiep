import axiosClient from "./axiosClient";
const authApi = {
  login: (userData) => {
    return axiosClient.post("/api/login", userData);
  },
  fetchToken: () => {
    return axiosClient.get("/api/fetch-token");
  },
  logOut: () => {
    return axiosClient.post("/api/log-out");
  },
  findAccount: (data) => {
    return axiosClient.post("/api/find-account", data);
  },
  sendEmail: (data) => {
    return axiosClient.put("/api/send-email", data);
  },
};
export default authApi;
