import apiClient from './axios';

export const chatApi = {
  /**
   * 챗봇 메시지 전송
   * @param {string} message - 사용자 입력
   * @returns {Promise<{ success: boolean, data?: { reply: string }, message?: string }>}
   */
  async sendMessage(message) {
    const { data } = await apiClient.post('/chat', { message });
    return data;
  },
};
