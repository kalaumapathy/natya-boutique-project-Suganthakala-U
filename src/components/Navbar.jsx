import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="navbar">
      <div className="logo">Natya Boutique</div>

      {/* Desktop Links */}
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/cart">ViewCart</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      {/* Hamburger Icon (mobile) */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="mobile-menu">
          <NavLink to="/" end onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/browse" onClick={toggleMenu}>Browse</NavLink>
          <NavLink to="/cart" onClick={toggleMenu}>Cart</NavLink>
          <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
        </nav>
      )}
    </header>
  );
}

export default Navbar;


