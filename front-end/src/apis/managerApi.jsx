import axiosClient from "./axiosClient";
const baseUrl = "/manager";
const managerApi = {
  getAllPermission: () => {
    return axiosClient.get(`${baseUrl}/get-all-permission`);
  },
};
export default managerApi;
