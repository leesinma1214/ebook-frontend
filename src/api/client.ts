import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.98.2:8989",
  // baseURL: "https://ebook-platform.onrender.com",
});

client.interceptors.request.use(function (config) {
  config.withCredentials = true;

  return config;
});

export default client;