import axios from "axios";
import { API_URL } from "../Config";

const authClient = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export const refreshAccessToken = async () => {
  const response = await authClient.post("/auth/refresh");
  // console.log("AccessToken 재발급 API");
  return response.data.accessToken;
};
