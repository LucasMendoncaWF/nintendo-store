import { create } from 'zustand';

type UserStore = {
  userToken: string | null;
  isLoginModalOpen: boolean;
  login: (userToken: string) => void;
  logout: () => void;
  toggleLoginModal: (value: boolean) => void;
  isLoggedIn: boolean;
}

export const useUserStore = create<UserStore>((set) => ({
  userToken: null,
  isLoginModalOpen: false,
  isLoggedIn: false,
  login: (userToken) => set({userToken, isLoggedIn: true}),
  logout: () => set({userToken: null, isLoggedIn: false}),
  toggleLoginModal: (isLoginModalOpen) => set({isLoginModalOpen})
}));