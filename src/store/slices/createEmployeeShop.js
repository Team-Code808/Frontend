import axios from 'axios';
import { API_URL } from '../../Config';


const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createEmployeeShop = (set, get) => ({
    mallData: {
        currentPoint: 0,
        missions: [],
        shopItems: []
    },
    loading: false,
    purchaseHistory: [],

    // 1. 포인트몰 데이터 로드 로그 추가
    fetchPointMallData: async (userId) => {
        try {
            set({ loading: true });

            const headers = getAuthHeader();
            const url = `${API_URL}/api/employee/shop/${userId}`;

            // 요청 정보 로깅
            console.log(`%c🚀 GET 요청 시도: ${url}`, 'color: #2196F3; font-weight: bold');
            console.log('Headers:', headers);

            const response = await axios.get(url, { headers });
            
            console.log('%c✅ 데이터 로드 성공:', 'color: #4CAF50; font-weight: bold', response.data);

            if (response.data) {
                set({ mallData: response.data });
            }
        } catch (error) {
            console.error("%c❌ 데이터 로드 실패:", 'color: #F44336; font-weight: bold', error.response || error);
        } finally {
            set({ loading: false });
        }
    },


    // 2. 미션 완료 처리 (새로 추가됨 🚀)
    completeMission: async (missionId, userId) => {
        const url = `${API_URL}/api/employee/shop/mission/complete`;
        const payload = { missionId, userId };
        const headers = getAuthHeader();

        try {
            console.log(`%c🎁 미션 완료 요청: ${url}`, 'color: #9C27B0; font-weight: bold');
            console.table(payload);

            const response = await axios.post(url, payload, { headers });

            console.log('%c✅ 미션 보상 지급 완료:', 'color: #4CAF50; font-weight: bold', response.data);

            // 로컬 상태 업데이트: 포인트 증가 및 해당 미션 상태 'Y'로 변경
            set((state) => ({
                mallData: {
                    ...state.mallData,
                    // 서버에서 최신 포인트를 내려주면 그것을 쓰고, 없으면 기존 값에 보상 합산
                    currentPoint: response.data.currentPoint || state.mallData.currentPoint,
                    missions: state.mallData.missions.map((m) =>
                        m.id === missionId ? { ...m, status: 'Y' } : m
                    )
                }
            }));
            
            return response.data;
        } catch (error) {
            console.error("%c❌ 미션 처리 실패:", 'color: #F44336; font-weight: bold', error.response?.data || error.message);
            throw error;
        }
    },

    // 6. 구매 처리 로그 추가
    addPurchaseHistory: async (itemId, userId, userName, itemName, itemPrice, itemImg) => {
        const priceNumber = parseInt(itemPrice.toString().replace(/,/g, ''));
        const url = `${API_URL}/api/employee/shop/purchase`;
        const payload = { itemId, userId, price: priceNumber };
        const headers = getAuthHeader();

        try {
            // 요청 정보 로깅
            console.log(`%c🛒 구매 POST 요청 시도: ${url}`, 'color: #FF9800; font-weight: bold');
            console.table({
                "상품명": itemName,
                "상품ID": itemId,
                "사용자ID": userId,
                "결제금액": priceNumber
            });
            console.log('Request Headers:', headers);

            const response = await axios.post(url, payload, { headers });

            console.log('%c🎉 구매 완료 응답:', 'color: #4CAF50; font-weight: bold', response.data);

            const newPurchase = {
                id: response.data.orderId || Date.now(),
                itemId, userId, userName, itemName, itemPrice, itemImg,
                purchaseDate: new Date().toISOString(),
            };

            set((state) => ({
                purchaseHistory: [newPurchase, ...state.purchaseHistory],
                mallData: {
                    ...state.mallData,
                    currentPoint: state.mallData.currentPoint - priceNumber,
                    shopItems: state.mallData.shopItems.map((item) =>
                        item.id === itemId ? { ...item, quantity: Math.max(0, (item.quantity || 0) - 1) } : item
                    )
                }
            }));

        } catch (error) {
            console.error("%c🚫 구매 실패:", 'color: #F44336; font-weight: bold', error.response?.data || error.message);
            throw error;
        }
    },

    // createEmployeeShop.js
    fetchAllPurchaseHistory: async () => {
        try {
            set({ loading: true });
            const headers = getAuthHeader();
            // 모든 내역을 가져오는 엔드포인트
            const url = `${API_URL}/api/employee/shop/history/all`;

            console.log(`%c🌐 전체 구매 내역 요청: ${url}`, 'color: #009688; font-weight: bold');

            const response = await axios.get(url, { headers });
            
            // 스토어의 purchaseHistory 상태 업데이트
            set({ purchaseHistory: response.data });
            console.log('✅ 전체 내역 로드 성공:', response.data.length, '건');
        } catch (error) {
            console.error("❌ 전체 내역 로드 실패:", error);
        } finally {
            set({ loading: false });
        }
    },

});