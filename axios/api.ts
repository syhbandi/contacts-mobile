import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.42.153:80/api",
});

export default api;
