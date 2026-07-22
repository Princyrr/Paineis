export function BackgroundHud() {
  return (
    <div
      className="absolute left-1/2 bottom-[-260px] -translate-x-1/2 pointer-events-none"
      style={{
        width: 1700,
        height: 1700,
        opacity: 0.32,
        zIndex: 0,
      }}
    >
      {/* Glow 1 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(0,255,255,.18)",
          filter: "blur(70px)",
        }}
      />

      {/* Glow 2 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,170,255,.14), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Glow 3 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,120,255,.07), transparent 80%)",
          filter: "blur(170px)",
        }}
      />

      <svg
        viewBox="0 0 1000 1000"
        width="100%"
        height="100%"
        style={{
          overflow: "visible",
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="core">
            <stop offset="0%" stopColor="#00ffff" stopOpacity=".45" />
            <stop offset="40%" stopColor="#00bfff" stopOpacity=".18" />
            <stop offset="100%" stopColor="#00bfff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="500" cy="500" r="395" fill="none" stroke="transparent" />

        <circle cx="895" cy="500" r="4" fill="#7df9ff">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 500 500"
            to="360 500 500"
            dur="18s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Glow central */}
        <circle cx="500" cy="500" r="120" fill="url(#core)" />

        {/* Camada 1 */}
        <g
          filter="url(#glow)"
          style={{
            animation: "hudRotate 220s linear infinite",
            transformOrigin: "500px 500px",
          }}
        >
          <circle
            cx="500"
            cy="500"
            r="475"
            fill="none"
            stroke="#00e7ff"
            strokeWidth="1"
            opacity=".08"
          />

          <circle
            cx="500"
            cy="500"
            r="440"
            fill="none"
            stroke="#00e7ff"
            strokeWidth="2"
            strokeDasharray="6 18"
            opacity=".12"
          />

          <circle
            cx="500"
            cy="500"
            r="395"
            fill="none"
            stroke="#00ffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="170 70 35 260"
            opacity=".45"
          />

          <circle
            cx="500"
            cy="500"
            r="340"
            fill="none"
            stroke="#00d8ff"
            strokeWidth="2"
            strokeDasharray="40 16"
            opacity=".16"
          />
        </g>

        {/* Camada 2 */}
        <g
          style={{
            animation: "hudRotateReverse 170s linear infinite",
            transformOrigin: "500px 500px",
          }}
        >
          <circle
            cx="500"
            cy="500"
            r="295"
            fill="none"
            stroke="#00ffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="110 250"
            opacity=".42"
          />

          <circle
            cx="500"
            cy="500"
            r="250"
            fill="none"
            stroke="#00d8ff"
            strokeWidth="1"
            strokeDasharray="5 12"
            opacity=".18"
          />

          <circle
            cx="500"
            cy="500"
            r="205"
            fill="none"
            stroke="#00ffff"
            strokeWidth="2"
            strokeDasharray="70 150"
            opacity=".32"
          />
        </g>

        {/* Marcas externas */}
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 48;

          const x1 = 500 + Math.cos(a) * 450;
          const y1 = 500 + Math.sin(a) * 450;

          const x2 = 500 + Math.cos(a) * 430;
          const y2 = 500 + Math.sin(a) * 430;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#00ffff"
              strokeWidth="1.5"
              opacity=".18"
            />
          );
        })}

        {/* Nós brilhantes */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 16;

          const x = 500 + Math.cos(a) * 395;
          const y = 500 + Math.sin(a) * 395;

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#00ffff"
              opacity=".55"
              filter="url(#glow)"
            />
          );
        })}

        {/* Cruz central */}
        <line
          x1="500"
          y1="120"
          x2="500"
          y2="880"
          stroke="#00ffff"
          opacity=".05"
        />

        <line
          x1="120"
          y1="500"
          x2="880"
          y2="500"
          stroke="#00ffff"
          opacity=".05"
        />
      </svg>
    </div>
  );
}
