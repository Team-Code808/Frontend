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
    const role =
      user.role || (user.token ? decodeToken(user.token)?.role : null);
    const isAdmin = role === "ADMIN";

    set({
      user: {
        ...user,
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
