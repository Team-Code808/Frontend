import axios from 'axios';

const API_URL = '/api/shop'; // 백엔드 API 기본 주소

export const createShopSlice = (set, get) => ({
    items: [],
    purchaseHistory: [],

    // 1. 초기 데이터 로드: 백엔드에서 모든 아이템 가져오기
    fetchItems: async () => {
        set({ isLoading: true });
        try {
            const res = await axios.get(`${API_URL}/items`);

            console.log("✅ 서버에서 받은 데이터:", res.data);
            // 서버 응답이 200이고 데이터가 배열일 때만 저장

            set({ items: Array.isArray(res.data) ? res.data : [], isLoading: false });
        } catch (error) {
            console.error("❌ 데이터 로드 실패:", error);
            set({ items: [], isLoading: false }); // 에러 시 빈 배열로 설정하여 .map 에러 방지
        }
    },

    // 2. 개별 아이템 활성 상태 토글
    toggleItemStatus: async (id) => {
        try {

            await axios.patch(`${API_URL}/items/${id}/toggle`);

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
        // 1. 먼저 화면부터 바꿉니다 (사용자 경험 최우선)
        const previousItems = get().items; // 에러 대비 백업
        set((state) => ({
            items: state.items.map((item) => ({ ...item, active: true })),
        }));

        try {
            await axios.post(`${API_URL}/items/activate-all`);
            // 성공하면 그대로 유지
        } catch (error) {
            // 2. 실패하면 원래대로 되돌립니다 (롤백)
            set({ items: previousItems });
            alert("전체 활성화 실패!");
        }
    },


    // 4. 전체 아이템 비활성화
    deactivateAll: async () => {
        // 1. 먼저 화면부터 바꿉니다 (사용자 경험 최우선)
        const previousItems = get().items; // 에러 대비 백업
        set((state) => ({
            items: state.items.map((item) => ({ ...item, active: false })),
        }));

        try {
            await axios.post(`${API_URL}/items/deactivate-all`);
            // 성공하면 그대로 유지
        } catch (error) {
            // 2. 실패하면 원래대로 되돌립니다 (롤백)
            set({ items: previousItems });
            alert("전체 활성화 실패!");
        }
    },


    // 5. 아이템 재고 수량 업데이트
    updateItemQuantity: async (id, quantity) => {
        try {
            // 서버가 URL에 변수를 원한다면 주소 뒤에 직접 붙입니다.
            await axios.put(`${API_URL}/items/${id}/${quantity}`);

            set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                ),
            }));
        } catch (error) {
            alert("수량 업데이트에 실패했습니다.");
        }
    },



    // 6. 구매 처리 (GIFT_ORDER 및 POINT_HISTORY 연동)
    addPurchaseHistory: async (itemId, userId, userName, itemName, itemPrice, itemImg) => {
        // 금액 문자열에서 콤마 제거 후 숫자로 변환
        const priceNumber = parseInt(itemPrice.toString().replace(/,/g, ''));

        try {
            // 백엔드 POST 요청: 주문 생성 및 포인트 차감은 서버 내부에서 트랜잭션으로 처리됨
            const response = await axios.post(`${API_URL}/purchase`, {
                itemId,
                userId,
                price: priceNumber
            });

            // 서버 응답에서 생성된 주문 데이터 혹은 성공 확인
            const newPurchase = {
                id: response.data.orderId || Date.now(), // 서버에서 준 ID 선호
                itemId,
                userId,
                userName,
                itemName,
                itemPrice, // 프론트 표시용 문자열 유지
                itemImg,
                purchaseDate: new Date().toISOString(),
            };

            set((state) => ({
                purchaseHistory: [newPurchase, ...state.purchaseHistory],
                // 구매 성공 후 로컬 재고도 -1 차감
                items: state.items.map((item) =>
                    item.id === itemId ? { ...item, quantity: Math.max(0, (item.quantity || 0) - 1) } : item
                ),
            }));

            alert(`${itemName} 구매가 완료되었습니다!`);
        } catch (error) {
            console.error("구매 실패:", error);
            // 에러 메시지가 서버에서 온 경우(포인트 부족 등) 출력
            const errorMsg = error.response?.data?.message || '포인트가 부족하거나 서버 오류가 발생했습니다.';
            alert(errorMsg);
        }
    },
});