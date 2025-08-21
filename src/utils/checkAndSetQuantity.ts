import { useCartStore } from '../store/cartStore.ts';
import { Cart } from '@commercetools/platform-sdk';

export function checkAndSetQuantity(resp: Cart) {
  if (resp.totalLineItemQuantity) {
    useCartStore.getState().setQuantity(resp.totalLineItemQuantity);
  } else {
    useCartStore.getState().setQuantity(0);
  }
}
