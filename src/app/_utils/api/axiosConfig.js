import axios from "axios";

export const workflowBackend = axios.create({
  baseURL: "http://localhost:4000/api",
});
