import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch) {
      navigate(`/search?query=${encodeURIComponent(trimmedSearch)}`);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Natya Boutique</h1>
      </div>

      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/costumes">Costumes</a>
        <a href="/accessories">Accessories</a>
        <a href="/orders">Orders</a>
      </nav>
 
    </header>
  );
}

export default Header;