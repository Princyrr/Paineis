export function Hud() {
  return (
    <div className=" absolute inset-0 pointer-events-none z-10">
      {/* Top-left */}
      <div className="absolute top-6 left-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#00d4ff", boxShadow: "0 0 8px #00d4ff" }}
          />
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: "#00d4ff", opacity: 0.8 }}
          >
            OBSERVATÓRIO DA INDÚSTRIA - PB
          </span>
        </div>
        <span
          className="font-mono text-xs"
          style={{ color: "rgba(0,200,255,0.4)", fontSize: 10 }}
        >
          PAINÉIS
        </span>
      </div>

      {/* Top-right */}
      <div className="absolute top-6 right-6 flex flex-col items-end gap-1">
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: "#00d4ff", opacity: 0.8 }}
        >
          Plataformas, Dados, Informações
        </span>
        <span
          className="font-mono text-xs"
          style={{ color: "rgba(0,200,255,0.4)", fontSize: 10 }}
        >
          Paraíba
        </span>
      </div>

      {/* Bottom-left */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-1">
        <span
          className="font-mono text-xs"
          style={{ color: "rgba(0,200,255,0.4)", fontSize: 10 }}
        >
          CLICK NO PAINEL PARA VER DETALHES
        </span>
      </div>

      {/* Bottom-right */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }}
          />
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(0,255,136,0.6)", fontSize: 10 }}
          >
            ORBITA DE DADOS
          </span>
        </div>
      </div>

      {/* Corner brackets */}
      <div
        className="absolute top-3 left-3 w-6 h-6 border-t border-l"
        style={{ borderColor: "rgba(0,200,255,0.3)" }}
      />
      <div
        className="absolute top-3 right-3 w-6 h-6 border-t border-r"
        style={{ borderColor: "rgba(0,200,255,0.3)" }}
      />
      <div
        className="absolute bottom-3 left-3 w-6 h-6 border-b border-l"
        style={{ borderColor: "rgba(0,200,255,0.3)" }}
      />
      <div
        className="absolute bottom-3 right-3 w-6 h-6 border-b border-r"
        style={{ borderColor: "rgba(0,200,255,0.3)" }}
      />
    </div>
  );
}
