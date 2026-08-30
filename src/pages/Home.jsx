
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="page home">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Classical Indian Dance</p>
          <h1>Traditional Dance Costumes & Accessories</h1>
          <p>
            Performance-ready Bharatanatyam, Kuchipudi, and classical Indian
            dance wear for dancers of all levels.
          </p>
          <div className="hero-actions">
            <Link to="/browse" className="btn-primary">
              Shop Costumes
            </Link>
            <Link to="/about" className="btn-secondary">
              About Natya Boutique
            </Link>
          </div>
        </div>
        <img
          src="/images/hero1.jpg"
          alt="Traditional Indian classical dance costume"
          className="hero-image"
        />
      </div>
    </section>
  );
}

export default Home;




/* import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="page home">
      <div className="hero">
        <h1>Traditional Dance Costumes & Accessories</h1>
        <p>Performance-ready Bharatanatyam, Kuchipudi, and classical Indian dance wear.</p>
        <Link to="/browse" className="btn-primary"> Shop Costumes </Link>
      </div>
    </section>
  );
}

export default Home;
 */