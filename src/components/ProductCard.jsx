import { Link } from "react-router-dom";
import Button from "./Button";

function ProductCard({ product, onAddToCart, message }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-thumb" />
        <div className="product-card-body">
          <p className="product-category">{product.category}</p>
          <h2>{product.name}</h2>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <Button
        variant="secondary"
        className="product-button"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </Button>
      {message && (
        <p className="status-message" role="status">
          {message}
        </p>
      )}
    </article>
  );
}

export default ProductCard;