import { create } from 'zustand';
import { createAuthSlice } from './slices/createAuthSlice';
import { createUiSlice } from './slices/createUiSlice';
import { createAttendanceSlice } from './slices/createAttendanceSlice';
import { createShopSlice } from './slices/createShopSlice';

const useStore = create((set, get) => ({
    ...createAuthSlice(set, get),
    ...createShopSlice(set, get),
    ...createUiSlice(set, get),
    ...createAttendanceSlice(set, get),
}));

export default useStore;
