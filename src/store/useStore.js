import { create } from 'zustand';
import { createAuthSlice } from './slices/createAuthSlice';
import { createShopSlice } from './slices/createShopSlice';

const useStore = create((set, get) => ({
    ...createAuthSlice(set, get),
    ...createShopSlice(set, get)
}));

export default useStore;
