import axios from 'axios';
import { API_URL } from '../Config';
import apiClient from './axios';
import { tokenManager } from '../utils/tokenManager';

/**
 * 명함 이미지 추출 (multipart, 인증 필요)
 */
export const extractBusinessCard = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const token = tokenManager.getAccessToken();
  const response = await axios.post(`${API_URL}/api/business-card/extract`, formData, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      // Content-Type 생략 → multipart/form-data + boundary 자동 설정
    },
  });
  const data = response.data?.data ?? response.data;
  return data;
};

/**
 * 명함 연락처 등록 (직원/외부인/협력사 + 팀 선택)
 * @param {Object} body - { registerType: 'EMPLOYEE'|'EXTERNAL'|'PARTNER', departmentId?, name, companyName?, title?, phone?, mobile?, email?, address?, fax?, website? }
 */
export const registerBusinessCard = async (body) => {
  const response = await apiClient.post('/business-card/register', body);
  return response.data?.data ?? response.data;
};

/**
 * 회사별 명함 연락처 목록
 */
export const getBusinessCardContacts = async () => {
  const response = await apiClient.get('/business-card/contacts');
  return response.data?.data ?? response.data ?? [];
};