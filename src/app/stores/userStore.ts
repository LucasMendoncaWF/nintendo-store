import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserData {
  userToken: string;
  name: string;
  email: string;
  birthday_stamp: number;
  country: string;
  avatar?: string;
}

type UserStore = {
  userData: UserData | null;
  isLoginModalOpen: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  toggleLoginModal: (value: boolean) => void;
  isLoggedIn: boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      isLoginModalOpen: false,
      isLoggedIn: false,
      login: (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        set({userData, isLoggedIn: true});
      },
      logout: () => {
        localStorage.removeItem('userData');
        set({userData: null, isLoggedIn: false});
      },
      toggleLoginModal: (isLoginModalOpen) => set({isLoginModalOpen})
    }),
    {
      name: 'nintendo-user-data',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)