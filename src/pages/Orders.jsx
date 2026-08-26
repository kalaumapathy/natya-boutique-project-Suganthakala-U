import React from "react";
import { useLocation } from "react-router-dom";

function Orders() {
  
  const location = useLocation();
  const { state } = location || {};
  const orders = state?.orders || [];

  return (
    <section className="page orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no past orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <strong>Order #{index + 1}</strong>
              <ul>
                {order.cartItems.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} — ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.cartTotal.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Orders; 
