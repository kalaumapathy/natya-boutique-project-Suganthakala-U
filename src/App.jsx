import products from "./data/products";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
      <h1>Natya Boutique</h1>

      <h2>Traditional Dance Costumes</h2>

      <ProductList products={products} />
    </div>
  );
}

export default App;