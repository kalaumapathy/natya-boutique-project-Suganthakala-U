import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ViewCart from "./pages/ViewCart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";
import Orders from "./pages/Orders";

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <Navbar />
        <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={< ViewCart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
