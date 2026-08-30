import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useCart from "../hooks/useCart";

const INITIAL_FORM = {
  name: "",
  email: "",
  address: "",
  payment: "",
};

function validateField(name, value) {
  const trimmedValue = value.trim();

  if (name === "name") {
    if (!trimmedValue) return "Name is required.";
    if (trimmedValue.length < 2) return "Name must be at least 2 characters.";
  }

  if (name === "email") {
    if (!trimmedValue) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return "Enter a valid email address.";
    }
  }

  if (name === "address") {
    if (!trimmedValue) return "Address is required.";
    if (trimmedValue.length < 10) {
      return "Address must be at least 10 characters.";
    }
  }

  if (name === "payment" && !trimmedValue) {
    return "Select a payment method.";
  }

  return "";
}

function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = Object.fromEntries(
      Object.entries(formData)
        .map(([name, value]) => [name, validateField(name, value)])
        .filter(([, error]) => error)
    );

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      navigate("/order-success", { state: { formData, cartItems, cartTotal } });
    }
  };

  return (
    <section className="page checkout">
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <div className="checkout-container">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} — $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <strong>Total: ${cartTotal.toFixed(2)}</strong>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <h2>Customer Details</h2>

            <label htmlFor="checkout-name">
              Name
              <input
                id="checkout-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "checkout-name-error" : undefined}
              />
            </label>
            {errors.name && (
              <span id="checkout-name-error" className="field-error">
                {errors.name}
              </span>
            )}

            <label htmlFor="checkout-email">
              Email
              <input
                id="checkout-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "checkout-email-error" : undefined}
              />
            </label>
            {errors.email && (
              <span id="checkout-email-error" className="field-error">
                {errors.email}
              </span>
            )}

            <label htmlFor="checkout-address">
              Address
              <textarea
                id="checkout-address"
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "checkout-address-error" : undefined}
              />
            </label>
            {errors.address && (
              <span id="checkout-address-error" className="field-error">
                {errors.address}
              </span>
            )}

            <label htmlFor="checkout-payment">
              Payment Method
              <select
                id="checkout-payment"
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.payment)}
                aria-describedby={errors.payment ? "checkout-payment-error" : undefined}
              >
                <option value="">Select</option>
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </label>
            {errors.payment && (
              <span id="checkout-payment-error" className="field-error">
                {errors.payment}
              </span>
            )}

            <Button type="submit">Place Order</Button>
          </form>
        </div>
      )}
    </section>
  );
}

export default Checkout;
