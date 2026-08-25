import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PRODUCTS from "../data/Products";

/* const PRODUCTS = [
  { id: 1, name: "Bharatanatyam Costume – Red & Gold", price: 120, image: "/images/costume1.jpg" },
  { id: 2, name: "Temple Jewelry Set – Kemp Stones", price: 80, image: "/images/jewelry.jpg" },
  { id: 3, name: "Ghungroo Anklets – 100 Bells", price: 35, image: "/images/ghungroo.jpg" }
];
 */
function Browse() {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState({});

  const handleAdd = (product) => {
    addToCart(product);
    setMessages((prev) => ({ ...prev, [product.id]: `${product.name} added to your cart!` }));
    setTimeout(() => {
      setMessages((prev) => {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      });
    }, 2000);
  };

  return (
    <section className="page browse">
      <h2>Browse Costumes & Accessories</h2>
      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image} alt={product.name} className="product-thumb" />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>
            <button className="btn-secondary" onClick={() => handleAdd(product)}>
              Add to Cart
            </button>
            {messages[product.id] && <p className="cart-message">{messages[product.id]}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Browse;
