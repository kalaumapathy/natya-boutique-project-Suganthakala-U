import Button from "./Button";

function SearchBar({ value, onChange, onSearch, onClear }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.();
  };

  return (
    <form className="product-search" role="search" onSubmit={handleSubmit}>
      <label htmlFor="product-search-input">Search products</label>

      <div className="product-search-controls">
        <input
          id="product-search-input"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by product or category..."
          autoComplete="off"
          aria-label="Search products"
        />

        <Button type="submit" variant="primary">
          Search
        </Button>

        {value && (
          <Button type="button" variant="secondary" onClick={onClear}>
            Clear
          </Button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
