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
  findAccount: (data) => {
    return axiosClient.post("/find-account", data);
  },
  sendEmail: (data) => {
    return axiosClient.put("/send-email", data);
  },
};
export default authApi;
