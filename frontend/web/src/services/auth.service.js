import axios from "axios";
import { BASE_URL } from "../pages/config";

const API_URL = `{BASE_URL}/api/auth/`;

// const API_URL = "http://localhost:8082/api/auth/";

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    // .then( async (response) => {
    .then((response) => { 

      console.log(response);
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));


      //   await fetch ("http://localhost:8082/profile/getProfilePic", {
      //       headers: {Authorization: 'Bearer ' +response.data.accessToken}
      //     })
      //     .then((response) => {
      //       if (response.ok) {
      //         return response.blob();
      //       }
      //     })
      //     .then((blob) => {
            
      //       console.log('set');
      //       sessionStorage.setItem("profilepic", URL.createObjectURL(blob));
      //       // navigate('/');
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     })

      }

      return response.data;
    });
};

const logout = () => {
  sessionStorage.removeItem("user");

  // const url = sessionStorage.getItem("profilepic");
  // URL.revokeObjectURL(url);
  // sessionStorage.removeItem("profilepic");
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