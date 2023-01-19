import axios from "axios";

export const axiosInstance = axios.create({
  //디테일, 로그인 : : "http://3.37.88.65:8080"
  baseURL: "http://3.38.107.133:8080",
});
