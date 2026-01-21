import { create } from 'zustand';
import { createAuthSlice } from './slices/createAuthSlice';
import { createUiSlice } from './slices/createUiSlice';

const useStore = create((set, get) => ({
    ...createAuthSlice(set, get),
    ...createUiSlice(set, get),
}));

export default useStore;
