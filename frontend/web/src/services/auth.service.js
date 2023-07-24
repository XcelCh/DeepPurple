import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8082/api/auth/";

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {

      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));

        
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");

  const url = localStorage.getItem("profilepic");
  URL.revokeObjectURL(url);
  localStorage.removeItem("profilepic");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;