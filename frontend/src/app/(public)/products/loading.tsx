export default function ProductsLoading() {
  return (
    <>
      <section className="section-cream relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
          <div className="h-3 w-24 bg-[var(--line)] rounded mb-5 animate-pulse" />
          <div className="h-12 w-72 bg-[var(--line)] rounded mb-4 animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-[var(--line)] rounded animate-pulse" />
        </div>
      </section>

      <section className="section-beige section-decor relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[4/5] bg-[var(--line)] mb-5 animate-pulse" />
                <div className="h-4 w-3/4 bg-[var(--line)] rounded mb-2 animate-pulse" />
                <div className="h-3 w-1/3 bg-[var(--line)] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
