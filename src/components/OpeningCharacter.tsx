import { useEffect, useRef, useState } from "react";
import walkingGif from "../assets/homemfuturista3.gif";
import dissolvePose from "../assets/homemfuturista3-dissolve.png";

export function OpeningCharacter({ onDissolveComplete }: { onDissolveComplete: () => void }) {
  const completeRef = useRef(onDissolveComplete);
  useEffect(() => { completeRef.current = onDissolveComplete; }, [onDissolveComplete]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [dissolving, setDissolving] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeout = window.setTimeout(() => completeRef.current(), 11700);
      return () => window.clearTimeout(timeout);
    }
    let disposed = false;
    let frame = 0;
    let timer = 0;
    const pose = new Image();
    pose.onload = () => {
      if (disposed) return;
      // GIF duration is 10.36s; dissolve before it loops back to its first pose.
      timer = window.setTimeout(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (disposed || !canvas || !context) return;
        const source = document.createElement("canvas");
        source.width = 360;
        source.height = 470;
        const sourceContext = source.getContext("2d");
        if (!sourceContext) return;
        sourceContext.drawImage(pose, 0, 0);
        const pixels = sourceContext.getImageData(0, 0, 360, 470).data;
        const particles: Array<{ x: number; y: number; drift: number; lift: number; delay: number; color: string }> = [];
        for (let y = 0; y < 470; y += 3) {
          for (let x = 0; x < 360; x += 3) {
            const i = (y * 360 + x) * 4;
            if (pixels[i + 3] < 100) continue;
            particles.push({ x, y, drift: 45 + Math.random() * 60, lift: (Math.random() - 0.6) * 55,
              delay: Math.random() * 0.3,
              color: `rgb(${Math.min(255, pixels[i] + 25)},${Math.min(255, pixels[i + 1] + 40)},${Math.min(255, pixels[i + 2] + 55)})` });
          }
        }
        setDissolving(true);
        const start = performance.now();
        const animate = (now: number) => {
          if (disposed) return;
          const elapsed = (now - start) / 1000;
          context.clearRect(0, 0, 360, 470);
          for (const particle of particles) {
            const progress = Math.max(0, Math.min(1, (elapsed - particle.delay) / 1.6));
            const ease = progress * progress;
            context.globalAlpha = Math.min(1, elapsed / 0.2) * (1 - progress);
            context.fillStyle = particle.color;
            context.beginPath();
            context.arc(particle.x - particle.drift * ease, particle.y + particle.lift * ease + Math.sin(progress * 6 + particle.x) * 5 * progress, 1.2, 0, Math.PI * 2);
            context.fill();
          }
          context.globalAlpha = 1;
          if (elapsed < 2) frame = requestAnimationFrame(animate);
          else {
            context.clearRect(0, 0, 360, 470);
            setFinished(true);
            completeRef.current();
          }
        };
        frame = requestAnimationFrame(animate);
      }, 9700);
    };
    pose.src = dissolvePose;
    return () => { disposed = true; window.clearTimeout(timer); cancelAnimationFrame(frame); pose.onload = null; };
  }, [loaded]);

  return (
    <div className="relative w-[280px] sm:w-[360px] md:w-[480px] lg:w-[560px] max-w-none select-none" style={{ aspectRatio: "720 / 940", filter: "drop-shadow(0 0 20px rgba(0,234,255,.35)) drop-shadow(0 0 60px rgba(0,120,220,.20))" }}>
      <img src={walkingGif} alt="Homem futurista caminhando e se transformando em partículas" draggable={false} onLoad={() => setLoaded(true)} className="block w-full h-auto" style={{ opacity: dissolving ? 0 : 1, transition: "opacity 350ms ease-out" }} />
      {!finished && <canvas ref={canvasRef} width={360} height={470} aria-hidden="true" className="absolute inset-0 w-full h-full" />}
    </div>
  );
}
