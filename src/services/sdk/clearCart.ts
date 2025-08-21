import { apiRoot } from './BuildClient';
import { useCartStore } from '../../store/cartStore';
import { CartUpdateAction } from '@commercetools/platform-sdk';
import { checkAndSetQuantity } from '../../utils/checkAndSetQuantity.ts';

export const clearCart = async () => {
  const { cartId } = useCartStore.getState();
  if (!cartId) return;

  const cart = await apiRoot.carts().withId({ ID: cartId }).get().execute();

  const removeActions: CartUpdateAction[] = cart.body.lineItems.map((item) => ({
    action: 'removeLineItem',
    lineItemId: item.id,
  }));

  if (removeActions.length === 0) return;

  const res = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cart.body.version,
        actions: removeActions,
      },
    })
    .execute();

  useCartStore.getState().setCartId(res.body.id, res.body.version);
  checkAndSetQuantity(res.body);
};
