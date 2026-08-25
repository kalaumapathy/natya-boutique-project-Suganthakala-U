import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Natya Boutique. All rights reserved.</p>
        <nav className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/browse">Shop</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
