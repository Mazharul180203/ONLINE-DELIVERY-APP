import { create } from 'zustand';

const useCaptainStore = create((set) => ({
    captainData: null,
    setCaptainData: (data) => set({ captainData: data }),
}));

export default useCaptainStore;