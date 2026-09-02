import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

function Orders() {
  const { orders } = useCart();

  return (
    <section className="page orders">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>You have no past orders yet.</p>
          <Link to="/browse" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order {order.id}</strong>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} — $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.total.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Orders;
