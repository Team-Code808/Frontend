import axios from 'axios';

const API_URL = '/api/employee/shop'; // 백엔드 API 기본 주소

export const createEmployeeShop = (set, get) => ({
    items: [],
    purchaseHistory: [],


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

        
        } catch (error) {
            console.error("구매 실패:", error);
            // 에러 메시지가 서버에서 온 경우(포인트 부족 등) 출력
            throw error;
           
        }
    },
});