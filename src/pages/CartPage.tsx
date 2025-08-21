import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCartById } from '../services/sdk/getCartById';
import { useCartStore } from '../store/cartStore';
import { LineItem } from '@commercetools/platform-sdk';
import { removeItemFromCart } from '../services/sdk/removeItemFromCart';
import { updateCartItemQuantity } from '../services/sdk/changeQuantity';
import { clearCart } from '../services/sdk/clearCart';
import { addDiscountCode } from '../services/sdk/addDiscountCode';
import Button from '../components/button.tsx';
import { getEffectivePrice } from '../utils/getEffectivePrice.ts';

export function CartPage() {
  const cartId = useCartStore((state) => state.cartId);

  const [items, setItems] = useState<LineItem[]>([]);

  const tax = 5000;
  const shipping = 2900;

  const originalSubtotal = items.reduce(
    (sum, item) => sum + getEffectivePrice(item) * item.quantity,
    0
  );

  const [appliedLineTotal, setAppliedLineTotal] =
    useState<number>(originalSubtotal);

  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending');

  useEffect(() => {
    if (!cartId) return;
    getCartById(cartId)
      .then((res) => {
        setItems(res.body.lineItems);
        setAppliedLineTotal(
          res.body.lineItems.reduce(
            (sum, item) => sum + getEffectivePrice(item) * item.quantity,
            0
          )
        );
      })
      .catch(console.error);
  }, [cartId]);

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      const updatedCart = await addDiscountCode(promoCode.trim());
      setItems(updatedCart.lineItems);

      const subtotal = updatedCart.lineItems.reduce(
        (sum, item) => sum + getEffectivePrice(item) * item.quantity,
        0
      );

      const discount = Math.round(subtotal * 0.1);
      const discountedTotal = subtotal - discount;

      setAppliedLineTotal(discountedTotal);
      setPromoStatus('success');
    } catch (e) {
      console.error(e);
      setPromoStatus('error');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!cartId) return;
    await updateCartItemQuantity(itemId, quantity);
    const res = await getCartById(cartId);
    setItems(res.body.lineItems);

    const subtotal = res.body.lineItems.reduce(
      (sum, item) => sum + getEffectivePrice(item) * item.quantity,
      0
    );

    if (promoStatus === 'success') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedLineTotal(subtotal - discount);
    } else {
      setAppliedLineTotal(subtotal);
    }
  };

  const handleRemove = async (itemId: string) => {
    if (!cartId) return;

    const confirmRemove = window.confirm(
      'Are you sure you want to remove this item from the cart?'
    );
    if (!confirmRemove) return;

    await removeItemFromCart(itemId);
    const res = await getCartById(cartId);
    setItems(res.body.lineItems);

    const subtotal = res.body.lineItems.reduce(
      (sum, item) => sum + getEffectivePrice(item) * item.quantity,
      0
    );

    if (promoStatus === 'success') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedLineTotal(subtotal - discount);
    } else {
      setAppliedLineTotal(subtotal);
    }
  };

  const discountAmount = originalSubtotal - appliedLineTotal;

  const total = appliedLineTotal;

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/catalog"
          className="inline-block bg-[#211C24] border text-white px-6 py-3 rounded-lg font-medium hover:bg-[#9a2ee8] hover:text-black transition"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 px-6 py-10 items-start">
      {/* Левый блок: товары */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
        <ul className="space-y-6">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-6 border-b pb-4">
              <img
                src={item.variant.images?.[0]?.url}
                alt={item.name['en-US']}
                className="w-32 h-32 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name['en-US']}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border border-[#9F9F9F] rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-lg disabled:opacity-50"
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-semibold">
                    ${(getEffectivePrice(item) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-gray-500 hover:text-red-600 text-2xl
                  font-extralight rounded-full shadow-md w-10 h-10
                  flex items-center justify-center transition-colors duration-200"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          text="Clear cart"
          className="w-28 h-9.5 bg-white border border-[#9F9F9F] p-2 text-xs mt-5 hover:text-red-600"
          onClick={() => {
            if (window.confirm('Clear the cart?')) {
              clearCart().then(() => {
                setItems([]);
              });
            }
          }}
        />
      </div>

      {/* Правый блок: Order Summary */}
      <div className="w-full md:w-96 border p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">
            Discount code / Promo code
          </label>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setPromoStatus('pending');
            }}
            placeholder="SAVE10"
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <Button
            type="button"
            text="Apply"
            className="text-white py-2"
            onClick={applyPromoCode}
          />
          {promoStatus === 'success' && (
            <p className="text-green-600 text-sm mt-1">Promo code applied!</p>
          )}
          {promoStatus === 'error' && (
            <p className="text-red-600 text-sm mt-1">Invalid promo code</p>
          )}
        </div>

        <div className="text-sm space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Original Subtotal</span>
            <span>${(originalSubtotal / 100).toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between">
              <span>Discount ({promoCode})</span>
              <span className="text-red-600">
                -${(discountAmount / 100).toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${(tax / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${(shipping / 100).toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t pt-3 mb-6">
          <span>Total</span>
          <div className="flex items-center">
            {discountAmount > 0 && (
              <span className="text-gray-500 line-through mr-2">
                ${((originalSubtotal + tax + shipping) / 100).toFixed(2)}
              </span>
            )}
            <span>${(total / 100).toFixed(2)}</span>
          </div>
        </div>
        <Button type="button" text="Checkout" className="text-white py-2" />
      </div>
    </div>
  );
}

export default CartPage;
