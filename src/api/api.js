import axios from "axios";
import envConstant from "../utils/envConstant";
const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: envConstant.API_URL,
  timeout: 5000,
  headers: {
    Authorization: token ? `Bearer ${token}`: "",
  },
});
