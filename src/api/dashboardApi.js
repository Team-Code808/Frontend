import apiClient from './axios';

export const startCoolDown = async (payload) => {
  const response = await apiClient.post('/employee/dashboard/cooldown', payload);
  return response.data;
};