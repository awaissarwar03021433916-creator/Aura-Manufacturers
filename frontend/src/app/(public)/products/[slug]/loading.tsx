export default function ProductDetailLoading() {
  return (
    <section className="section-cream relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 grid md:grid-cols-2 gap-16">
        <div className="aspect-[4/5] bg-[var(--line)] animate-pulse" />
        <div className="md:pt-6">
          <div className="h-3 w-20 bg-[var(--line)] rounded mb-5 animate-pulse" />
          <div className="h-10 w-3/4 bg-[var(--line)] rounded mb-6 animate-pulse" />
          <div className="h-6 w-32 bg-[var(--line)] rounded mb-10 animate-pulse" />
          <div className="space-y-3 mb-12">
            <div className="h-3 w-full bg-[var(--line)] rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-[var(--line)] rounded animate-pulse" />
            <div className="h-3 w-4/6 bg-[var(--line)] rounded animate-pulse" />
          </div>
          <div className="h-11 w-48 bg-[var(--line)] rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
}
