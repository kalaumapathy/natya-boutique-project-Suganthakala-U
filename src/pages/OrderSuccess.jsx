import { useLocation, Link } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <section className="page empty-state">
        <h1>Order Details Unavailable</h1>
        <p>Please complete checkout before viewing an order confirmation.</p>
        <Link to="/browse" className="btn-primary">
          Browse Costumes
        </Link>
      </section>
    );
  }

  return (
    <section className="page order-success">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Thank You, {order.customer.name}!</h1>
        <p>Your order has been placed successfully.</p>
        <p>
          Confirmation: <strong>{order.id}</strong>
        </p>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} — $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <strong>Total Paid: ${order.total.toFixed(2)}</strong>
        </div>

        <div className="order-actions">
          <Link to="/browse" className="btn-secondary">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn-primary">
            View My Orders
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;
