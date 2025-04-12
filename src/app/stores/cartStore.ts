import { maxInCart } from 'app/constants/constants';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


type CartStore = {
  cartItems: number[];
  onClickCart: (gameId?: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      onClickCart(gameId) {
        if(!gameId) {
          return;
        }
        const inCart = get().cartItems;
        let newCart: number[] = [];
        if(inCart.includes(gameId)) {
          newCart = inCart.filter((id: number) => id !== gameId);
        } else if(inCart.length < maxInCart)  {
          newCart = [...inCart, gameId];
        } else {
          return;
        }
        set({cartItems: newCart})
      },
    }),
    {
      name: 'nintendo-cart',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)