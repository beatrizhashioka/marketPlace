import axios from "axios";

import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3333" //uso do axios
});
//Pega o token
api.interceptors.request.use(async config => {
  const token = getToken();
  console.log(config, token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; //token- autorização
  }
  return config;
});

export default api;
