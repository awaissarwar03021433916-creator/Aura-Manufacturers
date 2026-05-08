// Pre-compiles every public + admin route by quietly fetching them once,
// so the first real browser visit is instant (no cold-compile delay).
// Runs alongside `next dev` via the "dev" script.

const ORIGIN = process.env.WARM_ORIGIN ?? "http://localhost:3000";
const ROUTES = [
  "/",
  "/products",
  "/garments",
  "/custom-bags",
  "/blog",
  "/about",
  "/timing",
  "/location",
  "/contact",
  "/admin/login",
  "/admin",
];

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(ORIGIN, { method: "HEAD" });
      if (r.status < 500) return true;
    } catch { /* server not up yet */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function warm() {
  if (!(await waitForServer())) {
    console.log("[warm] dev server didn't come up in 60s, giving up");
    return;
  }
  console.log("[warm] pre-compiling routes…");
  for (const path of ROUTES) {
    const t0 = Date.now();
    try {
      await fetch(ORIGIN + path, { redirect: "manual" });
      console.log(`[warm] ${path}  (${Date.now() - t0}ms)`);
    } catch (e) {
      console.log(`[warm] ${path}  failed: ${e.message ?? e}`);
    }
  }
  console.log("[warm] done — every route is now hot.");
}

warm();
