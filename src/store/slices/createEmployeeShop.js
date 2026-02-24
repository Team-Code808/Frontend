
import apiClient from "../../api/axios";

// const getAuthHeader = () => {
//   const token = localStorage.getItem("authToken");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

export const createEmployeeShop = (set, get) => ({
  mallData: {
    currentPoint: 0,
    missions: [],
    shopItems: []
  },
  loading: false,

  purchaseHistory: [],

  purchasePagination: {
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    isLast: true,
  },
  // 1. 포인트몰 데이터 로드 로그 추가
  fetchPointMallData: async (userId) => {
    try {
      set({ loading: true });

      const user = get().user;
      const companyId = user?.companyId;


      const url = `/employee/shop/${userId}`;

      // 요청 정보 로깅
      console.log(
        `%c🚀 GET 요청 시도: ${url}`,
        "color: #2196F3; font-weight: bold"
      );


      const response = await apiClient.get(url, {
        params: { companyId: companyId } // ?companyId=11 형태로 전송됨
      });

      console.log(
        "%c✅ 데이터 로드 성공:",
        "color: #4CAF50; font-weight: bold",
        response.data
      );

      if (response.data) {
        set({ mallData: response.data });
      }
    } catch (error) {
      console.error(
        "%c❌ 데이터 로드 실패:",
        "color: #F44336; font-weight: bold",
        error.response || error
      );
    } finally {
      set({ loading: false });
    }
  },

  // 2. 미션 완료 처리 (새로 추가됨 🚀)
  completeMission: async (missionId, userId) => {
    const url = `/employee/shop/mission/complete`;
    const payload = { missionId, userId };
    // const headers = getAuthHeader();

    try {
      console.log(
        `%c🎁 미션 완료 요청: ${url}`,
        "color: #9C27B0; font-weight: bold"
      );
      console.table(payload);

      const response = await apiClient.post(url, payload);

      console.log(
        "%c✅ 미션 보상 지급 완료:",
        "color: #4CAF50; font-weight: bold",
        response.data
      );

      // 로컬 상태 업데이트: 포인트 증가 및 해당 미션 상태 'Y'로 변경
      set((state) => ({
        mallData: {
          ...state.mallData,
          // 서버에서 최신 포인트를 내려주면 그것을 쓰고, 없으면 기존 값에 보상 합산
          currentPoint:
            response.data.currentPoint || state.mallData.currentPoint,
          missions: state.mallData.missions.map((m) =>
            m.id === missionId ? { ...m, status: "Y" } : m
          ),
        },
      }));

      return response.data;
    } catch (error) {
      console.error(
        "%c❌ 미션 처리 실패:",
        "color: #F44336; font-weight: bold",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // 6. 구매 처리 로그 추가
  addPurchaseHistory: async (
    itemId,
    userId,
    userName,
    itemName,
    itemPrice,
    itemImg
  ) => {
    const priceNumber = parseInt(itemPrice.toString().replace(/,/g, ""));
    const url = `/employee/shop/purchase`;
    const payload = { itemId, userId, price: priceNumber };
    // const headers = getAuthHeader();

    try {
      // 요청 정보 로깅
      console.log(
        `%c🛒 구매 POST 요청 시도: ${url}`,
        "color: #FF9800; font-weight: bold"
      );
      console.table({
        상품명: itemName,
        상품ID: itemId,
        사용자ID: userId,
        결제금액: priceNumber,
      });
      // console.log("Request Headers:", headers);

      const response = await apiClient.post(url, payload);

      console.log(
        "%c🎉 구매 완료 응답:",
        "color: #4CAF50; font-weight: bold",
        response.data
      );

      const newPurchase = {
        id: response.data.orderId || Date.now(),
        itemId,
        userId,
        userName,
        itemName,
        itemPrice,
        itemImg,
        purchaseDate: new Date().toISOString(),
      };

      set((state) => ({
        purchaseHistory: [newPurchase, ...state.purchaseHistory],
        mallData: {
          ...state.mallData,
          currentPoint: state.mallData.currentPoint - priceNumber,
          shopItems: state.mallData.shopItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.max(0, (item.quantity || 0) - 1) }
              : item
          ),
        },
      }));
    } catch (error) {
      console.error(
        "%c🚫 구매 실패:",
        "color: #F44336; font-weight: bold",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // createEmployeeShop.js
  fetchAllPurchaseHistory: async (page = 0, size = 6) => {
    try {
      set({ loading: true });

      const user = get().user;
      const companyId = user?.companyId;

      const url = `/admin/shop/history/all`;

      console.log(`%c🌐 회사[${companyId}] 내역 요청 (Page: ${page})`, 'color: #009688; font-weight: bold');

      const response = await apiClient.get(url, {
        params: {
          companyId: companyId,
          page: page,   // 현재 요청 페이지
          size: size,   // 한 페이지당 개수
          sort: 'createDate,desc' // 최신순 정렬 명시 (선택)
        }
      });

      // 중요: Spring Page 객체는 실제 데이터를 'content' 필드에 담고 있습니다.
      set({
        purchaseHistory: response.data.content, // 배열 데이터만 추출
        purchasePagination: {                           // 페이징 정보 저장
          currentPage: response.data.number,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          isLast: response.data.last
        }
      });

      console.log('✅ 내역 로드 성공:', response.data.content.length, '건');
    } catch (error) {
      console.error("❌ 내역 로드 실패:", error);
    } finally {
      set({ loading: false });
    }
  },

  // 7. 실시간 상점 아이템 업데이트 (WebSocket/SSE용)
  updateShopItems: (items) => {
    set((state) => ({
      mallData: {
        ...state.mallData,
        shopItems: items
      }
    }));
  },
});
