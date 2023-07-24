import axios from "axios";

const API_URL = "http://localhost:8082/api/auth/";

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then( async (response) => {

      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));


        await fetch ("http://localhost:8082/profile/getProfilePic", {
            headers: {Authorization: 'Bearer ' +response.data.accessToken}
          })
          .then((response) => {
            if (response.ok) {
              return response.blob();
            }
          })
          .then((blob) => {
            
            console.log('set');
            localStorage.setItem("profilepic", URL.createObjectURL(blob));
            // navigate('/');
          })
          .catch((error) => {
            console.error(error);
          })

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