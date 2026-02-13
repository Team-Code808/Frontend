import { create } from 'zustand';
import { createAuthSlice } from './slices/createAuthSlice';
import { createAdminShopSlice } from './slices/createAdminShopSlice';
import { createEmployeeShop } from './slices/createEmployeeShop';
import { createUiSlice } from './slices/createUiSlice';
import { createAttendanceSlice } from './slices/createAttendanceSlice';
import { createNotificationSlice } from './slices/createNotificationSlice'

const useStore = create((set, get) => ({
    ...createAuthSlice(set, get),
    ...createAdminShopSlice(set, get),
    ...createEmployeeShop(set, get),
    ...createUiSlice(set, get),
    ...createAttendanceSlice(set, get),
    ...createNotificationSlice(set, get), // 추가

}));

export default useStore;
