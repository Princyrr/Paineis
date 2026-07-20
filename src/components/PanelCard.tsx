import { Panel } from "../data/panels";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  panel: Panel;
  onClick: () => void;
}

export function PanelCard({ panel, onClick }: Props) {
  const TrendIcon =
    panel.trend === "up"
      ? TrendingUp
      : panel.trend === "down"
        ? TrendingDown
        : Minus;
  const trendColor =
    panel.trend === "up"
      ? "#00ff88"
      : panel.trend === "down"
        ? "#ff4444"
        : "#ffcc00";

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col cursor-pointer group focus:outline-none overflow-hidden"
      style={{
        width: 180,
        height: 120,
        background:
          "linear-gradient(135deg, rgba(0,20,50,0.92) 0%, rgba(0,10,35,0.96) 100%)",
        border: `1px solid ${panel.color}55`,
        borderRadius: 8,
        boxShadow: `0 0 18px ${panel.color}33, 0 4px 24px rgba(0,0,0,0.7)`,
        transition: "box-shadow 0.25s, border-color 0.25s, transform 0.25s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 32px ${panel.color}77, 0 8px 32px rgba(0,0,0,0.8)`;
        (e.currentTarget as HTMLElement).style.borderColor = `${panel.color}aa`;
        (e.currentTarget as HTMLElement).style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 18px ${panel.color}33, 0 4px 24px rgba(0,0,0,0.7)`;
        (e.currentTarget as HTMLElement).style.borderColor = `${panel.color}55`;
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      {/* Image fills the card */}
      <img
        src={panel.image}
        alt={panel.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.75 }}
        draggable={false}
      />

      {/* Color tint overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${panel.color}11 0%, transparent 40%, rgba(0,5,15,0.85) 100%)`,
        }}
      />

      {/* Corner decorations */}
      <div
        className="absolute top-0 left-0 w-3 h-3 border-t border-l rounded-tl-lg"
        style={{ borderColor: panel.color, opacity: 0.9 }}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3 border-t border-r rounded-tr-lg"
        style={{ borderColor: panel.color, opacity: 0.9 }}
      />
      <div
        className="absolute bottom-0 left-0 w-3 h-3 border-b border-l rounded-bl-lg"
        style={{ borderColor: panel.color, opacity: 0.9 }}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 border-b border-r rounded-br-lg"
        style={{ borderColor: panel.color, opacity: 0.9 }}
      />

      {/* Top bar: title + trend */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 py-1.5">
        <span
          className="font-mono text-white truncate"
          style={{
            fontSize: 8,
            letterSpacing: "0.05em",
            textShadow: "0 1px 4px rgba(0,0,0,0.9)",
          }}
        >
          {panel.title.toUpperCase().slice(0, 22)}
        </span>
        <TrendIcon
          size={9}
          style={{
            color: trendColor,
            flexShrink: 0,
            filter: "drop-shadow(0 0 3px rgba(0,0,0,0.8))",
          }}
        />
      </div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.05 }}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="w-full"
            style={{ height: 1, background: "#fff", marginBottom: 6 }}
          />
        ))}
      </div>
    </button>
  );
}
