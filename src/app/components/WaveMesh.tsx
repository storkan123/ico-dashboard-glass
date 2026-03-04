export default function WaveMesh() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Deep ambient glow — anchored bottom-left like terrain catching light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 75%, rgba(96, 165, 250, 0.08) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(167, 139, 250, 0.05) 0%, transparent 50%), " +
            "radial-gradient(ellipse 90% 50% at 50% 100%, rgba(52, 211, 153, 0.04) 0%, transparent 40%)",
        }}
      />

      {/* Primary terrain waves — dense flowing lines, bottom-heavy */}
      <svg
        className="absolute w-[160%] h-[90%] bottom-[-5%] left-[-30%]"
        viewBox="0 0 1600 800"
        fill="none"
        preserveAspectRatio="none"
        style={{
          opacity: 0.18,
          animation: "wave-flow-1 20s ease-in-out infinite alternate",
        }}
      >
        {Array.from({ length: 35 }, (_, i) => {
          const y = 30 + i * 22;
          const curve1 = 40 + Math.sin(i * 0.4) * 30;
          const curve2 = -30 + Math.cos(i * 0.3) * 25;
          const curve3 = 20 + Math.sin(i * 0.5) * 35;
          const strokeOpacity = i < 10 ? 0.3 + i * 0.05 : i > 28 ? 0.8 - (i - 28) * 0.08 : 0.8;
          return (
            <path
              key={`t1-${i}`}
              d={`M-100 ${y} C300 ${y + curve1} 600 ${y + curve2} 900 ${y + curve3} S1300 ${y + curve1 * 0.7} 1700 ${y + curve2 * 0.5}`}
              stroke={`rgba(180, 200, 230, ${strokeOpacity})`}
              strokeWidth={i % 5 === 0 ? "1.2" : "0.6"}
              fill="none"
            />
          );
        })}
      </svg>

      {/* Secondary wave layer — cross-flowing, violet tint */}
      <svg
        className="absolute w-[140%] h-[80%] bottom-[-10%] left-[-20%]"
        viewBox="0 0 1600 800"
        fill="none"
        preserveAspectRatio="none"
        style={{
          opacity: 0.1,
          animation: "wave-flow-2 26s ease-in-out infinite alternate",
        }}
      >
        {Array.from({ length: 25 }, (_, i) => {
          const y = 50 + i * 28;
          const wave = 50 + Math.sin(i * 0.6) * 40;
          const drift = Math.cos(i * 0.25) * 20;
          return (
            <path
              key={`t2-${i}`}
              d={`M-80 ${y + drift} C350 ${y + wave} 650 ${y - wave * 0.6} 950 ${y + wave * 0.8} S1350 ${y - wave * 0.4} 1700 ${y + drift}`}
              stroke={`rgba(167, 139, 250, ${0.3 + Math.sin(i * 0.3) * 0.2})`}
              strokeWidth="0.5"
              fill="none"
            />
          );
        })}
      </svg>

      {/* Accent highlight lines — brighter, fewer, to add depth */}
      <svg
        className="absolute w-[150%] h-[70%] bottom-0 left-[-25%]"
        viewBox="0 0 1600 600"
        fill="none"
        preserveAspectRatio="none"
        style={{
          opacity: 0.12,
          animation: "mesh-drift 30s ease-in-out infinite alternate",
        }}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const y = 80 + i * 65;
          const amp = 50 + i * 8;
          return (
            <path
              key={`h-${i}`}
              d={`M-50 ${y} C250 ${y + amp} 550 ${y - amp * 0.7} 850 ${y + amp * 0.5} S1250 ${y - amp * 0.3} 1650 ${y + amp * 0.2}`}
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="1.5"
              fill="none"
            />
          );
        })}
      </svg>

      {/* Bottom edge fade — darkens the very bottom for content readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, #0b0f1a, transparent)",
        }}
      />
    </div>
  );
}
