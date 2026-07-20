import { X, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import { Panel } from "../data/panels";

interface ModalProps {
  panel: Panel | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ panel, isOpen, onClose }: ModalProps) {
  if (!isOpen || !panel) return null;

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
    <div
      className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-screen w-screen overflow-y-auto"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,20,45,.98) 0%, rgba(3,10,25,.98) 100%)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{
            background: `${panel.color}20`,
          }}
        />

        {/* Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="fixed right-8 top-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/60 transition hover:scale-110 hover:bg-red-500"
        >
          <X size={22} color="white" />
        </button>

        {/* Imagem */}
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img
            src={panel.image}
            alt={panel.title}
            className="h-full w-full object-cover object-top"
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to top,
                rgba(3,10,25,.98),
                rgba(3,10,25,.45),
                transparent
              )`,
            }}
          />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto max-w-7xl px-8 py-12 text-white">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2"
            style={{
              background: `${panel.color}20`,
              border: `1px solid ${panel.color}55`,
            }}
          >
            <TrendIcon size={18} color={trendColor} />

            <span
              className="uppercase tracking-[3px]"
              style={{
                color: panel.color,
                fontSize: 12,
              }}
            >
              Dashboard
            </span>
          </div>

          <h1 className="mb-6 text-6xl font-bold leading-tight">
            {panel.title}
          </h1>

          <p className="max-w-5xl text-xl leading-10 text-gray-300">
            {panel.description}
          </p>

          {/* Botão */}
          {panel.link && (
            <a
              href={panel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: panel.color,
                color: "#08111d",
              }}
            >
              Acessar Dashboard
              <ExternalLink size={22} />
            </a>
          )}
        </div>

        {/* Scan Lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 80 }).map((_, index) => (
            <div
              key={index}
              style={{
                height: 2,
                background: "#ffffff",
                marginBottom: 8,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
