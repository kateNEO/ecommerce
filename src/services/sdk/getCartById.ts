import { apiRoot } from './apiRoot.ts';

export const getCartById = async (cartId: string) => {
  return apiRoot.carts().withId({ ID: cartId }).get().execute();
};
