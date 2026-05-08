import Reveal from "@/components/Reveal";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Business Hours — Aura Manufacturers Lahore Workshop",
  description:
    "Visiting hours for Aura Manufacturers' Lahore ladies bag workshop. Open six days a week for retail customers and wholesale buyers.",
  alternates: { canonical: "/timing" },
};

const hours = [
  { day: "Monday", time: "10:00 AM – 8:00 PM" },
  { day: "Tuesday", time: "10:00 AM – 8:00 PM" },
  { day: "Wednesday", time: "10:00 AM – 8:00 PM" },
  { day: "Thursday", time: "10:00 AM – 8:00 PM" },
  { day: "Friday", time: "2:30 PM – 8:00 PM" },
  { day: "Saturday", time: "10:00 AM – 8:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function TimingPage() {
  return (
    <>
      <section className="section-cream relative overflow-hidden">
        <div className="blob blob-gold blob-drift-slow w-[24rem] h-[24rem] -right-20 -top-16 opacity-35" />
        <div className="blob blob-camel w-[18rem] h-[18rem] -left-16 top-32 opacity-25" />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 pt-24 pb-12">
          <Reveal>
            <p className="eyebrow mb-5">When to reach us</p>
            <h1 className="font-display text-5xl md:text-6xl text-[var(--ink)] mb-5">
              Business <span className="italic text-[var(--cognac)]">Hours.</span>
            </h1>
            <p className="text-[var(--muted)] text-lg max-w-lg">
              When our shop is open and you can reach us on WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="divider-gold py-4">
          <span className="dot" />
        </div>
      </div>

      <section className="section-beige section-decor relative overflow-hidden">
        <div className="blob blob-cognac w-[20rem] h-[20rem] -left-20 bottom-0 opacity-35" />

        <div className="relative mx-auto max-w-2xl px-6 lg:px-10 py-20">
          <Reveal>
            <div className="relative bg-[var(--cream)] border border-[var(--line)] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent z-10" />
              <ul className="divide-y divide-[var(--line)]">
              {hours.map((h) => {
                const closed = h.time === "Closed";
                return (
                  <li
                    key={h.day}
                    className="flex items-center justify-between px-8 py-6 transition-colors duration-400 ease-out-soft hover:bg-[var(--beige)]/40"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`block h-1.5 w-1.5 rounded-full ${
                          closed ? "bg-[var(--line)]" : "bg-[var(--gold)]"
                        }`}
                      />
                      <span className="font-display text-lg text-[var(--ink)]">{h.day}</span>
                    </span>
                    <span
                      className={
                        closed
                          ? "text-[0.7rem] uppercase tracking-luxe text-[var(--muted)]"
                          : "text-[var(--muted)]"
                      }
                    >
                      {h.time}
                    </span>
                  </li>
                );
              })}
              </ul>
            </div>
          </Reveal>
          <p className="text-[0.7rem] uppercase tracking-luxe text-[var(--muted)] mt-6">
            Times are PKT · Replies during off-hours arrive the next working day
          </p>
        </div>
      </section>
    </>
  );
}
