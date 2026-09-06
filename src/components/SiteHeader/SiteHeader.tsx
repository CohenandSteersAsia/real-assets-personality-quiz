import { Link } from "react-router-dom";
import { brandContent } from "../../data/brandContent";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label={brandContent.homeLabel}>
        <img
          className="brand-logo"
          src={`${import.meta.env.BASE_URL}${brandContent.logo}`}
          alt={brandContent.logoAlt}
          width="333"
          height="40"
        />
      </Link>
      <span className="header-label">{brandContent.headerLabel}</span>
    </header>
  );
}
