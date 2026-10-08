import { useEffect, useRef, useState } from "react";
import { panels, Panel } from "../../data/panels";
import { PanelCard } from "../PanelCard";
import fundo2 from "../../assets/fundo2.png";

interface ScatterPos {
  baseAngle: number;
  radius: number;
  yOffset: number;
  floatDelay: number;
  floatDuration: number;
  size: number;
}

interface FutureVisionProps {
  active: boolean;
  rotation: number;
  positions: ScatterPos[];
  onExit: () => void;
  onSelect: (panel: Panel) => void;
}

export function FutureVision({
  active,
  rotation,
  positions,
  onExit,
  onSelect,
}: FutureVisionProps) {
  const [viewRotation, setViewRotation] = useState(0);
  const [detachedPanels, setDetachedPanels] = useState<
    Record<number, { x: number; y: number }>
  >({});

  const [draggingPanel, setDraggingPanel] = useState<number | null>(null);
  const [returningPanels, setReturningPanels] = useState<Set<number>>(
    new Set(),
  );

  const panelWasDragged = useRef(false);

  const currentDragPosition = useRef({
    x: 0,
    y: 0,
  });
  const targetRotation = useRef(0);

  const dragging = useRef(false);

  const lastMouseX = useRef(0);

  const animationFrame = useRef<number | null>(null);

  /*
   * ============================================================
   * RESET DA CÂMERA
   * ============================================================
   */

  useEffect(() => {
    if (!active) {
      setViewRotation(0);

      targetRotation.current = 0;

      dragging.current = false;
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;

    let running = true;

    const animate = () => {
      if (!running) return;

      setViewRotation((current) => {
        const target = targetRotation.current;

        let difference = target - current;

        if (difference > 180) {
          difference -= 360;
        }

        if (difference < -180) {
          difference += 360;
        }

        const smoothness = 0.12;

        let next = current + difference * smoothness;

        if (next >= 360) next -= 360;

        if (next < 0) next += 360;

        return next;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      running = false;

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [active]);

  /*
   * ============================================================
   * CONTROLE DA CÂMERA
   * ============================================================
   */

  useEffect(() => {
    if (!active) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      /*
       * Botões não movimentam a câmera.
       */

      if (target.closest("button")) return;

      /*
       * Se clicou em um painel, não começa
       * o movimento da câmera.
       */

      if (target.closest("[data-panel]")) return;

      dragging.current = true;

      lastMouseX.current = e.clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;

      const dx = e.clientX - lastMouseX.current;

      /*
       * Sensibilidade da cabeça.
       */

      const sensitivity = 0.18;

      targetRotation.current += dx * sensitivity;

      lastMouseX.current = e.clientX;
    };

    const handlePointerUp = () => {
      dragging.current = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);

    window.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);

      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 52%, #063344 0%, #002536 32%, #00121f 62%, #00060d 100%)",
        /*
         * ========================================================
         * PERSPECTIVA DA VISÃO HUMANA
         * ========================================================
         */

        perspective: "1800px",

        perspectiveOrigin: "50% 50%",

        cursor: dragging.current ? "grabbing" : "grab",

        touchAction: "none",
      }}
    >
      {/* =========================================================
          FUNDO DO LABORATÓRIO
      ========================================================= */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${fundo2})`,

          backgroundSize: "cover",

          backgroundPosition: "center center",

          backgroundRepeat: "no-repeat",

          opacity: 0.38,

          filter: "brightness(0.72) saturate(1.08) contrast(1.05)",

          zIndex: 0,
        }}
      />

      {/* =========================================================
    LUZ AMBIENTE DA PLATAFORMA
========================================================= */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,

          background:
            "radial-gradient(ellipse at 50% 100%, rgba(150,240,255,0.14) 0%, rgba(150,240,255,0.08) 22%, rgba(150,240,255,0.035) 42%, transparent 68%), radial-gradient(ellipse at 50% 52%, rgba(150,240,255,0.05) 0%, rgba(150,240,255,0.025) 30%, transparent 60%)",

          filter: "blur(12px)",

          mixBlendMode: "screen",

          opacity: 0.9,
        }}
      />

      {/* =========================================================
    LUZ VERTICAL DA PLATAFORMA
    ========================================================= */}

      <div
        className="absolute left-1/2 bottom-0 pointer-events-none"
        style={{
          transform: "translateX(-50%)",

          width: "55vw",

          height: "70vh",

          background:
            "radial-gradient(ellipse at center bottom, rgba(150,240,255,0.15) 0%, rgba(150,240,255,0.08) 25%, rgba(150,240,255,0.035) 48%, transparent 72%)",

          filter: "blur(45px)",

          mixBlendMode: "screen",

          opacity: 0.75,

          zIndex: 1,
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",

          width: "35vw",

          height: "35vw",

          maxWidth: 600,

          maxHeight: 600,

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(150,240,255,0.05) 0%, rgba(150,240,255,0.02) 35%, transparent 70%)",
          filter: "blur(35px)",

          mixBlendMode: "screen",

          zIndex: 1,
        }}
      />

      {/* =========================================================
    PARTÍCULAS DA PLATAFORMA
========================================================= */}

      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          zIndex: 2,
        }}
      >
        {Array.from({ length: 35 }, (_, i) => {
          // Espalhamento horizontal determinístico
          const spreadX = Math.sin(i * 2.37) * 42;
          const randomX = Math.cos(i * 1.73) * 18;

          // Alturas diferentes de nascimento
          const startBottom = -20 + (i % 8) * 10;

          // Pequena variação de tamanho
          const size = i % 6 === 0 ? 4 : i % 3 === 0 ? 3 : 2;

          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `calc(50% + ${spreadX + randomX}vw)`,

                bottom: `${startBottom}px`,

                width: size,

                height: size,

                background:
                  i % 5 === 0
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(150,240,255,0.8)",

                boxShadow:
                  i % 5 === 0
                    ? "0 0 8px rgba(190,250,255,.8), 0 0 18px rgba(0,212,255,.45)"
                    : "0 0 7px rgba(0,212,255,.7)",

                animation: `
            futureParticleFloat
            ${8 + (i % 5) * 1.5}s
            ease-in-out
            infinite
          `,

                animationDelay: `${(i * 0.65) % 7}s`,

                opacity: 0.35 + (i % 4) * 0.12,

                willChange: "transform, opacity",
              }}
            />
          );
        })}
      </div>

      {/* =========================================================
          MUNDO 3D
      ========================================================= */}

      <div
        className="absolute inset-0"
        style={{
          perspective: "2100px",

          perspectiveOrigin: "50% 50%",

          zIndex: 2,

          overflow: "hidden",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 0,

            height: 0,

            transformStyle: "preserve-3d",
          }}
        >
          {panels.map((panel, i) => {
            const pos = positions[i];

            const angleVariation = ((i % 5) - 2) * 2;

            const worldAngle = pos.baseAngle + angleVariation + rotation * 0.25;

            const relativeAngle = ((worldAngle - viewRotation) * Math.PI) / 180;

            const radius = 1020;

            // Desloca todo o conjunto de painéis um pouco para a direita
            const panelOffsetX = 170;

            const detached = detachedPanels[panel.id];
            const isReturning = returningPanels.has(panel.id);

            const orbitX = Math.sin(relativeAngle) * radius + panelOffsetX;
            const orbitZ = -Math.cos(relativeAngle) * radius;

            const verticalVariation = ((i % 5) - 2) * 140;
            const orbitY = verticalVariation;

            const depth = Math.cos(relativeAngle);
            if (depth <= -0.05) {
              return null;
            }
            const frontDepth = Math.max(0, depth);
            const centerFactor = Math.max(
              0,
              1 - Math.abs(relativeAngle) / (Math.PI / 2),
            );

            const scale = 2.05 + centerFactor * 0.28;

            const opacity = 0.92 + centerFactor * 0.08;

            const blur = 0;

            const zIndex = Math.round((frontDepth + centerFactor) * 1000);

            return (
              <div
                key={panel.id}
                data-panel
                className="absolute"
                onTransitionEnd={(e) => {
                  // Só nos interessa a transição do transform
                  if (e.propertyName !== "transform") return;

                  // Se esse painel não estava retornando,
                  // não fazemos nada.
                  if (!returningPanels.has(panel.id)) return;

                  /*
                   * A animação terminou.
                   *
                   * Agora podemos finalmente remover o painel
                   * de detachedPanels.
                   *
                   * Isso faz ele voltar oficialmente para a órbita.
                   */
                  setDetachedPanels((prev) => {
                    const copy = { ...prev };

                    delete copy[panel.id];

                    return copy;
                  });

                  /*
                   * Remove o estado de "retornando".
                   */
                  setReturningPanels((prev) => {
                    const next = new Set(prev);

                    next.delete(panel.id);

                    return next;
                  });
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();

                  setDraggingPanel(panel.id);

                  panelWasDragged.current = false;

                  const startX = e.clientX;
                  const startY = e.clientY;

                  const startPos = detached
                    ? {
                        x: detached.x,
                        y: detached.y,
                      }
                    : {
                        x: orbitX,
                        y: orbitY,
                      };

                  currentDragPosition.current = startPos;

                  // Se estava retornando, cancela o retorno
                  setReturningPanels((prev) => {
                    const next = new Set(prev);
                    next.delete(panel.id);
                    return next;
                  });

                  // Só destacamos o painel visualmente.
                  setDetachedPanels((prev) => ({
                    ...prev,
                    [panel.id]: startPos,
                  }));

                  const move = (ev: PointerEvent) => {
                    const dx = ev.clientX - startX;
                    const dy = ev.clientY - startY;

                    const distanceMoved = Math.sqrt(dx * dx + dy * dy);

                    // Só vira drag depois de realmente movimentar
                    if (distanceMoved > 6) {
                      panelWasDragged.current = true;
                    }

                    const newX = startPos.x + dx;
                    const newY = startPos.y + dy;

                    currentDragPosition.current = {
                      x: newX,
                      y: newY,
                    };

                    setDetachedPanels((prev) => ({
                      ...prev,
                      [panel.id]: {
                        x: newX,
                        y: newY,
                      },
                    }));
                  };

                  const up = () => {
                    const { x, y } = currentDragPosition.current;

                    /*
                     * Área de retorno.
                     *
                     * O painel volta para a órbita quando
                     * estiver suficientemente próximo do centro.
                     */
                    const returnRadius = 450;

                    const returnCenterX = panelOffsetX;
                    const returnCenterY = 0;

                    const distanceFromCenter = Math.sqrt(
                      Math.pow(x - returnCenterX, 2) +
                        Math.pow(y - returnCenterY, 2),
                    );

                    if (
                      panelWasDragged.current &&
                      distanceFromCenter < returnRadius
                    ) {
                      setReturningPanels((prev) => {
                        const next = new Set(prev);

                        next.add(panel.id);

                        return next;
                      });
                    }

                    setDraggingPanel(null);

                    window.removeEventListener("pointermove", move);
                    window.removeEventListener("pointerup", up);
                  };

                  window.addEventListener("pointermove", move);
                  window.addEventListener("pointerup", up);
                }}
                style={{
                  left: 0,

                  top: 0,

                  width: 420,

                  height: 145,

                  transformStyle: "preserve-3d",

                  transform: isReturning
                    ? `
      translate3d(
        ${orbitX}px,
        ${orbitY}px,
        ${orbitZ}px
      )
      translate(-50%, -50%)
      scale(${scale * pos.size})
    `
                    : detached
                      ? `
        translate3d(
          ${detached.x}px,
          ${detached.y}px,
          0px
        )
        translate(-50%, -50%)
        scale(${scale * pos.size})
      `
                      : `
        translate3d(
          ${orbitX}px,
          ${orbitY}px,
          ${orbitZ}px
        )
        translate(-50%, -50%)
        scale(${scale * pos.size})
      `,

                  opacity,

                  filter: blur > 0 ? `blur(${blur}px)` : "none",

                  zIndex: detached || isReturning ? 9999 : zIndex,

                  cursor:
                    draggingPanel === panel.id
                      ? "grabbing"
                      : detached
                        ? "grab"
                        : "pointer",

                  transition: isReturning
                    ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity .3s ease"
                    : detached
                      ? "none"
                      : "opacity .12s linear, filter .12s linear",
                }}
              >
                {/* =================================================
                    FLUTUAÇÃO DO HOLOGRAMA
                ================================================= */}

                <div
                  style={{
                    width: "100%",
                    height: "100%",

                    animation: detached
                      ? "none"
                      : `
          futurePanelFloat
          ${pos.floatDuration}s
          ease-in-out
          infinite
        `,

                    animationDelay: detached ? "0s" : `${pos.floatDelay}s`,
                  }}
                >
                  {/* ===============================================
                      GLOW DO HOLOGRAMA
                  =============================================== */}

                  <div
                    className="absolute"
                    style={{
                      inset: -90,

                      borderRadius: 24,

                      background:
                        "radial-gradient(circle, rgba(190,250,255,0.12) 0%, rgba(0,212,255,0.12) 25%, rgba(0,150,255,0.06) 50%, transparent 72%)",

                      filter: "blur(18px)",

                      opacity: 0.95 + centerFactor * 0.55,

                      pointerEvents: "none",
                    }}
                  />
                  {/* ===============================================
                      FEIXE HOLOGRÁFICO
                  =============================================== */}

                  <div
                    className="absolute left-1/2"
                    style={{
                      top: "100%",

                      width: 1,

                      height: 100,

                      transform: "translateX(-50%)",

                      background:
                        "linear-gradient(to bottom, rgba(190,250,255,0.7) 0%, rgba(0,212,255,0.5) 20%, rgba(0,150,255,0.15) 55%, transparent 100%)",

                      boxShadow:
                        "0 0 12px rgba(0,212,255,0.6), 0 0 25px rgba(120,240,255,0.2)",

                      opacity: 0.95 + centerFactor * 0.7,

                      pointerEvents: "none",
                    }}
                  />

                  {/* ===============================================
                      PAINEL
                  =============================================== */}
                  <PanelCard
                    panel={panel}
                    onClick={(clickedPanel) => {
                      // Se houve movimento, não abre o modal
                      if (panelWasDragged.current) {
                        panelWasDragged.current = false;
                        return;
                      }

                      console.log(
                        "FUTURE VISION — PAINEL CLICADO:",
                        clickedPanel.title,
                      );

                      onSelect(clickedPanel);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          HUD
      ========================================================= */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
        }}
      >
        {/* =======================================================
            VINHETA
        ======================================================= */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(0, 18, 30, 0.12) 65%, rgba(0, 8, 16, 0.58) 100%)",
          }}
        />

        {/* =======================================================
            SCANLINES
        ======================================================= */}

        <div
          className="absolute inset-0"
          style={{
            opacity: 0.11,

            background:
              "repeating-linear-gradient(0deg, rgba(160, 245, 255, 0.035) 0px, rgba(160, 245, 255, 0.035) 1px, transparent 1px, transparent 5px)",
          }}
        />

        {/* =======================================================
            HEADER
        ======================================================= */}

        <div
          className="absolute top-8 left-8"
          style={{
            fontFamily: "monospace",

            fontSize: 10,

            letterSpacing: 3,

            color: "#00d4ff",

            textShadow: "0 0 10px rgba(0,212,255,.9)",
          }}
        >
          VISÃO INTERNA
          <br />
        </div>

        {/* =======================================================
            STATUS
        ======================================================= */}

        <div
          className="absolute top-8 right-8 text-right"
          style={{
            fontFamily: "monospace",

            fontSize: 10,

            letterSpacing: 2,

            color: "#00d4ff",
          }}
        >
          SISTEMA
          <br />
          <span
            style={{
              color: "#00ff88",

              textShadow: "0 0 10px #00ff88",
            }}
          >
            ● ONLINE
          </span>
        </div>

        {/* =======================================================
            CAMERA
        ======================================================= */}

        <div
          className="absolute left-8 bottom-8"
          style={{
            fontFamily: "monospace",

            fontSize: 9,

            letterSpacing: 2,

            color: "rgba(150,240,255,.55)",
          }}
        >
          CAMERA
          <br />
          <span
            style={{
              color: "#96F0FF",
            }}
          >
            CLIQUE EM UM PAINEL
          </span>
        </div>
      </div>

      {/* =========================================================
          INFORMAÇÃO
      ========================================================= */}

      <div
        className="absolute bottom-8 left-1/2"
        style={{
          transform: "translateX(-50%)",

          textAlign: "center",

          fontFamily: "monospace",

          color: "rgba(150,240,255,.7)",

          fontSize: 9,

          letterSpacing: 4,

          zIndex: 3,
        }}
      >
        VISÃO 360°
        <br />
      </div>

      {/* =========================================================
          EXIT
      ========================================================= */}

      <button
        onClick={onExit}
        className="pointer-events-auto absolute bottom-8 right-8"
        style={{
          padding: "9px 18px",

          border: "1px solid rgba(0,220,255,.4)",

          borderRadius: 999,

          background: "rgba(0,20,35,.65)",

          backdropFilter: "blur(10px)",

          color: "#00d4ff",

          fontFamily: "monospace",

          fontSize: 9,

          letterSpacing: 2,

          cursor: "pointer",

          zIndex: 10,
        }}
      >
        SAIR
      </button>

      {/* =========================================================
          ANIMAÇÕES
      ========================================================= */}

      <style>{`
  @keyframes futurePanelFloat {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes futureParticleFloat {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }

    15% {
      opacity: 0.7;
    }

    50% {
      transform: translateY(-35vh) translateX(8px);
      opacity: 0.8;
    }

    85% {
      opacity: 0.35;
    }

    100% {
      transform: translateY(-70vh) translateX(-5px);
      opacity: 0;
    }
  }
`}</style>
    </div>
  );
}
