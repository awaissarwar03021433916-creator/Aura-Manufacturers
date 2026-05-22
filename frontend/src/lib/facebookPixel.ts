/**
 * Reusable Meta (Facebook) Pixel event helpers.
 *
 * The Pixel base code is injected once by `components/FacebookPixel.tsx`,
 * which creates the global `window.fbq` queue. These helpers are a thin,
 * type-safe layer over `fbq("track", ...)` so feature code never touches the
 * global directly and every event fires consistently across the site.
 *
 * Usage:
 *   import { trackViewContent, trackLead } from "@/lib/facebookPixel";
 *   trackViewContent({ content_name: "Leather Tote", value: 4500, currency: "PKR" });
 *
 * Adding a new event is a two-line wrapper around `trackEvent` — see the
 * "Adding more events" note at the bottom of this file.
 */

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

/**
 * Meta's predefined "standard events". Using a union keeps event names
 * spell-checked at compile time. Extend it from Meta's reference as needed:
 * https://developers.facebook.com/docs/meta-pixel/reference
 */
export type StandardEvent =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "AddToWishlist"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "SubmitApplication"
  | "Subscribe";

/**
 * Parameters Meta recognises for standard events. All optional; the index
 * signature keeps it open for custom keys while preserving autocomplete on the
 * common ones. Pair `value` with `currency` for revenue/ROAS reporting.
 */
export interface FacebookEventParams {
  /** Human-readable name, e.g. "Leather Tote". */
  content_name?: string;
  /** Category grouping, e.g. "Handbags". */
  content_category?: string;
  /** SKU(s) / product id(s) involved. */
  content_ids?: Array<string | number>;
  /** "product" for a single item, "product_group" for a collection. */
  content_type?: "product" | "product_group";
  /** Detailed line items, used by AddToCart / Purchase. */
  contents?: Array<{ id: string; quantity: number; item_price?: number }>;
  /** ISO-4217 currency code, e.g. "PKR", "USD". Required alongside `value`. */
  currency?: string;
  /** Monetary value of the event. */
  value?: number;
  /** Number of items, e.g. for InitiateCheckout. */
  num_items?: number;
  /** Free-text query for Search events. */
  search_string?: string;
  /** Lead / registration status. */
  status?: string | boolean;
  /** Meta permits arbitrary extra parameters. */
  [key: string]: unknown;
}

/**
 * Signature of the global `fbq` dispatcher created by the Pixel base code.
 * The overloads cover the commands we use; the trailing catch-all keeps it
 * forward-compatible with commands we haven't typed yet.
 */
export interface Fbq {
  (command: "init", pixelId: string, advancedMatching?: Record<string, unknown>): void;
  (command: "track", event: StandardEvent, params?: FacebookEventParams): void;
  (command: "trackCustom", event: string, params?: FacebookEventParams): void;
  (command: "trackSingle", pixelId: string, event: StandardEvent, params?: FacebookEventParams): void;
  (command: string, ...args: unknown[]): void;
  /** Internals exposed by the base-code stub. */
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  callMethod?: (...args: unknown[]) => void;
}

declare global {
  interface Window {
    fbq?: Fbq;
    /** Alias the base code sets alongside `fbq`. */
    _fbq?: Fbq;
  }
}

/* ------------------------------------------------------------------ */
/* Core dispatchers                                                   */
/* ------------------------------------------------------------------ */

/**
 * Fire a Meta *standard* event. SSR-safe and a no-op when the Pixel hasn't
 * loaded (e.g. local dev, where the base code isn't injected). Every helper
 * below funnels through here, so this is the one place to add cross-cutting
 * logic (consent checks, debug logging, etc.).
 */
export function trackEvent(event: StandardEvent, params?: FacebookEventParams): void {
  // Guard order matters: bail on the server, then narrow `fbq` to a function.
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.debug(`[fbq] skipped "${event}" (pixel not ready)`, params ?? {});
    }
    return;
  }
  window.fbq("track", event, params);
}

/**
 * Fire a *custom* (non-standard) event. Prefer standard events where one fits,
 * so Meta's optimisation and reporting work without extra setup.
 */
export function trackCustomEvent(event: string, params?: FacebookEventParams): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", event, params);
}

/* ------------------------------------------------------------------ */
/* Standard event helpers                                             */
/* ------------------------------------------------------------------ */

/**
 * ViewContent — fire on product / catalogue detail pages so Meta can build
 * retargeting audiences and product-level reporting.
 */
export function trackViewContent(params?: FacebookEventParams): void {
  trackEvent("ViewContent", params);
}

/**
 * Contact — fire when a user initiates contact (WhatsApp click, phone tap,
 * contact-form submit). Core conversion for an enquiry-led manufacturing site.
 */
export function trackContact(params?: FacebookEventParams): void {
  trackEvent("Contact", params);
}

/**
 * Lead — fire on qualified enquiries (quote request, custom-bag enquiry,
 * wholesale sign-up). Often paired with `value` + `currency` for ROAS.
 */
export function trackLead(params?: FacebookEventParams): void {
  trackEvent("Lead", params);
}

/* ------------------------------------------------------------------ */
/* Adding more events                                                 */
/* ------------------------------------------------------------------ */
/*
 * 1. If it's a Meta standard event, add its name to `StandardEvent` above.
 * 2. Export a one-line wrapper, e.g.:
 *
 *      export function trackAddToCart(params?: FacebookEventParams) {
 *        trackEvent("AddToCart", params);
 *      }
 *
 *    For non-standard events call `trackCustomEvent("YourEvent", params)`.
 */
