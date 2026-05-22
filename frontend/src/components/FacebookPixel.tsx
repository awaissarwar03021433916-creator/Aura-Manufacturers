"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/facebookPixel";

// The `window.fbq` global type lives in "@/lib/facebookPixel" (single source
// of truth), so it's available here without re-declaring it.

// Hardcoded per spec; overridable via env without a code change if the account
// ever rotates. NEXT_PUBLIC_ is inlined at build time, so this is safe in a
// client component and identical on server + client (no hydration drift).
const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? "848324207797237";

// Fires a PageView on client-side (App Router) navigations. The base code
// already sends the first PageView on load, so we skip the initial mount to
// avoid double-counting, then track every subsequent route/query change.
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    // Reuse the shared, SSR-safe helper instead of touching `fbq` directly.
    trackEvent("PageView");
  }, [pathname, searchParams]);

  return null;
}

export default function FacebookPixel() {
  // Keep dev/local traffic out of the pixel. On Vercel, NODE_ENV is
  // "production" for both Production and Preview deployments.
  if (!PIXEL_ID || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* Meta Pixel base code — self-loads fbevents.js asynchronously. */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Tracks PageView for users with JavaScript disabled. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* useSearchParams must sit under a Suspense boundary in the App Router. */}
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
