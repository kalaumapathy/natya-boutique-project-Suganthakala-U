import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/order-success", { state: { formData, cartItems, cartTotal } });
  };

  return (
    <section className="page checkout">
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <div className="checkout-container">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} — ${item.price * item.quantity}
                </li>
              ))}
            </ul>
            <strong>Total: ${cartTotal.toFixed(2)}</strong>
          </div>

          {/* Checkout Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Customer Details</h3>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Address:
              <textarea name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <label>
              Payment Method:
              <select name="payment" value={formData.payment} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </label>

            {/* ✅ Checkout button always visible when cart has items */}
            <button type="submit" className="btn-primary">Place Order</button>
          </form>
        </div>
      )}
    </section>
  );
}

export default Checkout;
