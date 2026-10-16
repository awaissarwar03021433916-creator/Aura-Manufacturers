// Ad network configuration + on/off switches.
//
// Switches are NEXT_PUBLIC_ env vars (inlined at build time — redeploy after changing):
//   NEXT_PUBLIC_ADS_ENABLED=true     master switch for every ad below   (default: off)
//   NEXT_PUBLIC_ADS_SOCIAL_BAR=true  enable the Social Bar overlay      (default: off)
//   NEXT_PUBLIC_ADS_POPUNDER=true    enable the Popunder                (default: off)
//
// Ads never load outside production builds (`next dev`), matching the analytics
// components, so local development doesn't generate fake impressions.

function flag(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === "") return fallback;
  return value.toLowerCase() === "true";
}

export const ADS_ENABLED =
  process.env.NODE_ENV === "production" &&
  flag(process.env.NEXT_PUBLIC_ADS_ENABLED, false);

export const SOCIAL_BAR_ENABLED =
  ADS_ENABLED && flag(process.env.NEXT_PUBLIC_ADS_SOCIAL_BAR, false);

export const POPUNDER_ENABLED =
  ADS_ENABLED && flag(process.env.NEXT_PUBLIC_ADS_POPUNDER, false);

export const NATIVE_BANNER = {
  key: "c570e983f25a8a2288eabc4a6c6eb432",
  src: "https://bicea.org/21/c570e983f25a8a2288eabc4a6c6eb432",
} as const;

export const BANNER_728x90 = {
  key: "f2336389de61ec5dd315b849ef333310",
  src: "https://bicea.org/22/f2336389de61ec5dd315b849ef333310",
  width: 728,
  height: 90,
} as const;

export const BANNER_160x300 = {
  key: "e5158892b9c95422f6d0340141ceb0ef",
  src: "https://bicea.org/22/e5158892b9c95422f6d0340141ceb0ef",
  width: 160,
  height: 300,
} as const;

export const SOCIAL_BAR_SRC = "https://bicea.org/14/d2cd7d0f9b52ad68b2480b1bc6f10673";
export const POPUNDER_SRC = "https://afders.org/1/bca69cfa253effcb7ae1f3957b1d650a";
