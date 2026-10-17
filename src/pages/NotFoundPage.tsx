import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <main className="page not-found-page">
      <div className="container not-found-container">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Data Point Not Found</h1>
        <p className="not-found-desc">
          The requested coordinate or analysis page doesn't exist in our repository.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn--primary">
            <Home size={16} />
            <span>Return Home</span>
          </Link>
          <Link to="/projects" className="btn btn--outline">
            <ArrowLeft size={16} />
            <span>Browse Projects</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
