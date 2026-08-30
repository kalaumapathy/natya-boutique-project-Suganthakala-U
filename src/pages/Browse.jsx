import { useState } from "react";
import useCart from "../hooks/useCart";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import catalog from "../data/catalog";

function Browse() {
  const { addToCart } = useCart();
  const [messages, setMessages] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredProducts = catalog.filter((product) => {
    if (!normalizedSearch) {
      return true;
    }

    return [product.name, product.category, product.description].some(
      (field) => field?.toLowerCase().includes(normalizedSearch)
    );
  });

  const handleAdd = (product) => {
    addToCart(product);

    setMessages((prev) => ({
      ...prev,
      [product.id]: `${product.name} added to your cart!`,
    }));

    setTimeout(() => {
      setMessages((prev) => {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      });
    }, 2000);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  return (
    <section className="page browse">
      <p className="eyebrow">Natya Boutique</p>
      <h1>Browse Costumes & Accessories</h1>

      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearch}
        onClear={() => {
          setSearchInput("");
          setSearchTerm("");
        }}
      />

      <p className="search-results-count" aria-live="polite">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "product" : "products"} found
      </p>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAdd}
              message={messages[product.id]}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <div className="not-found-icon">🔍</div>
          <h2>Product Not Found</h2>
          <p>
            We couldn't find a product matching{" "}
            <strong>"{searchTerm}"</strong>.
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchInput("");
              setSearchTerm("");
            }}
          >
            Show All Products
          </Button>
        </div>
      )}
    </section>
  );
}

export default Browse;
