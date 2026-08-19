import { Link } from "react-router-dom";
import { siteContent } from "../../data/siteContent";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Real Assets Personality home">
        <span>{siteContent.brandLabel}</span>
      </Link>
      <span className="header-label">Real Assets Personality</span>
    </header>
  );
}
