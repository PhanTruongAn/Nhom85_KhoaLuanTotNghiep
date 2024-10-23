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
  deleteGroupStudent: (data) => {
    return axiosClient.delete(baseUrl + "/delete-group-student", { data });
  },
  updateById: (data) => {
    return axiosClient.put(baseUrl + "/update-permission", data);
  },
  findByDescription: (search) => {
    return axiosClient.get(baseUrl + `/find-permission?search=${search}`);
  },
  getRolePermissions: (data) => {
    return axiosClient.post(`${baseUrl}/get-role-permissions`, data);
  },
  assignPermissions: (data) => {
    return axiosClient.post(`${baseUrl}/assign-permissions`, data);
  },
  createGroupsStudent: (data) => {
    return axiosClient.post(`${baseUrl}/create-groups-student`, data);
  },
  getGroupsStudent: (page, limit) => {
    return axiosClient.get(
      `${baseUrl}/get-groups-student?page=${page}&limit=${limit}`
    );
  },
  countStudent: () => {
    return axiosClient.get(`${baseUrl}/count-student`);
  },
  getTerms: () => {
    return axiosClient.get(`${baseUrl}/terms`);
  },
  createTerm: (data) => {
    return axiosClient.post(`${baseUrl}/create-term`, data);
  },
  updateTerm: (data) => {
    return axiosClient.put(baseUrl + "/update-term", data);
  },
  createMajor: (data) => {
    return axiosClient.post(`${baseUrl}/create-major`, data);
  },
  getMajors: () => {
    return axiosClient.get(baseUrl + "/majors");
  },
  deleteMajor: (data) => {
    return axiosClient.delete(baseUrl + "/delete-major", { data });
  },
  updateMajor: (data) => {
    return axiosClient.put(baseUrl + "/update-major", data);
  },
};
export default managerApi;
