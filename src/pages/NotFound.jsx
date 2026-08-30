import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page empty-state">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </section>
  );
}

export default NotFound;
