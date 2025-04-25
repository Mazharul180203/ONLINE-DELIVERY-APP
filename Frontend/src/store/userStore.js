import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: {
        firstName: '',
        lastName: '',
    },
    setUser: (firstName, lastName) => set({ user: { firstName, lastName } }),
}));

export default useUserStore;
