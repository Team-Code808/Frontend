import axios from "axios";
import { API_URL } from "../../../../Config.jsx";
import apiClient from "../../../../api/axios";

/** 회원가입 시 명함 이미지 추출 (비로그인 허용) */
export const extractBusinessCard = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(`${API_URL}/api/business-card/extract`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const basicSignup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      throw new Error("이미 존재하는 이메일입니다.");
    }
    console.error("기본 회원가입 실패:", error);
    throw error;
  }
};

export const registerCompany = async (data) => {
  try {
    const response = await apiClient.post(`/companies/register`, {
      companyName: data.companyName,
      companyCode: data.companyCode,
      category: data.category,
      minValue: data.minValue,
      maxValue: data.maxValue,
    });
    return response.data;
  } catch (error) {
    console.error("관리자 회원가입 실패:", error);
    throw error;
  }
};

export const joinCompany = async (data) => {
  try {
    const response = await apiClient.post(`/companies/join`, {
      companyCode: data.companyCode,
      departmentId: data.departmentId,
      rankId: data.rankId,
    });
    return response.data;
  } catch (error) {
    console.error("직원 회원가입 실패:", error);
    throw error;
  }
};

export const verifyCompanyCode = async (data) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/companies/by-code/${data.companyCode}`
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("존재하지 않는 회사 코드입니다.");
    }
    console.error("회사 코드 검증 실패:", error);
    throw error;
  }
};

export const generateCompanyCode = async () => {
  const response = await axios.get(`${API_URL}/api/companies/genderate-code`);
  return response.data;
};
