import { describe, vi, it, expect, beforeEach } from 'vitest';
import { clearCart } from '../clearCart';

const mockSetCartId = vi.fn();

vi.mock('../../../store/cartStore', () => ({
  useCartStore: {
    getState: vi.fn(() => ({
      cartId: 'mock-cart-id',
      setCartId: mockSetCartId,
    })),
  },
}));

const getMock = vi.fn(() => ({
  execute: vi.fn().mockResolvedValue({
    body: {
      version: 3,
      lineItems: [{ id: 'item-1' }, { id: 'item-2' }],
    },
  }),
}));

const postMock = vi.fn(() => ({
  execute: vi.fn().mockResolvedValue({
    body: {
      id: 'mock-cart-id',
      version: 4,
    },
  }),
}));

vi.mock('../BuildClient', () => ({
  apiRoot: {
    carts: () => ({
      withId: () => ({
        get: getMock,
        post: postMock,
      }),
    }),
  },
}));

describe('clearCart', () => {
  beforeEach(() => {
    getMock.mockClear();
    postMock.mockClear();
    mockSetCartId.mockClear();
  });

  it('удаляет все lineItems из корзины и обновляет store', async () => {
    await clearCart();

    expect(getMock).toHaveBeenCalled();
    expect(postMock).toHaveBeenCalledWith({
      body: {
        version: 3,
        actions: [
          { action: 'removeLineItem', lineItemId: 'item-1' },
          { action: 'removeLineItem', lineItemId: 'item-2' },
        ],
      },
    });

    expect(mockSetCartId).toHaveBeenCalledWith('mock-cart-id', 4);
  });
});
