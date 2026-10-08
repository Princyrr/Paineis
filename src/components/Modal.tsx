import { X, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

import type { MouseEvent } from "react";
import type { Panel } from "../data/panels";

interface ModalProps {
  panel: Panel | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ panel, isOpen, onClose }: ModalProps) {
  if (!isOpen || !panel) {
    return null;
  }

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

  function normalizeUrl(url: string) {
    const cleanUrl = url.trim();

    if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
      return cleanUrl;
    }

    return `https://${cleanUrl}`;
  }

  /**
   * Impede que o clique no botão
   * seja interpretado pelo overlay do modal.
   */
  function handleLinkClick(e: MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();

    const url = normalizeUrl(panel.link);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100000]
        backdrop-blur-xl
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          h-screen
          w-screen
          overflow-y-auto
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(5,20,45,.98) 0%, rgba(3,10,25,.98) 100%)",
        }}
      >
        {/* ============================================================
            GLOW
        ============================================================ */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            blur-[140px]
          "
          style={{
            background: `${panel.color}20`,
          }}
        />

        {/* ============================================================
            BOTÃO FECHAR
        ============================================================ */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar painel"
          className="
            fixed
            right-8
            top-8
            z-[100]
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/60
            text-white
            transition-all
            duration-300
            hover:scale-110
            hover:border-red-400/50
            hover:bg-red-500
          "
        >
          <X size={22} />
        </button>

        {/* ============================================================
            IMAGEM
        ============================================================ */}

        <div
          className="
            relative
            h-[60vh]
            min-h-[500px]
            overflow-hidden
          "
        >
          <img
            src={panel.image}
            alt={panel.title}
            draggable={false}
            className="
              h-full
              w-full
              object-cover
              object-top
            "
          />

          {/* Gradiente inferior */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-48
            "
            style={{
              background: "linear-gradient(transparent, rgba(3,10,25,1))",
            }}
          />
        </div>

        {/* ============================================================
            CONTEÚDO
        ============================================================ */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-8
            py-12
            text-white
          "
        >
          {/* Badge */}

          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              px-5
              py-2
            "
            style={{
              background: `${panel.color}20`,
              border: `1px solid ${panel.color}55`,
            }}
          >
            <TrendIcon size={18} color={trendColor} />

            <span
              className="
                uppercase
                tracking-[3px]
              "
              style={{
                color: panel.color,
                fontSize: 12,
              }}
            >
              Dashboard
            </span>
          </div>

          {/* Título */}

          <h1
            className="
              mb-6
              text-5xl
              font-bold
              leading-tight
              md:text-6xl
            "
          >
            {panel.title}
          </h1>

          {/* Descrição */}

          <p
            className="
              max-w-5xl
              text-lg
              leading-9
              text-gray-300
              md:text-xl
            "
          >
            {panel.description}
          </p>

          {/* ============================================================
              BOTÃO ACESSAR DASHBOARD
          ============================================================ */}

          {panel.link && (
            <button
              type="button"
              onClick={handleLinkClick}
              className="
                mt-12
                inline-flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                px-8
                py-4
                text-lg
                font-semibold
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-2xl
                active:scale-95
              "
              style={{
                background: panel.color,
                color: "#08111d",
                boxShadow: `0 0 30px ${panel.color}44`,
              }}
            >
              Acessar Dashboard
              <ExternalLink size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
