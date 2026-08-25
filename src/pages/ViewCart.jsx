import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <section className="page cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, e.target.value)
                      }
                    />
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button className="btn-link" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <strong>Total: ${cartTotal}</strong>
          </div>

          {/*  Proceed to Checkout button */}
          <div className="checkout-action">
            <Link to="/checkout" className="btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
