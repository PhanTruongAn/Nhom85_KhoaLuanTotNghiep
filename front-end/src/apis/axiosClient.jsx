import axios from "axios";
import history from "../utils/history";
import { toast } from "react-toastify";
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "content-type": "application/json",
  },
  // paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});
// axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status == 401) {
          toast.error("Bạn chưa đăng nhập hoặc phiên đã hết hạn!");
          history.replace("/login");
        }
      }
    }
    return error.response.data;
    // return Promise.reject(error);
  }
);
export default axiosClient;
