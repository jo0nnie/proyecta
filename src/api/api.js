import axios from "axios";
import envConstant from "../utils/envConstant";

export const api = axios.create({
  baseURL: envConstant.API_URL,
  timeout: 5000,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

