import axios from "axios";

export const workflowBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
});
