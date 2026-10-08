interface VisionOverlayProps {
  mouse: {
    x: number;
    y: number;
  };

  onExit: () => void;
}

export function VisionOverlay({ mouse, onExit }: VisionOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vinheta das lentes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 35%,
              rgba(0,0,0,.15) 60%,
              rgba(0,0,0,.85) 100%
            )
          `,
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(150,240,255,.025) 0px, rgba(150,240,255,.025) 1px, transparent 1px, transparent 4px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Retículo central */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `
            translate(-50%, -50%)
            translate(
              ${mouse.x * 15}px,
              ${mouse.y * 15}px
            )
          `,
        }}
      >
        {/* Círculo */}
        <div
          style={{
            width: 70,
            height: 70,
            border: "1px solid rgba(150,240,255,.6)",
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(150,240,255,.5)",
          }}
        />

        {/* Ponto central */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 6,
            height: 6,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "#96F0FF",
            boxShadow: "0 0 15px #96F0FF",
          }}
        />
      </div>

      {/* HUD superior esquerdo */}
      <div
        className="absolute top-8 left-10"
        style={{
          color: "#96F0FF",
          fontSize: 11,
          letterSpacing: 3,
          textShadow: "0 0 10px rgba(150,240,255,.8)",
        }}
      >
        FUTURE VISION
        <br />
        SYSTEM ONLINE
      </div>

      {/* Indicadores superiores */}
      <div
        className="absolute top-8 right-10 text-right"
        style={{
          color: "#96F0FF",
          fontSize: 10,
          letterSpacing: 2,
          textShadow: "0 0 8px rgba(150,240,255,.5)",
        }}
      >
        VISUAL SYSTEM
        <br />
        TRACKING: ACTIVE
        <br />
        DATA LINK: CONNECTED
      </div>

      {/* Barra inferior */}
      <div
        className="absolute bottom-10 left-1/2"
        style={{
          transform: "translateX(-50%)",
          width: 400,
        }}
      >
        {/* Linha energética */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #96F0FF, transparent)",
            boxShadow: "0 0 15px #96F0FF",
          }}
        />

        {/* Texto */}
        <div
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: 10,
            letterSpacing: 4,
            color: "rgba(150,240,255,.7)",
            textShadow: "0 0 8px rgba(150,240,255,.4)",
          }}
        >
          INDUSTRIAL INTELLIGENCE SYSTEM
        </div>
      </div>

      {/* Botão sair */}
      <button
        onClick={onExit}
        className="absolute top-8 left-1/2 pointer-events-auto"
        style={{
          transform: "translateX(-50%)",
          padding: "8px 18px",
          border: "1px solid rgba(150,240,255,.4)",
          borderRadius: 999,
          background: "rgba(20,55,72,.5)",
          color: "#96F0FF",
          fontSize: 10,
          letterSpacing: 2,
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 15px rgba(150,240,255,.12)",
        }}
      >
        SAIR DA VISÃO
      </button>
    </div>
  );
}
