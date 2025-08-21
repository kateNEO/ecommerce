import { apiRoot } from './BuildClient';
import { useCartStore } from '../../store/cartStore';
import { checkAndSetQuantity } from '../../utils/checkAndSetQuantity.ts';

export const removeItemFromCart = async (itemId: string) => {
  const { cartId, version } = useCartStore.getState();

  if (!cartId) {
    throw new Error('[removeItem]Cart ID is not defined');
    return;
  }

  try {
    const res = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: itemId,
            },
          ],
        },
      })
      .execute();

    useCartStore.getState().setCartId(res.body.id, res.body.version);
    checkAndSetQuantity(res.body);
    console.log(res.body);
    console.log('[removeItem] Item removed from cart:', res.body.id);
  } catch (err) {
    console.error('[removeItem] Error removing item from cart:', err);
  }
};
