import { panels } from "../../data/panels";

interface VisionPanelsProps {
  mouse: {
    x: number;
    y: number;
  };
}

export function VisionPanels({ mouse }: VisionPanelsProps) {
  const positions = [
    {
      left: "18%",
      top: "28%",
      depth: 0.4,
    },
    {
      left: "50%",
      top: "20%",
      depth: 0.7,
    },
    {
      left: "78%",
      top: "30%",
      depth: 0.5,
    },
    {
      left: "25%",
      top: "62%",
      depth: 0.6,
    },
    {
      left: "72%",
      top: "65%",
      depth: 0.8,
    },
  ];

  return (
    <div className="absolute inset-0">
      {panels.slice(0, positions.length).map((panel, index) => {
        const pos = positions[index];

        const moveX = mouse.x * 20 * pos.depth;
        const moveY = mouse.y * 12 * pos.depth;

        return (
          <div
            key={panel.id}
            className="absolute"
            style={{
              left: pos.left,
              top: pos.top,

              transform: `
                translate3d(
                  calc(-50% + ${moveX}px),
                  calc(-50% + ${moveY}px),
                  ${pos.depth * 300}px
                )
              `,

              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Linha holográfica */}
            <div
              className="absolute left-1/2 top-full"
              style={{
                width: 1,
                height: 100,

                background:
                  "linear-gradient(to bottom, rgba(150,240,255,.8), transparent)",

                boxShadow: "0 0 10px rgba(150,240,255,.55)",
              }}
            />

            {/* Painel */}
            <div
              style={{
                minWidth: 230,
                padding: 20,

                border: "1px solid rgba(150,240,255,.55)",

                borderRadius: 14,

                background:
                  "linear-gradient(135deg, rgba(20,55,72,.88), rgba(5,18,28,.82))",

                backdropFilter: "blur(10px)",

                boxShadow: `
                  0 0 25px rgba(150,240,255,.20),
                  0 0 50px rgba(0,180,255,.08),
                  inset 0 0 20px rgba(150,240,255,.10)
                `,

                color: "#E8FAFF",
              }}
            >
              {/* Identificação */}
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 3,

                  color: "#96F0FF",

                  marginBottom: 8,

                  textShadow: "0 0 10px rgba(150,240,255,.65)",
                }}
              >
                OBSERVATÓRIO
              </div>

              {/* Título */}
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,

                  color: "#E8FAFF",
                }}
              >
                {panel.title}
              </div>

              {/* Descrição */}
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  opacity: 0.65,

                  color: "#B8EAF2",
                }}
              >
                DADOS DISPONÍVEIS
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
