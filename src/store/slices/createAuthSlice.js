import { decodeToken } from "../../utils/jwtUtils";

export const createAuthSlice = (set) => ({
  user: null,
  isAdminMode: false,

  setUser: (user) => set({ user }),
  setIsAdminMode: (mode) => set({ isAdminMode: mode }),

  login: (user) => {
    const role =
      user.role || (user.token ? decodeToken(user.token)?.role : null);
    const isAdmin = role === "ADMIN";

    if (user.token) {
      localStorage.setItem("authToken", user.token);
    }

    console.log("User:", user);
    console.log("Role:", role);
    console.log("Is Admin:", isAdmin);

    set({
      user: {
        ...user,
        role: role,
        memberId: user.memberId || user.id, // memberId 저장
      },
      isAdminMode: isAdmin,
    });
  },

  logout: () => {
    localStorage.removeItem("authToken");

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
