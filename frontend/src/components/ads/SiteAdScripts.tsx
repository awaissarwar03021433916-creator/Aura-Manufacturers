import Script from "next/script";
import { POPUNDER_ENABLED, POPUNDER_SRC, SOCIAL_BAR_ENABLED, SOCIAL_BAR_SRC } from "./config";

// Page-level ad formats (overlay / popunder); they must run in the top-level page.
// Both are OFF by default — see ./config.ts.
// Rendered only from the (public) layout, so admin routes never load them.
// A fixed `id` makes next/script inject each one at most once per browser session,
// across client-side navigations and re-renders.
export default function SiteAdScripts() {
  return (
    <>
      {SOCIAL_BAR_ENABLED && (
        <Script id="ad-social-bar" src={SOCIAL_BAR_SRC} strategy="lazyOnload" data-cfasync="false" />
      )}
      {POPUNDER_ENABLED && (
        <Script id="ad-popunder" src={POPUNDER_SRC} strategy="lazyOnload" data-cfasync="false" />
      )}
    </>
  );
}
