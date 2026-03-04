export default function WaveMesh() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Deep ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 80%, rgba(15, 52, 96, 0.5) 0%, transparent 70%), " +
            "radial-gradient(ellipse 60% 40% at 85% 15%, rgba(26, 26, 62, 0.4) 0%, transparent 60%), " +
            "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(22, 33, 62, 0.6) 0%, transparent 50%)",
        }}
      />

      {/* Flowing wave lines - layer 1 */}
      <svg
        className="absolute w-[140%] h-[80%] bottom-0 left-[-20%] opacity-[0.07]"
        viewBox="0 0 1400 600"
        fill="none"
        preserveAspectRatio="none"
        style={{ animation: "wave-flow-1 18s ease-in-out infinite alternate" }}
      >
        {Array.from({ length: 20 }, (_, i) => {
          const y = 50 + i * 28;
          const offset = i * 12;
          return (
            <path
              key={`w1-${i}`}
              d={`M-50 ${y + offset} C200 ${y - 40 + offset} 400 ${y + 50 + offset} 700 ${y + offset} S1100 ${y - 30 + offset} 1450 ${y + 20 + offset}`}
              stroke="rgba(96, 165, 250, 0.6)"
              strokeWidth="1"
              fill="none"
            />
          );
        })}
      </svg>

      {/* Flowing wave lines - layer 2 (cross direction) */}
      <svg
        className="absolute w-[130%] h-[70%] bottom-[-5%] left-[-15%] opacity-[0.04]"
        viewBox="0 0 1400 600"
        fill="none"
        preserveAspectRatio="none"
        style={{ animation: "wave-flow-2 22s ease-in-out infinite alternate" }}
      >
        {Array.from({ length: 15 }, (_, i) => {
          const y = 30 + i * 38;
          const offset = i * 8;
          return (
            <path
              key={`w2-${i}`}
              d={`M-50 ${y + offset} C300 ${y + 60 + offset} 500 ${y - 30 + offset} 800 ${y + 15 + offset} S1200 ${y + 40 + offset} 1450 ${y + offset}`}
              stroke="rgba(167, 139, 250, 0.5)"
              strokeWidth="1"
              fill="none"
            />
          );
        })}
      </svg>

      {/* Subtle grid overlay */}
      <svg
        className="absolute w-full h-full opacity-[0.02]"
        style={{ animation: "mesh-drift 25s ease-in-out infinite alternate" }}
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(96, 165, 250, 0.5)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="grid-mask" cx="30%" cy="70%" r="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-fade">
            <rect width="100%" height="100%" fill="url(#grid-mask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#grid-fade)" />
      </svg>
    </div>
  );
}
