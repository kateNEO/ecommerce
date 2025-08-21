import { apiRoot } from './apiRoot.ts';

export const createCart = async () => {
  return apiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
        country: 'US',
      },
    })
    .execute();
};
