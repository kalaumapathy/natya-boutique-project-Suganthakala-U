import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Natya Boutique. All rights reserved.
        </p>
        <nav className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/browse">Shop</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
