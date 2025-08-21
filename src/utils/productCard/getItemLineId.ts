import { useCartStore } from '../../store/cartStore.ts';
import { apiRoot } from '../../services/sdk/apiRoot.ts';

export async function getItemLineId(id: string) {
  const cartId = useCartStore.getState().cartId;
  if (!cartId) return;
  try {
    const response = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();

    const lineItem = response.body.lineItems.find(
      (item) => item.productId === id
    );
    if (!lineItem) return;
    return lineItem.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}
