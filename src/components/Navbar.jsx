import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((current) => !current);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      navigate("/browse");
      return;
    }

    setIsOpen(false);
    navigate(`/search?query=${encodeURIComponent(trimmedSearch)}`);
  };

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        Natya Boutique
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/cart">View Cart</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <form className="navbar-search" role="search" onSubmit={handleSearch}>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
        <button type="submit">Search</button>
      </form>

      <button
        className="hamburger"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <nav className="mobile-menu">
          <NavLink to="/" end onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/browse" onClick={toggleMenu}>
            Browse
          </NavLink>
          <NavLink to="/cart" onClick={toggleMenu}>
            Cart
          </NavLink>
          <NavLink to="/orders" onClick={toggleMenu}>
            Orders
          </NavLink>
          <NavLink to="/about" onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>
            Contact
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
