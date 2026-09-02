import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import catalog from "../data/catalog";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const query = searchParams.get("query") || "";

  const searchResults = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      return [];
    }

    return catalog.filter((product) => {
      return [product.name, product.category, product.description].some(
        (field) => field?.toLowerCase().includes(searchText),
      );
    });
  }, [query]);

  return (
    <section className="page search-results-page">
      <div className="search-results-header">
        <p className="eyebrow">Natya Boutique</p>
        <h1>Search Results</h1>

        {query && (
          <p className="search-message">
            Showing results for <strong>"{query}"</strong>
          </p>
        )}
      </div>

      {searchResults.length === 0 ? (
        <div className="not-found" role="status">
          <div className="not-found-icon">🔍</div>
          <h2>Product Not Found</h2>
          <p>
            Sorry, we couldn't find a product matching{" "}
            <strong>"{query}"</strong>.
          </p>
          <p className="not-found-help">
            Try searching for Bharatanatyam, Kuchipudi, Odissi, Kathak, jewelry,
            ghungroos, hair accessories, or dance belt.
          </p>

          <Link to="/browse" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <p className="search-results-count" aria-live="polite">
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "product" : "products"} found
          </p>

          <div className="product-grid">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default SearchResults;
