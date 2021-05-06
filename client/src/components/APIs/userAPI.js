/* eslint-disable no-unused-vars */
import axios from "axios";
import qs from "qs";

const baseUrl = "/api/v1";
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
const UsersAPI = {
  registerUser: (user) => {
    return axiosInstance.post(
      "/users/register",
      qs.stringify({
        user: user,
      })
    );
  },
  loginUser: (user) => {
    return axiosInstance.post(
      "/users/login",
      qs.stringify({
        user: user,
      })
    );
  }
};

export default UsersAPI;
