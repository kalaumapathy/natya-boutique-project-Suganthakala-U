import { useEffect, useMemo, useState } from "react";
import CartContext from "./cart-context";

const CART_STORAGE_KEY = "natya-boutique-cart";
const ORDER_STORAGE_KEY = "natya-boutique-orders";

function readStoredValue(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function writeStoredValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing or when its quota is full.
    // The in-memory cart remains usable for the current session.
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    readStoredValue(CART_STORAGE_KEY),
  );
  const [orders, setOrders] = useState(() =>
    readStoredValue(ORDER_STORAGE_KEY),
  );

  useEffect(() => {
    writeStoredValue(CART_STORAGE_KEY, cartItems);
  }, [cartItems]);

  useEffect(() => {
    writeStoredValue(ORDER_STORAGE_KEY, orders);
  }, [orders]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    const parsedQuantity = Number.parseInt(quantity, 10);
    const safeQuantity = Number.isFinite(parsedQuantity)
      ? Math.min(Math.max(parsedQuantity, 1), 99)
      : 1;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: safeQuantity } : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = (customer) => {
    if (cartItems.length === 0) {
      throw new Error(
        "Your cart is empty. Add an item before placing an order.",
      );
    }

    const order = {
      id: `NB-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer: { ...customer, payment: customer.payment },
      items: cartItems.map((item) => ({ ...item })),
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    };

    setOrders((previousOrders) => [order, ...previousOrders]);
    clearCart();
    return order;
  };

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const value = {
    cartItems,
    orders,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
