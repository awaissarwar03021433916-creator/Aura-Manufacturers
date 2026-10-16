"use client";

import { useEffect, useRef, useState } from "react";

// Every ad renders inside its own srcdoc iframe, so each unit gets a private `window`:
// the two banners' `atOptions` globals can never overwrite each other, and each script
// loads exactly once per slot. Not sandboxed — Adsterra refuses to serve into an
// opaque-origin (sandboxed) frame, so ad code runs with this site's origin.

// Reports the ad document's height to the parent so variable-height units
// (native widget) can size their frame. The parent only accepts a clamped number.
const HEIGHT_REPORTER = `<script>(function(){var last=-1;function send(){var h=document.body?document.body.scrollHeight:0;if(h!==last){last=h;parent.postMessage({auraAdHeight:h},"*");}}new ResizeObserver(send).observe(document.documentElement);window.addEventListener("load",send);})();</script>`;

function buildDoc(body: string, autoHeight: boolean): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style></head><body>${body}${autoHeight ? HEIGHT_REPORTER : ""}</body></html>`;
}

type Props = {
  /** Provider snippet placed verbatim inside the frame's <body>. */
  body: string;
  /** Fixed width in px; omit for a fluid (100%) frame. */
  width?: number;
  /** Fixed height, or the reserved starting height when `autoHeight` is set. */
  height: number;
  /** Grow/shrink the frame to the ad document's content height (capped at maxHeight). */
  autoHeight?: boolean;
  maxHeight?: number;
  /** Only mount the ad when the viewport is at least this wide (px). */
  minViewportWidth?: number;
};

export default function AdFrame({
  body,
  width,
  height,
  autoHeight = false,
  maxHeight = 1200,
  minViewportWidth = 0,
}: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [fits, setFits] = useState(minViewportWidth === 0);
  const [frameHeight, setFrameHeight] = useState(height);
  const [doc] = useState(() => buildDoc(body, autoHeight));

  useEffect(() => {
    if (minViewportWidth === 0) return;
    const mq = window.matchMedia(`(min-width: ${minViewportWidth}px)`);
    const update = () => setFits(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minViewportWidth]);

  useEffect(() => {
    if (!autoHeight) return;
    function onMessage(e: MessageEvent) {
      if (e.source !== frameRef.current?.contentWindow) return;
      const h = (e.data as { auraAdHeight?: unknown } | null)?.auraAdHeight;
      if (typeof h === "number" && Number.isFinite(h)) {
        setFrameHeight(Math.min(Math.max(Math.round(h), 0), maxHeight));
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [autoHeight, maxHeight]);

  // Not mounted when the format doesn't fit — hidden ads must not load or count.
  if (!fits) return null;

  return (
    <iframe
      ref={frameRef}
      title="Advertisement"
      srcDoc={doc}
      loading="lazy"
      scrolling="no"
      width={width}
      height={frameHeight}
      className="block border-0 max-w-full"
      style={{ width: width ? `${width}px` : "100%", height: `${frameHeight}px` }}
    />
  );
}
