import { useEffect, useRef, useState } from "react";
import openingPoseUrl from "../assets/homemfuturista-opening.png";
import originalGif from "../assets/homemfuturista2.gif";

export function ParticleCharacter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formed, setFormed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || !context || reducedMotion.matches) {
      setFormed(true);
      return;
    }
    let disposed = false;
    let frameRequest = 0;
    const image = new Image();
    const finish = () => { if (!disposed) setFormed(true); };
    image.onload = () => {
      if (disposed) return;
      const source = document.createElement("canvas");
      source.width = 180;
      source.height = 235;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) { finish(); return; }
      // Form the opening pose, then hand over to the original animated GIF.
      sourceContext.drawImage(image, 0, 0, 180, 235, 0, 0, 180, 235);
      const pixels = sourceContext.getImageData(0, 0, 180, 235).data;
      const background = (117 * 180 + 20) * 4;
      const particles: Array<{ x: number; y: number; fromX: number; fromY: number; color: string; delay: number }> = [];
      for (let y = 1; y < 235; y += 2) {
        for (let x = 15; x < 173; x += 2) {
          const i = (y * 180 + x) * 4;
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
          const distance = Math.max(Math.abs(r - pixels[background]), Math.abs(g - pixels[background + 1]), Math.abs(b - pixels[background + 2]));
          if (pixels[i + 3] < 80 || distance < 32) continue;
          particles.push({
            x: x * 2, y: y * 2,
            fromX: Math.random() * 360,
            fromY: Math.random() * 470,
            color: `rgb(${Math.min(255, r * 1.2 + 15)},${Math.min(255, g * 1.2 + 25)},${Math.min(255, b * 1.2 + 35)})`,
            delay: Math.random() * 0.35,
          });
        }
      }
      const start = performance.now();
      const animate = (now: number) => {
        if (disposed) return;
        const elapsed = (now - start) / 1000;
        context.clearRect(0, 0, 360, 470);
        for (const particle of particles) {
          const progress = Math.max(0, Math.min(1, (elapsed - particle.delay) / 1.65));
          const ease = 1 - Math.pow(1 - progress, 3);
          const x = particle.fromX + (particle.x - particle.fromX) * ease;
          const y = particle.fromY + (particle.y - particle.fromY) * ease;
          context.globalAlpha = Math.min(1, elapsed * 3);
          context.fillStyle = particle.color;
          context.beginPath();
          context.arc(x, y, 1.3, 0, Math.PI * 2);
          context.fill();
        }
        context.globalAlpha = 1;
        if (elapsed < 2.15) frameRequest = requestAnimationFrame(animate);
        else finish();
      };
      frameRequest = requestAnimationFrame(animate);
    };
    image.onerror = finish;
    image.src = openingPoseUrl;
    const onMotionChange = () => {
      if (reducedMotion.matches) { cancelAnimationFrame(frameRequest); finish(); }
    };
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      disposed = true;
      cancelAnimationFrame(frameRequest);
      reducedMotion.removeEventListener("change", onMotionChange);
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <div className="absolute pointer-events-none select-none" style={{ left: "50%", bottom: 2, transform: "translateX(-50%)", width: 360, maxWidth: "100%", aspectRatio: "360 / 470", zIndex: 2 }}>
      <img src={originalGif} alt="Homem Futurista" draggable={false} style={{ display: "block", width: "100%", height: "auto", opacity: formed ? 1 : 0, transition: "opacity 650ms ease-in-out" }} />
      {!formed && <canvas ref={canvasRef} width={360} height={470} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />}
      {formed && <ParticleFade canvas={canvasRef.current} />}
    </div>
  );
}

// Keep a copy of the final particle frame during the crossfade, then release it.
function ParticleFade({ canvas }: { canvas: HTMLCanvasElement | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (!canvas || !ref.current) { setFinished(true); return; }
    ref.current.getContext("2d")?.drawImage(canvas, 0, 0);
    const frame = requestAnimationFrame(() => setVisible(false));
    const timer = window.setTimeout(() => setFinished(true), 700);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, [canvas]);
  return finished ? null : <canvas ref={ref} width={360} height={470} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: visible ? 1 : 0, transition: "opacity 650ms ease-in-out" }} />;
}
