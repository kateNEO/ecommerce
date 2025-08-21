import { useCartStore } from '../store/cartStore';

beforeEach(() => {
  localStorage.clear();
  useCartStore.getState().resetCart();
});

describe('useCartStore', () => {
  it('initializes with null cartId and version 0 when localStorage is empty', () => {
    const { cartId, version } = useCartStore.getState();
    expect(cartId).toBe(null);
    expect(version).toBe(0);
  });

  it('sets cartId and version correctly and persists to localStorage', () => {
    useCartStore.getState().setCartId('cart-123', 5);
    const { cartId, version } = useCartStore.getState();

    expect(cartId).toBe('cart-123');
    expect(version).toBe(5);
    expect(localStorage.getItem('ct_cart_id')).toBe('cart-123');
    expect(localStorage.getItem('ct_cart_version')).toBe('5');
  });

  it('resets cart correctly and clears localStorage', () => {
    useCartStore.getState().setCartId('cart-456', 9);
    useCartStore.getState().resetCart();
    const { cartId, version } = useCartStore.getState();

    expect(cartId).toBe(null);
    expect(version).toBe(0);
    expect(localStorage.getItem('ct_cart_id')).toBeNull();
    expect(localStorage.getItem('ct_cart_version')).toBeNull();
  });
});
