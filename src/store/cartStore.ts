import { create } from 'zustand';

interface CartState {
  cartId: string | null;
  version: number;
  quantity: number;
  setCartId: (id: string, version: number) => void;
  resetCart: () => void;
  setQuantity: (quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => {
  const savedCartId = localStorage.getItem('ct_cart_id');
  const savedVersion = localStorage.getItem('ct_cart_version');

  return {
    quantity: 0,
    cartId: savedCartId || null,
    version: savedVersion ? parseInt(savedVersion, 10) : 0,

    setCartId: (id, version) => {
      localStorage.setItem('ct_cart_id', id);
      localStorage.setItem('ct_cart_version', version.toString());
      set({ cartId: id, version });
    },

    resetCart: () => {
      localStorage.removeItem('ct_cart_id');
      localStorage.removeItem('ct_cart_version');
      set({ cartId: null, version: 0 });
    },
    setQuantity: (qty) => {
      set({ quantity: qty });
    },
  };
});
