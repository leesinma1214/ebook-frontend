import axios from "axios";

let baseURL = "https://ebook-platform.onrender.com";
if (import.meta.env.MODE === "development"  ) {
  baseURL = "http://192.168.98.2:8989";
}

const client = axios.create({
  baseURL,
});

client.interceptors.request.use(function (config) {
  config.withCredentials = true;

  return config;
});

export default client;