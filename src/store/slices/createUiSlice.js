export const createUiSlice = (set) => ({
    ui: {
        departmentFilter: '전체',
    },

    setDepartmentFilter: (filter) => set((state) => ({ ui: { ...state.ui, departmentFilter: filter } })),
});
