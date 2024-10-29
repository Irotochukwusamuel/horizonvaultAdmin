import { AppwriteUser, User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create<
    { user: AppwriteUser | null; setUser: (user: AppwriteUser) => void },
    [['zustand/persist', { user: AppwriteUser | null; setUser: (user: AppwriteUser) => void }]]
>(
    persist(
        (set) => ({
            user: null as AppwriteUser | null,
            setUser: (user: AppwriteUser) => set(() => ({ user })),
        }),
        {
            name: 'user', // name of the item in the storage (must be unique)
        }
    )
);
