import { apiRoot } from './apiRoot';

export const removeFromCart = async (
  cartId: string,
  version: number,
  lineItemId: string
) => {
  return apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            // quantity: 1, // может быть изменено на нужное кол-во товара
          },
        ],
      },
    })
    .execute();
};
