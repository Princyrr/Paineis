import { Panel } from "../data/panels";

interface Props {
  panel: Panel;
  width?: number;
  height?: number;
}

export function MiniChart({ panel, width = 440, height = 55 }: Props) {
  const { values, chartType, color } = panel;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pad = 4;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const normalize = (v: number) => pad + h - ((v - min) / range) * h;
  const x = (i: number) => pad + (i / (values.length - 1)) * w;

  if (chartType === "bar") {
    const barW = w / values.length - 2;
    return (
      <svg width={width} height={height}>
        {values.map((v, i) => {
          const bh = ((v - min) / range) * h || 2;
          return (
            <rect
              key={i}
              x={pad + i * (w / values.length) + 1}
              y={pad + h - bh}
              width={barW}
              height={bh}
              fill={color}
              opacity={0.7 + (i / values.length) * 0.3}
              rx={1}
            />
          );
        })}
      </svg>
    );
  }

  if (chartType === "scatter") {
    return (
      <svg width={width} height={height}>
        {values.map((v, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={normalize(v)}
            r={2.5}
            fill={color}
            opacity={0.8}
          />
        ))}
      </svg>
    );
  }

  if (chartType === "radar") {
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(cx, cy) - pad;
    const pts = values.slice(0, 8).map((v, i) => {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const nr = ((v - min) / range) * r;
      return `${cx + Math.cos(angle) * nr},${cy + Math.sin(angle) * nr}`;
    });
    const gridPts = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
    });
    return (
      <svg width={width} height={height}>
        <polygon
          points={gridPts.join(" ")}
          fill="none"
          stroke={color}
          strokeOpacity={0.2}
          strokeWidth={0.5}
        />
        <polygon
          points={pts.join(" ")}
          fill={color}
          fillOpacity={0.25}
          stroke={color}
          strokeWidth={1}
        />
      </svg>
    );
  }

  const points = values.map((v, i) => `${x(i)},${normalize(v)}`).join(" ");
  const areaPoints = `${x(0)},${pad + h} ${points} ${x(values.length - 1)},${pad + h}`;

  return (
    <svg width={width} height={height}>
      <defs>
        <linearGradient id={`grad-${panel.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {chartType === "area" && (
        <polygon points={areaPoints} fill={`url(#grad-${panel.id})`} />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={normalize(v)} r={1.5} fill={color} />
      ))}
    </svg>
  );
}
