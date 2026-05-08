"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroSkeleton />,
});

const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutSoft },
  },
};

const sceneEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, delay: 0.4, ease: easeOutSoft },
  },
};

function FloatingShapes() {
  const shapes = [
    {
      className:
        "left-[-6%] top-[18%] h-[22rem] w-[22rem] bg-[var(--gold)]/30",
      duration: 11,
      delay: 0,
    },
    {
      className:
        "right-[-8%] top-[42%] h-[26rem] w-[26rem] bg-[var(--camel)]/25",
      duration: 13,
      delay: 1.4,
    },
    {
      className:
        "left-[35%] bottom-[-12%] h-[18rem] w-[18rem] bg-[var(--cognac)]/15",
      duration: 9,
      delay: 0.7,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`absolute rounded-full blur-3xl mix-blend-multiply ${s.className}`}
          animate={{
            y: [0, -22, 0],
            x: [0, 10, 0],
            opacity: [0.55, 0.85, 0.55],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[var(--beige)] via-[var(--cream)] to-[var(--line)] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,97,0.18),transparent_60%)]" />
      <span className="relative text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]">
        Loading
      </span>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="section-cream relative overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[var(--cream)] via-[var(--cream)] to-[var(--beige)]/70" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_15%,rgba(201,169,97,0.18),transparent_55%)]" />
      <FloatingShapes />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-36 grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Left: copy */}
        <div>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="block h-px w-8 bg-[var(--camel)]" />
            <span className="eyebrow">Handmade in Pakistan</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl leading-[1.05] text-balance text-[var(--ink)]"
          >
            Ladies bags,
            <br />
            <span className="italic text-[var(--cognac)]">made the way</span>
            <br />
            you imagine them.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-[var(--muted)] text-lg leading-relaxed max-w-md"
          >
            From everyday totes to one-of-a-kind custom designs — Aura Manufacturers
            makes bags around your style, your fabric, your idea.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap gap-4"
          >
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="inline-block"
            >
              <Link href="/products" className="btn-brand">
                Browse Bags
              </Link>
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="inline-block"
            >
              <Link href="/custom-bags" className="btn-outline">
                Design Your Bag
              </Link>
            </motion.span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex items-center gap-6 text-[0.65rem] uppercase tracking-luxe text-[var(--muted)]"
          >
            <span>N° 01 · The Aura Story</span>
            <span className="block h-px flex-1 bg-[var(--line)] max-w-[180px]" />
            <Link href="/about" className="link-gold">
              Our story
            </Link>
          </motion.div>
        </div>

        {/* Right: 3D scene */}
        <motion.div
          variants={sceneEntrance}
          className="relative aspect-[4/5] border border-[var(--line)] bg-gradient-to-br from-[var(--beige)] via-[var(--cream)] to-[var(--line)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,97,0.2),transparent_60%)] pointer-events-none" />

          <div className="absolute inset-0">
            <HeroScene />
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[0.65rem] uppercase tracking-luxe text-[var(--muted)] z-10">
            <span>N° 01</span>
            <span>Aura Bags</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
