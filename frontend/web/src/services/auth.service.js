import axios from "axios";
import { BASE_URL } from "../pages/config";

const API_URL = `${BASE_URL}/api/auth/`;

// const API_URL = "http://localhost:8082/api/auth/";

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    // .then( async (response) => {
    .then((response) => { 

      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));

      }

      return response.data;
    });
};

const logout = () => {
  sessionStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;