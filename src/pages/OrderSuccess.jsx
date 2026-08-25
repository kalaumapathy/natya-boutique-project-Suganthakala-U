import React from "react";
import { useLocation, Link } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const { formData, cartItems, cartTotal } = location.state || {};

  return (
    <section className="page order-success">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Thank You, {formData?.name}!</h2>
        <p>Your order has been placed successfully.</p>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} — ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <strong>Total Paid: ${cartTotal?.toFixed(2)}</strong>
        </div>

        <div className="order-actions">
          <Link to="/browse" className="btn-secondary">Continue Shopping</Link>
          <Link
            to="/orders"
            state={{ orders: [{ cartItems, cartTotal }] }}
            className="btn-primary"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;
