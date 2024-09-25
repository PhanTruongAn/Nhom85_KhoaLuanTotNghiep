import axiosClient from "./axiosClient";
const baseUrl = "/manager";
const managerApi = {
  getAllPermission: () => {
    return axiosClient.get(`${baseUrl}/get-all-permission`);
  },
  create: (data) => {
    return axiosClient.post(baseUrl + "/create-permission", data);
  },
  deleteById: (data) => {
    return axiosClient.delete(baseUrl + "/delete-permission", { data });
  },
  updateById: (data) => {
    return axiosClient.put(baseUrl + "/update-permission", data);
  },
  findByDescription: (input) => {
    return axiosClient.get(baseUrl + `/find-permission?input=${input}`);
  },
};
export default managerApi;
