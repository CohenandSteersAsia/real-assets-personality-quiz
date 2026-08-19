import { useState } from "react";
import { siteContent } from "../../data/siteContent";
import { trackEvent } from "../../lib/analytics";
import { shareResult } from "../../lib/share";
import type { PersonalityContent } from "../../types/quiz";

export function ShareResult({
  personality,
}: {
  personality: PersonalityContent;
}) {
  const [status, setStatus] = useState("");
  const share = async () => {
    try {
      const outcome = await shareResult({
        title: `${personality.personalityName} — Real Assets Personality`,
        text: siteContent.result.shareText,
        url: window.location.href,
      });
      setStatus(outcome === "copied" ? siteContent.result.copied : "Shared");
      trackEvent("result_shared", { method: outcome, result: personality.id });
    } catch {
      setStatus("Share cancelled");
    }
  };
  const canNativeShare =
    typeof (
      navigator as unknown as { share?: (data: ShareData) => Promise<void> }
    ).share === "function";
  return (
    <section className="share-panel" aria-labelledby="share-title">
      <div>
        <p className="eyebrow">Pass it on</p>
        <h2 id="share-title">{siteContent.result.shareTitle}</h2>
      </div>
      <button
        type="button"
        className="button button--secondary"
        onClick={share}
      >
        {canNativeShare
          ? siteContent.result.shareButton
          : siteContent.result.copyButton}
      </button>
      <span className="share-status" role="status" aria-live="polite">
        {status}
      </span>
    </section>
  );
}
