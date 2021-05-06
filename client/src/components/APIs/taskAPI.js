import axios from "axios";
import qs from "qs";

const baseUrl = "http://localhost:5000/api/v1";
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

const CategoriesAPI = {
  deleteTaskById: (id) => {
    return axiosInstance.delete(`/task/${id}`);
  },
  createTask: (task, user) => {
    return axiosInstance.post(
      "/task/create",
      qs.stringify({
        task: task,
        userid: user._id,
      })
    );
  },
  editTask: (id, task) => {
    return axiosInstance.put(
      `/task/${id}`,
      qs.stringify({
        task: task,
      })
    );
  },
  editTaskCompletion: (id, task) => {
    return axiosInstance.put(
      `/taskcomplete/${id}`,
      qs.stringify({
        task: task,
      })
    );
  },
};

export default CategoriesAPI;
