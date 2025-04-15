import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

//this would be handled all on the BE with a database table
type WishlistStore = {
  wishlistItems: number[];
  onClickWishlist: (gameId?: number) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      onClickWishlist(gameId) {
        if(!gameId) {
          return;
        }
        const inWishList = get().wishlistItems;
        let newWishlist = [];
        if(inWishList.includes(gameId)) {
          newWishlist = inWishList.filter((id: number) => id !== gameId);
        } else {
          newWishlist = [...inWishList, gameId];
        }
        set({wishlistItems: newWishlist})
      },
    }),
    {
      name: 'nintendo-wishlist',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)