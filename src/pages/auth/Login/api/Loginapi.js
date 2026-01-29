import axios from "axios";
import { API_URL } from "../../../../Config.jsx";

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
    console.error("로그인 실패:", error);
    throw error;
  }
};
