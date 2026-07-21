import { useRef, useState, useEffect, useCallback } from "react";
import { panels, Panel } from "./data/panels";
import { Platform } from "./components/Platform";
import { PanelCard } from "./components/PanelCard";
import Modal from "./components/Modal";
import { Hud } from "./components/Hud";

interface ScatterPos {
  baseAngle: number;
  radius: number;
  yOffset: number;
  floatDelay: number;
  floatDuration: number;
  size: number;
}

const positions: ScatterPos[] = [
  {
    baseAngle: 0,
    radius: 360,
    yOffset: -380,
    floatDelay: 0.0,
    floatDuration: 5.0,
    size: 1.0,
  },
  {
    baseAngle: 24,
    radius: 300,
    yOffset: -280,
    floatDelay: 0.5,
    floatDuration: 4.5,
    size: 0.9,
  },
  {
    baseAngle: 48,
    radius: 350,
    yOffset: -420,
    floatDelay: 1.0,
    floatDuration: 6.0,
    size: 1.1,
  },
  {
    baseAngle: 72,
    radius: 360,
    yOffset: -230,
    floatDelay: 0.3,
    floatDuration: 4.0,
    size: 0.85,
  },
  {
    baseAngle: 96,
    radius: 370,
    yOffset: -300,
    floatDelay: 0.8,
    floatDuration: 5.5,
    size: 1.0,
  },
  {
    baseAngle: 120,
    radius: 300,
    yOffset: -710,
    floatDelay: 1.2,
    floatDuration: 5.0,
    size: 0.95,
  },
  {
    baseAngle: 144,
    radius: 320,
    yOffset: -150,
    floatDelay: 0.2,
    floatDuration: 6.5,
    size: 1.05,
  },
  {
    baseAngle: 168,
    radius: 380,
    yOffset: -580,
    floatDelay: 0.7,
    floatDuration: 4.5,
    size: 0.9,
  },
  {
    baseAngle: 192,
    radius: 350,
    yOffset: -410,
    floatDelay: 1.5,
    floatDuration: 5.5,
    size: 1.0,
  },
  {
    baseAngle: 216,
    radius: 340,
    yOffset: -440,
    floatDelay: 0.4,
    floatDuration: 5.0,
    size: 0.95,
  },
  {
    baseAngle: 240,
    radius: 310,
    yOffset: -120,
    floatDelay: 0.9,
    floatDuration: 6.0,
    size: 1.1,
  },
  {
    baseAngle: 264,
    radius: 390,
    yOffset: -430,
    floatDelay: 1.3,
    floatDuration: 4.0,
    size: 0.88,
  },
  {
    baseAngle: 288,
    radius: 440,
    yOffset: -600,
    floatDelay: 0.6,
    floatDuration: 5.5,
    size: 1.0,
  },
  {
    baseAngle: 312,
    radius: 410,
    yOffset: -620,
    floatDelay: 1.1,
    floatDuration: 4.5,
    size: 0.92,
  },
  {
    baseAngle: 336,
    radius: 420,
    yOffset: -130,
    floatDelay: 0.1,
    floatDuration: 6.0,
    size: 1.05,
  },
];

function App() {
  const [rotation, setRotation] = useState(0);
  const [autoRotate] = useState(true);
  const [selected, setSelected] = useState<Panel | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false);
  const dragStart = useRef<{ x: number; rot: number } | null>(null);
  const rafRef = useRef<number>(0);
  const [detachedPanels, setDetachedPanels] = useState<
    Record<
      number,
      {
        x: number;
        y: number;
      }
    >
  >({});
  const [draggingCard, setDraggingCard] = useState<number | null>(null);
  const [cardWasDragged, setCardWasDragged] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.003);
  const currentDragPosition = useRef({
    x: 0,
    y: 0,
  });
  // Auto-rotate
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setRotation((r) => r + dt * rotationSpeed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotate, isDragging, rotationSpeed]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (
        (e.target as HTMLElement).closest("button") ||
        (e.target as HTMLElement).closest("[data-modal]")
      ) {
        return;
      }

      if (e.button !== 0) return;

      setIsDragging(true);
      setDragMoved(false);

      dragStart.current = {
        x: e.clientX,
        rot: rotation,
      };

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [rotation],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !dragStart.current) return;

      const dx = e.clientX - dragStart.current.x;

      if (Math.abs(dx) > 4) {
        setDragMoved(true);
      }

      setRotation((r) => r + dx * 0.15);

      dragStart.current.x = e.clientX;

      setRotationSpeed(Math.abs(dx) * 0.002);
    },
    [isDragging],
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);

    setRotationSpeed(0.02);

    setTimeout(() => {
      setDragMoved(false);
    }, 0);

    dragStart.current = null;
  }, []);
  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, #001428 0%, #000510 50%, #000005 100%)",
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,100,180,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,100,180,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage:
            "radial-gradient(ellipse at 50% 80%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 80%, black 20%, transparent 75%)",
        }}
      />

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }, (_, i) => {
          const x = (i * 37) % 100;
          const y = (i * 53) % 100;
          const size = i % 4 === 0 ? 2 : 1;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                background: "white",
                opacity: 0.2 + (i % 5) * 0.1,
                animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i % 7) * 0.3}s`,
              }}
            />
          );
        })}
      </div>

      {/* Horizon glow */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "40%",
          background:
            "linear-gradient(to top, rgba(0,80,160,0.15) 0%, transparent 100%)",
        }}
      />

      {/* Platform anchored at bottom center */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none z-10">
        <Platform />
      </div>

      {/* Scattered floating panels */}
      <div
        className="absolute "
        style={{ left: "50%", bottom: 250, width: 0, height: 0 }}
      >
        {panels.map((panel, i) => {
          const detached = detachedPanels[panel.id];

          const pos = positions[i];

          const angle = ((pos.baseAngle + rotation) * Math.PI) / 180;

          const x = Math.cos(angle) * pos.radius;

          const y = pos.yOffset + Math.sin(angle) * 30;

          const current = detached ?? { x, y };

          const depth = (Math.sin(angle) + 1) / 2;

          const visibility = Math.max(0, Math.min(1, (depth - 0.25) / 0.75));

          const scale = (0.65 + visibility * 0.45) * pos.size;
          const opacity = 0.6 + visibility * 0.75;
          const blur = (1 - visibility) * 2;
          const zIndex = Math.round(visibility * 100);

          return (
            <div
              key={panel.id}
              className="absolute"
              onPointerDown={(e) => {
                e.stopPropagation();

                setDraggingCard(panel.id);
                setCardWasDragged(false);

                const startX = e.clientX;
                const startY = e.clientY;

                const startPos = detached ?? {
                  x,
                  y,
                };

                setDetachedPanels((prev) => ({
                  ...prev,
                  [panel.id]: startPos,
                }));

                const move = (ev: PointerEvent) => {
                  const distance =
                    Math.abs(ev.clientX - startX) +
                    Math.abs(ev.clientY - startY);

                  if (distance > 5) {
                    setCardWasDragged(true);
                  }

                  const newX = startPos.x + (ev.clientX - startX);
                  const newY = startPos.y + (ev.clientY - startY);

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

                  const distance = Math.sqrt(x * x + y * y);

                  if (distance < 250) {
                    setDetachedPanels((prev) => {
                      const copy = { ...prev };

                      delete copy[panel.id];

                      return copy;
                    });
                  }

                  setDraggingCard(null);

                  window.removeEventListener("pointermove", move);

                  window.removeEventListener("pointerup", up);
                };
                window.addEventListener("pointermove", move);

                window.addEventListener("pointerup", up);
              }}
              onDoubleClick={() => {
                setDetachedPanels((prev) => {
                  const copy = { ...prev };
                  delete copy[panel.id];
                  return copy;
                });
              }}
              style={{
                transform: detached
                  ? `translate3d(${current.x}px, ${current.y}px,0)`
                  : `translate3d(${x}px, ${y}px,0) translate(-50%,-50%) scale(${scale})`,

                transition: detached ? "none" : "transform 0.6s ease",

                opacity,
                filter: detached
                  ? "none"
                  : blur > 0.1
                    ? `blur(${blur}px)`
                    : "none",

                zIndex: detached ? 9999 : zIndex,

                pointerEvents: "auto",

                willChange: "transform",

                animation: detached
                  ? "none"
                  : `floatPanel ${pos.floatDuration}s ease-in-out infinite`,

                animationDelay: `${pos.floatDelay}s`,

                cursor: detached ? "grab" : "pointer",
              }}
            >
              <PanelCard
                panel={panel}
                onClick={() => {
                  if (cardWasDragged) return;

                  console.log("ABRIR MODAL");
                  setSelected(panel);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* HUD overlay */}
      <Hud />

      {/* Modal */}

      <Modal
        panel={selected}
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
      />
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
        }
        @keyframes spinRing {
          from { transform: rotateX(72deg) rotateZ(0deg); }
          to { transform: rotateX(72deg) rotateZ(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.5; }
        }
        @keyframes modalIn {
          from { transform: scale(0.9) translateY(10px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes floatPanel {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -12px; }
        }
      `}</style>
    </div>
  );
}

export default App;
