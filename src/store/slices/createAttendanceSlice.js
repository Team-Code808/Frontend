export const createAttendanceSlice = (set) => ({
    attendance: {
        isClockedIn: false,
        isAway: false,
        isCoolDown: false,
        coolDownStartTime: null,
    },

    setClockIn: (status) => set((state) => ({ attendance: { ...state.attendance, isClockedIn: status } })),
    setAway: (status) => set((state) => ({ attendance: { ...state.attendance, isAway: status } })),
    setCoolDown: (status) => set((state) => ({
        attendance: {
            ...state.attendance,
            isCoolDown: status,
            coolDownStartTime: status ? Date.now() : null
        }
    })),
});
