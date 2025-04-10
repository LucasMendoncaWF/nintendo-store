import { create } from 'zustand';

interface UserData {
  userToken: string;
  name: string;
  email: string;
  birthday_stamp: number,
  country: string,
}

type UserStore = {
  userData: UserData | null;
  isLoginModalOpen: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  toggleLoginModal: (value: boolean) => void;
  isLoggedIn: boolean;
}

export const useUserStore = create<UserStore>((set) => ({
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
}));