function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image}  alt={product.name} />

            <h3>{product.name}</h3>

            <p>{product.category}</p>

            <p>${product.price}</p>

            <p>{product.description}</p>

      <button>View Details</button>

      <button>Add to Cart</button>
      
    </div>
  );
}

export default ProductCard;