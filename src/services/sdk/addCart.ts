import { apiRoot } from './apiRoot.ts';

export const addCart = async (
  cartId: string,
  version: number,
  productId: string
) => {
  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity: 1, // дефолтное кол-во товара
          },
        ],
      },
    })
    .execute();
};
