import { apiRoot } from './BuildClient';
import { useCartStore } from '../../store/cartStore';

export const addDiscountCode = async (code: string) => {
  const { cartId, version } = useCartStore.getState();

  if (!cartId) throw new Error('[addDiscountCode] Cart ID is not defined');

  try {
    const response = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addDiscountCode',
              code,
            },
          ],
        },
      })
      .execute();

    useCartStore.getState().setCartId(response.body.id, response.body.version);
    console.log('[addDiscountCode] Discount applied successfully');
    return response.body;
  } catch (error) {
    console.error('[addDiscountCode] Failed to apply discount code:', error);
    throw error;
  }
};
