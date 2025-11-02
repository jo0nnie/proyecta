import axios from "axios";
import envConstant from "../utils/envConstant";
import { useSelector } from "react-redux";


const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: envConstant.API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
