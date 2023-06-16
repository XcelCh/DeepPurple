/*

*** NOT USED YET, THIS IS TO ACCESS AUTHORIZED FILE ***



import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/";

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getModeratorBoard,
  getAdminBoard,
};

export default new UserService();

*/