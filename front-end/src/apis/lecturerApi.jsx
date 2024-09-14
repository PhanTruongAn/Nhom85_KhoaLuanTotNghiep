import axiosClient from "./axiosClient";
const baseUrl = "/lecturer";
const lecturerApi = {
  createAccountsLecturer: (data) => {
    return axiosClient.post(baseUrl + "/bulk-create-lecturer", data);
  },
  createSingleAccountLecturer: (data) => {
    return axiosClient.post(baseUrl + "/create-lecturer", data);
  },
};
export default lecturerApi;
