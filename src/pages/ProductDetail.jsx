import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PRODUCTS from "../data/Products";

/* const PRODUCTS = [
  { id: 1, name: "Bharatanatyam Costume – Red & Gold", price: 120, 
    description: "Handcrafted silk costume with temple border.", image: "/images/costume1.jpg" },
  { id: 2, name: "Temple Jewelry Set – Kemp Stones", price: 80, 
    description: "Traditional kemp stone jewelry set for Bharatanatyam.", image: "/images/jewelry.jpg" },
  { id: 3, name: "Ghungroo Anklets – 100 Bells", price: 35, 
    description: "Pair of ghungroos with 100 brass bells.", image: "/images/ghungroo.jpg" }
]; */

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === Number(id));
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="page product-detail">
      <div className="product-detail-container">
        <img src={product.image} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <button className="btn-primary" onClick={() => addToCart(product)}> Add to Cart </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
