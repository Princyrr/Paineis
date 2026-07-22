import plataforma from "../assets/plataforma.png";
import homemFuturista from "../assets/homemfuturista2.gif";
import logoAzul from "../assets/logoazul.png";

export function Platform() {
  return (
    <div className="relative flex flex-col items-center pointer-events-none select-none">
      <div
        className="relative"
        style={{
          width: 900,
          height: 900,
        }}
      >
        {/* Glow abaixo da plataforma */}
        <div
          className="absolute left-1/2"
          style={{
            transform: "translateX(-50%)",
            width: 420,
            height: 120,
            borderRadius: "50%",
            background: "rgba(0,180,255,.25)",
            filter: "blur(40px)",
            bottom: 10,
            zIndex: 0,
          }}
        />

        {/* Plataforma */}
        <img
          src={plataforma}
          alt="Platform"
          draggable={false}
          className="absolute left-1/2 object-contain select-none pointer-events-none"
          style={{
            transform: "translateX(-50%)",
            width: 750,
            bottom: -15,
            zIndex: 0,
          }}
        />

        {/* Luz central azul*/}
        <div
          className="absolute left-1/2 overflow-hidden"
          style={{
            transform: "translateX(-50%)",
            bottom: 100,
            width: 350,
            height: "130%",
            borderRadius: 9999,
            zIndex: 1,
          }}
        >
          {/* Homem futurista */}
          <img
            src={homemFuturista}
            alt="Homem Futurista"
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: "50%",
              bottom: 2,
              transform: "translateX(-50%)",
              width: 360,
              zIndex: 2,
            }}
          />

          {/* Núcleo energético 3D */}
          <div
            className="absolute left-1/2"
            style={{
              transform: "translateX(-50%)",
              bottom: 0,
              width: 80,
              height: "100%",
              background:
                "linear-gradient(to top, rgba(255,255,255,.95), rgba(150,240,255,.8), rgba(0,180,255,.2), transparent)",
              filter: "blur(2px)",
              borderRadius: 999,
              animation: "laserPulse 2s ease-in-out infinite",
              zIndex: 1,
            }}
          />

          {/* Logo */}
          <img
            src={logoAzul}
            alt="Logo"
            draggable={false}
            className="absolute pointer-events-none select-none"
            style={{
              left: "50%",
              bottom: 550,
              transform: "translateX(-50%)",
              width: 180,
              zIndex: 3,
              filter: `
  drop-shadow(0 0 8px rgba(255,255,255,.9))
  drop-shadow(0 0 20px rgba(180,255,255,.9))
  drop-shadow(0 0 40px rgba(120,240,255,.6))
`,
              animation: "logoFloat 5s ease-in-out infinite",
            }}
          />

          {/* Feixe principal */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top,#00eaff 0%,#008cff99 25%,#0055ff33 60%,transparent)",
              filter: "blur(3px)",
              borderRadius: 999,
            }}
          />

          {/* Raios internos */}
          {Array.from({ length: 75 }, (_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${50 + Math.sin(i * 2.2) * 12}%`,
                bottom: "-20%",
                width: i % 4 === 0 ? 3 : 2,
                height: `${180 + (i % 5) * 70}px`,
                borderRadius: 999,
                background:
                  "linear-gradient(to top, rgba(255,255,255,.95), rgba(0,212,255,.9), rgba(0,212,255,.2), transparent)",
                filter: "blur(0.8px)",
                opacity: 0.8,
                animation: `beamLines ${1.4 + (i % 5) * 0.25}s linear infinite`,
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}

          {/* Anéis de energia subindo dentro do laser */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2"
              style={{
                transform: "translateX(-50%)",
                bottom: 100 + i * 70,
                width: 100 + i * 20,
                height: 38,
                borderRadius: "50%",
                border: "10px solid rgba(0,240,255,.65)",
                boxShadow:
                  "0 0 20px rgba(0,212,255,.9), inset 0 0 8px rgba(0,212,255,.4)",
                animation: `ringUp ${4.5 + i * 0.35}s linear infinite`,
                animationDelay: `${i * 0.3}s`,
                zIndex: 1,
              }}
            />
          ))}
        </div>

        {/* Mid glow */}
        <div
          className="absolute left-1/2"
          style={{
            transform: "translateX(-50%)",
            bottom: 45,
            width: 160,
            height: "120%",
            background:
              "linear-gradient(to top, rgba(0,180,255,0.45) 0%, rgba(0,150,255,0.2) 40%, transparent 100%)",
            filter: "blur(24px)",
            borderRadius: 9999,
            zIndex: 1,
          }}
        />

        {/* Outer glow */}
        <div
          className="absolute left-1/2"
          style={{
            transform: "translateX(-50%)",
            bottom: 45,
            width: 320,
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,140,255,0.25) 0%, rgba(0,100,200,0.1) 50%, transparent 100%)",
            filter: "blur(40px)",
            borderRadius: 9999,
            zIndex: 1,
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute left-1/2"
          style={{
            transform: "translateX(-50%)",
            bottom: 45,
            width: 900,
            height: "120%",
            background:
              "linear-gradient(to top, rgba(0,120,220,0.12) 0%, transparent 100%)",
            filter: "blur(60px)",
            borderRadius: 9999,
            zIndex: 1,
          }}
        />

        {/* Partículas */}
        {Array.from({ length: 98 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `calc(50% + ${Math.sin(i * 1.7) * 58}px)`,
              bottom: `${55 + i * 24}px`,
              width: i % 3 === 0 ? 4 : 2,
              height: i % 3 === 0 ? 4 : 2,
              background: "#00d4ff",
              boxShadow: "0 0 8px #00d4ff",
              animation: `floatUp ${2 + (i % 4) * 0.5}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 2}s`,
              opacity: 0.7,
              zIndex: 2,
            }}
          />
        ))}

        {/* Anel girando */}
        <div
          className="absolute left-1/2"
          style={{
            transform: "translateX(-50%)",
            bottom: 98,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 330,
              height: 42,
              borderRadius: "50%",
              border: "2px solid rgba(0,212,255,.5)",
              boxShadow:
                "0 0 18px rgba(0,212,255,.5), inset 0 0 12px rgba(0,212,255,.25)",
              animation: "spinRing 8s linear infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
