import { User } from '@/types/user';
import { create, UseBoundStore, StoreApi } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AppStoreType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAppStore: UseBoundStore<StoreApi<AppStoreType>> = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'AppStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
