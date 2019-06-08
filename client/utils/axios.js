import axios from "axios";
import { API_HOST } from "react-native-dotenv";
import { getToken } from "../utils/auth";

const instance = axios.create({
  baseURL: API_HOST
});

instance.interceptors.request.use(
  config => {
    if (config.baseURL === API_HOST && !config.headers.Authorization) {
      const token = getToken();
      console.log("Token is ", token);
      if (!!token) {
        config.headers.Authorization = token;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default instance;
