import React from "react";
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
