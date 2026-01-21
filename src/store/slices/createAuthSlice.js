import { UserRole } from '../../constants/types';

export const createAuthSlice = (set) => ({
    user: null,
    isAdminMode: false,

    setUser: (user) => set({ user }),
    setIsAdminMode: (mode) => set({ isAdminMode: mode }),

    // 로그인 로직을 처리하는 헬퍼 액션
    login: (user) => {
        const isAdmin = user.role === UserRole.ADMIN;
        set({ user, isAdminMode: isAdmin });
    },

    // 로그아웃을 처리하는 헬퍼 액션 (모든 상태 초기화로 업데이트됨)
    logout: () => set({
        user: null,
        isAdminMode: false,
        attendance: { isClockedIn: false, isAway: false, isCoolDown: false, coolDownStartTime: null },
        ui: { departmentFilter: '전체' }
    }),
});
