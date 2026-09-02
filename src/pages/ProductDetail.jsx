import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import catalog from "../data/catalog";
import useCart from "../hooks/useCart";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");

  const product = catalog.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section className="page empty-state">
        <div className="not-found-icon">🔍</div>
        <h1>Product Not Found</h1>
        <p>That product is not available in the Natya Boutique catalog.</p>
        <Link to="/browse" className="btn-primary">
          Back to Browse
        </Link>
      </section>
    );
  }

  return (
    <section className="page product-detail">
      <div className="product-detail-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />

        <div className="product-detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>

          <Button
            onClick={() => {
              addToCart(product);
              setMessage(`${product.name} added to your cart!`);
            }}
          >
            Add to Cart
          </Button>
          {message && (
            <p className="status-message" role="status">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
