import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.43.134:80/api",
});

export default api;
