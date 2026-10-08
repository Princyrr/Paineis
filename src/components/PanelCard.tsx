import { useRef } from "react";
import type { MouseEvent } from "react";

import { Panel } from "../data/panels";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  panel: Panel;
  onClick: (panel: Panel) => void;
}

export function PanelCard({ panel, onClick }: Props) {
  const cardRef = useRef<HTMLButtonElement>(null);

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

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -18;
    const rotateY = (x / rect.width - 0.5) * 18;

    card.style.transform = `
      perspective(700px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.08)
    `;
  }

  function resetCard() {
    const card = cardRef.current;

    if (!card) return;

    card.style.transform = `
      perspective(700px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    console.log("PAINEL CLICADO:", panel.title);

    onClick(panel);
  }

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={resetCard}
      aria-label={`Abrir painel ${panel.title}`}
      className="
        relative
        overflow-hidden
        cursor-pointer
        group
        focus:outline-none
        select-none
      "
      style={{
        width: 180,
        height: 120,

        borderRadius: 12,

        transformStyle: "preserve-3d",

        background: `
          linear-gradient(
            145deg,
            rgba(255,255,255,.08),
            rgba(0,20,50,.85)
          )
        `,

        border: `1px solid ${panel.color}88`,

        boxShadow: `
          0 20px 40px rgba(0,0,0,.7),
          inset 0 0 30px ${panel.color}22,
          0 0 20px ${panel.color}44
        `,

        transition: "transform .15s ease, box-shadow .3s ease",

        WebkitTapHighlightColor: "transparent",

        touchAction: "manipulation",
      }}
    >
      {/* ============================================================
          IMAGEM
      ============================================================ */}

      <img
        src={panel.image}
        alt={panel.title}
        draggable={false}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
          pointer-events-none
        "
        style={{
          opacity: 0.9,
          transform: "translateZ(-20px)",
        }}
      />

      {/* ============================================================
          VIDRO ESCURO
      ============================================================ */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
        style={{
          background: `
            linear-gradient(
              180deg,
              transparent 30%,
              rgba(0,5,15,.85)
            )
          `,
        }}
      />

      {/* ============================================================
          REFLEXO HOLOGRÁFICO
      ============================================================ */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          pointer-events-none
        "
        style={{
          background: `
            linear-gradient(
              120deg,
              transparent 30%,
              rgba(255,255,255,.25),
              transparent 70%
            )
          `,
          transform: "translateX(-100%)",
          animation: "cardShine 3s infinite",
        }}
      />

      {/* ============================================================
          GRID TECNOLÓGICO
      ============================================================ */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
        style={{
          opacity: 0.08,

          backgroundImage: `
            linear-gradient(
              #00ffff 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              #00ffff 1px,
              transparent 1px
            )
          `,

          backgroundSize: "18px 18px",
        }}
      />

      {/* ============================================================
          CANTOS HUD
      ============================================================ */}

      {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
        <div
          key={pos}
          className={`
            absolute
            w-4
            h-4
            pointer-events-none

            ${pos === "top-left" ? "top-0 left-0 border-t border-l" : ""}

            ${pos === "top-right" ? "top-0 right-0 border-t border-r" : ""}

            ${pos === "bottom-left" ? "bottom-0 left-0 border-b border-l" : ""}

            ${
              pos === "bottom-right" ? "bottom-0 right-0 border-b border-r" : ""
            }
          `}
          style={{
            borderColor: panel.color,
          }}
        />
      ))}

      {/* ============================================================
          INFORMAÇÕES
      ============================================================ */}

      <div
        className="
          absolute
          top-2
          left-2
          right-2
          flex
          justify-between
          items-start
          pointer-events-none
        "
      >
        <span
          className="
            font-mono
            text-white
            text-left
          "
          style={{
            fontSize: 8,
            letterSpacing: ".08em",
            textShadow: "0 0 8px black",
            maxWidth: 140,
          }}
        >
          {panel.title.toUpperCase().slice(0, 22)}
        </span>

        <TrendIcon
          size={11}
          style={{
            color: trendColor,
            filter: `drop-shadow(0 0 5px ${trendColor})`,
            flexShrink: 0,
          }}
        />
      </div>

      {/* ============================================================
          BRILHO INFERIOR
      ============================================================ */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          pointer-events-none
        "
        style={{
          height: 20,

          background: `
            linear-gradient(
              0deg,
              ${panel.color}55,
              transparent
            )
          `,
        }}
      />

      {/* ============================================================
          INDICADOR DE CLIQUE
      ============================================================ */}

      <div
        className="
          absolute
          bottom-2
          left-2
          right-2
          flex
          justify-between
          items-center
          pointer-events-none
        "
      >
        <span
          className="
            font-mono
            text-white/60
          "
          style={{
            fontSize: 7,
            letterSpacing: ".12em",
          }}
        >
          ABRIR PAINEL
        </span>

        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: panel.color,
            boxShadow: `0 0 8px ${panel.color}`,
          }}
        />
      </div>
    </button>
  );
}
