import { decodeToken } from "../../utils/jwtUtils";
import { tokenManager } from "../../utils/tokenManager";

export const createAuthSlice = (set) => ({
  user: null,
  isAdminMode: false,
  isInitializing: true,

  setUser: (user) => set({ user }),
  setIsAdminMode: (mode) => set({ isAdminMode: mode }),
  setInitializing: (status) => set({ isInitializing: status }),

  login: (user) => {
    const decoded = user.token ? decodeToken(user.token) : null;
    const role =
      user.role || (user.token ? decodeToken(user.token)?.role : null);
   
       const companyId = user.companyId || decoded?.companyId;
      const isAdmin = role === "ADMIN";

    // console.log("=== 로그인 데이터 확인 ===");
    // console.log("원본 user 객체:", user);
    // console.log("디코딩된 토큰:", decoded);
    // console.log("최종 추출된 companyId:", companyId);


    set({
      user: {
        ...user,
        companyId: companyId,
        role: role,
        memberId: user.memberId || user.id,
      },
      isAdminMode: isAdmin,
    });
  },

  logout: () => {
    tokenManager.clearAccessToken();

    set({
      user: null,
      isAdminMode: false,
      attendance: {
        isClockedIn: false,
        isAway: false,
        isCoolDown: false,
        coolDownStartTime: null,
      },
      ui: { departmentFilter: "전체" },
    });

    window.location.href = "/login";
  },
});
