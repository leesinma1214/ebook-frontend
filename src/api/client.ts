import axios from "axios";

const client = axios.create({
  baseURL: "http://172.28.161.251:8989",
});

export default client;