import { siteContent } from "../../data/siteContent";

export function Disclaimer() {
  return (
    <aside className="disclaimer" aria-label="Important information">
      <strong>Important information</strong>
      <p>{siteContent.disclaimer}</p>
    </aside>
  );
}
