import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://54.180.94.206:8080",
});
