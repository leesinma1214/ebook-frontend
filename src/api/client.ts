import axios from "axios";

const client = axios.create({
  baseURL: "http://172.28.161.251:8989",
});

client.interceptors.request.use(function (config) {
  config.withCredentials = true;

  return config;
});

export default client;