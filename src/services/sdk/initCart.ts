import { getCartById } from './getCartById';
import { createCart } from './createCart';
import { getAnToken } from './getAnonymousToken';
import { useCartStore } from '../../store/cartStore';
import { checkAndSetQuantity } from '../../utils/checkAndSetQuantity.ts';

export const initCart = async () => {
  const setCartId = useCartStore.getState().setCartId;

  const cartId = localStorage.getItem('ct_cart_id');
  const version = localStorage.getItem('ct_cart_version');

  if (cartId && version) {
    try {
      const res = await getCartById(cartId);
      setCartId(res.body.id, res.body.version);
      console.log('[initCart] восстановлена корзина:', res.body.id);
      checkAndSetQuantity(res.body);
      return;
    } catch (err) {
      console.warn('[initCart] старая корзина не найдена, создаю новую', err);
    }
  }

  await getAnToken();
  const res = await createCart();
  setCartId(res.body.id, res.body.version);
  console.log('[initCart] создана новая корзина:', res.body);
};
