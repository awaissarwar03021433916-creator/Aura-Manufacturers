export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 overflow-hidden">
      <div className="h-full w-1/3 bg-[var(--gold)] animate-[loading-bar_1.1s_ease-in-out_infinite]" />
      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
