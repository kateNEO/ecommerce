import { addProductToCart } from '../../services/sdk/addToCart.ts';
import { getItemLineId } from './getItemLineId.ts';
import { removeItemFromCart } from '../../services/sdk/removeItemFromCart.ts';

export async function addOrRemoveClickFunction(
  id: string,
  isInCart: boolean,
  setState: (value: boolean) => void
) {
  if (!isInCart) {
    setState(!isInCart);
    addProductToCart(id, 1).catch((err) => {
      console.log(err);
    });
  } else {
    const lineId = await getItemLineId(id);
    if (!lineId) return;
    setState(!isInCart);
    removeItemFromCart(lineId);
  }
}
