import { apiRoot } from './BuildClient';
import { useCartStore } from '../../store/cartStore';
import { checkAndSetQuantity } from '../../utils/checkAndSetQuantity.ts';

export const updateCartItemQuantity = async (
  itemId: string,
  newQuantity: number
) => {
  const { cartId, version } = useCartStore.getState();

  if (!cartId) throw new Error('[updateQuantity] No cart ID defined');

  try {
    const res = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: itemId,
              quantity: newQuantity,
            },
          ],
        },
      })
      .execute();

    useCartStore.getState().setCartId(res.body.id, res.body.version);
    checkAndSetQuantity(res.body);
    console.log('[updateQuantity] Quantity updated');
  } catch (err) {
    console.error('[updateQuantity] Error:', err);
  }
};
