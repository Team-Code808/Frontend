import { create } from 'zustand';
import { createAuthSlice } from './slices/createAuthSlice';
import { createAdminShopSlice } from './slices/createAdminShopSlice';
import { createEmployeeShop } from './slices/createEmployeeShop';
import { createUiSlice } from './slices/createUiSlice';
import { createAttendanceSlice } from './slices/createAttendanceSlice';
// 1. 알림 슬라이스 임포트
import { createNotificationSlice } from './slices/createNotificationSlice';

const useStore = create((set, get) => ({
    ...createAuthSlice(set, get),
    ...createAdminShopSlice(set, get),
    ...createEmployeeShop(set, get),
    ...createUiSlice(set, get),
    ...createAttendanceSlice(set, get),
    // 2. 알림 기능 확장
    ...createNotificationSlice(set, get),
}));

export default useStore;