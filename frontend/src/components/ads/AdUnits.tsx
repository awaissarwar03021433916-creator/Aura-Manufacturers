import AdFrame from "./AdFrame";
import { ADS_ENABLED, BANNER_160x300, BANNER_728x90, NATIVE_BANNER } from "./config";

// Provider's banner snippet, unchanged. It runs inside its own AdFrame document,
// so this `atOptions` is private to that frame.
function bannerBody(b: { key: string; src: string; width: number; height: number }) {
  return `<script>atOptions = {'key' : '${b.key}','format' : 'iframe','height' : ${b.height},'width' : ${b.width},'params' : {}};</script><script src="${b.src}"></script>`;
}

// Provider's native snippet, unchanged: async script immediately followed by its container.
// Both are parsed from one srcdoc chunk, so the container exists before the script can run.
const NATIVE_BODY = `<script async="async" data-cfasync="false" src="${NATIVE_BANNER.src}"></script><div id="container-${NATIVE_BANNER.key}"></div>`;

function AdLabel() {
  return (
    <p className="mb-2 text-center text-[0.6rem] uppercase tracking-luxe text-[var(--muted)] opacity-70">
      Advertisement
    </p>
  );
}

/** 728×90 leaderboard. Only rendered on viewports ≥1024px, where it fits the content column. */
export function Banner728x90() {
  if (!ADS_ENABLED) return null;
  return (
    <aside aria-label="Advertisement" className="hidden lg:block mx-auto max-w-7xl px-6 lg:px-10 py-6">
      <AdLabel />
      <div className="mx-auto" style={{ width: BANNER_728x90.width, minHeight: BANNER_728x90.height }}>
        <AdFrame
          body={bannerBody(BANNER_728x90)}
          width={BANNER_728x90.width}
          height={BANNER_728x90.height}
          minViewportWidth={1024}
        />
      </div>
    </aside>
  );
}

/** 160×300 banner for secondary columns; fits every viewport width. */
export function Banner160x300({ className = "" }: { className?: string }) {
  if (!ADS_ENABLED) return null;
  return (
    <aside aria-label="Advertisement" className={className}>
      <AdLabel />
      <div className="mx-auto" style={{ width: BANNER_160x300.width, minHeight: BANNER_160x300.height }}>
        <AdFrame
          body={bannerBody(BANNER_160x300)}
          width={BANNER_160x300.width}
          height={BANNER_160x300.height}
        />
      </div>
    </aside>
  );
}

/** Native widget; fluid width, frame height follows the rendered widget. */
export function NativeBannerAd({ className = "" }: { className?: string }) {
  if (!ADS_ENABLED) return null;
  return (
    <aside aria-label="Advertisement" className={className}>
      <AdLabel />
      <AdFrame body={NATIVE_BODY} height={280} autoHeight maxHeight={900} />
    </aside>
  );
}
