import axios from 'axios';

import {API_URL} from '../../Config';

// const API_URL = '/api/admin/shop'; // 백엔드 API 기본 주소
let pending = {};
let timer = null;

// 공통 헤더 설정 함수 (매번 호출하기 번거로우면 axios.create를 쓰는 게 좋습니다)
const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createAdminShopSlice = (set, get) => ({
    items: [],
    purchaseHistory: [],

    // 1. 초기 데이터 로드: 백엔드에서 모든 아이템 가져오기
    fetchItems: async (companyId) => {
        // 1. 아직 로그인 로직이 없으므로, 전달받은 id가 없으면 가상의 1번을 사용
        const targetId = companyId || 11;

        set({ isLoading: true });
        try {
            // 2. 가상의 targetId를 쿼리 스트링으로 전달
            const res = await axios.get(`${API_URL}/api/admin/shop/items`, {
                params: { companyId: targetId }, // axios의 params 옵션을 쓰면 ?companyId=11 로 자동 변환됨
                headers: getAuthHeader() // 헤더 추가
            });

            console.log("📡 서버 응답 전체:", res);
            console.log("📦 실제 데이터 배열:", res.data);
            console.log(`✅ 회사 ID [${targetId}] 기프티콘 로드 완료:`, res.data);
            set({ items: Array.isArray(res.data) ? res.data : [], isLoading: false });
        } catch (error) {
            console.error("❌ 데이터 로드 실패:", error);
            set({ items: [], isLoading: false });
        }
    },

    // 2. 개별 아이템 활성 상태 토글
    toggleItemStatus: async (id) => {
        try {

            await axios.patch(`${API_URL}/api/admin/shop/items/${id}/toggle`, {}, {
                headers: getAuthHeader()
            });

            set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, active: !item.active } : item
                ),
            }));
        } catch (error) {
            console.error("상태 변경 실패:", error);
            alert("상태를 변경하지 못했습니다.");
        }
    },

   // 3. 전체 아이템 활성화
    activateAll: async () => {
        const previousItems = get().items;
        set((state) => ({
            items: state.items.map((item) => ({ ...item, active: true })),
        }));

        try {
            await axios.post(`${API_URL}/api/admin/shop/items/activate-all`, {}, {
                headers: getAuthHeader() // 👈 헤더 추가
            });
        } catch (error) {
            set({ items: previousItems });
            alert("전체 활성화 실패!");
        }
    },

    // 4. 전체 아이템 비활성화
    deactivateAll: async () => {
        const previousItems = get().items;
        set((state) => ({
            items: state.items.map((item) => ({ ...item, active: false })),
        }));

        try {
            await axios.post(`${API_URL}/api/admin/shop/items/deactivate-all`, {}, {
                headers: getAuthHeader() // 👈 헤더 추가
            });
        } catch (error) {
            set({ items: previousItems });
            alert("전체 비활성화 실패!");
        }
    },

    // 5. 아이템 재고 수량 업데이트
    updateItemQuantity: (id, quantity) => {
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ),
        }));

        pending[id] = quantity;

        clearTimeout(timer);
        timer = setTimeout(async () => {
            const entries = Object.entries(pending);
            pending = {};
            for (const [itemId, qty] of entries) {
                try {
                    // PUT 요청: 세 번째 인자에 헤더 추가
                    await axios.put(`${API_URL}/api/admin/shop/items/${itemId}/${qty}`, {}, {
                        headers: getAuthHeader() // 👈 헤더 추가
                    });
                } catch (error) {
                    console.error(`${itemId} 업데이트 실패`, error);
                }
            }
        }, 500);
    },
});