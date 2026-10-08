"use client";

import { useRef, useEffect, useMemo, useState, useCallback } from "react";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ============================================================
// IMAGENS DO PROJETO
// ============================================================

import analiseAcidenteTrabalho from "../assets/analisedeacidentedetrabalho.png";
import analiseEgressos from "../assets/analisedosegressos.png";
import cadastroNacional from "../assets/cadastronacional.png";
import dataEnsight from "../assets/dataensight.png";
import empresasAtivas from "../assets/empresasativas.png";
import enriquecimentoEmpresas from "../assets/enriquecimento_empresas.png";
import guiaIndustrial from "../assets/guia_industrial.png";
import hubObservatorio from "../assets/hub_observatorio.png";
import mapeamentoSenai from "../assets/mapeamento_senai.png";
import oportunidadesSenai from "../assets/oportunidadesenai.png";
import { OpeningCharacter } from "./OpeningCharacter";
import fundo from "../assets/fundo.png";
// ============================================================
// PALETA VISUAL
// ============================================================

const COLORS = {
  electric: "#00EAFF",
  primary: "#00D4FF",
  light: "#96F0FF",
  mid: "#00B4FF",
  blue: "#008CFF",
  deep: "#0055FF",
  ambient: "#0078DC",
  status: "#00FF88",
  white: "#FFFFFF",
  background: "#02080D",
  card: "#07141B",
};

// ============================================================
// PROPS
// ============================================================

interface OpeningPageProps {
  onComplete: () => void;
}

// ============================================================
// IMAGENS
// ============================================================

const PROJECT_IMAGES = [
  analiseAcidenteTrabalho,
  analiseEgressos,
  cadastroNacional,
  dataEnsight,
  empresasAtivas,
  enriquecimentoEmpresas,
  guiaIndustrial,
  hubObservatorio,
  mapeamentoSenai,
  oportunidadesSenai,
];

// ============================================================
// IMAGE CARD
// ============================================================

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
  return (
    <div
      className="
        w-full
        h-[200px]
        sm:h-[300px]
        md:h-[400px]
        flex-shrink-0
        transition-transform
        duration-300
        hover:scale-[1.02]
        cursor-pointer
        relative
        will-change-transform
        overflow-hidden
      "
      style={{
        background: COLORS.card,
      }}
    >
      <style>{`
  /* =====================================================
     TRANSIÇÃO PARA O LABORATÓRIO
  ===================================================== */

  @keyframes openingFlash {
    0% {
      opacity: 0;
    }

    35% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  .animate-openingFlash {
    animation: openingFlash 1.2s ease-out forwards;
  }

  @keyframes openingVignette {
    0% {
      opacity: 0;
    }

    45% {
      opacity: 0;
    }

    100% {
      opacity: 0.95;
    }
  }

  .animate-openingVignette {
    animation: openingVignette 1.2s ease-in forwards;
  }

  /* =====================================================
     PORTAL
  ===================================================== */

  .opening-portal {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;

    border: 2px solid rgba(0, 212, 255, 0.9);

    box-shadow:
      0 0 20px rgba(0, 212, 255, 0.8),
      0 0 60px rgba(0, 212, 255, 0.5),
      0 0 120px rgba(0, 212, 255, 0.3);

    animation:
      openingPortalExpand
      1.2s
      cubic-bezier(.2,.8,.2,1)
      forwards;
  }

  .opening-portal-2 {
    animation-delay: 0.08s;
  }

  .opening-portal-3 {
    animation-delay: 0.16s;
  }

  @keyframes openingPortalExpand {
    0% {
      width: 80px;
      height: 80px;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.2);
    }

    25% {
      opacity: 1;
    }

    100% {
      width: 1800px;
      height: 1800px;
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  /* =====================================================
     NÚCLEO
  ===================================================== */

  .opening-core {
    width: 10px;
    height: 10px;
    border-radius: 50%;

    background: #00d4ff;

    box-shadow:
      0 0 20px #00d4ff,
      0 0 50px rgba(0, 212, 255, 0.8),
      0 0 100px rgba(0, 212, 255, 0.5);

    animation:
      openingCore
      1.2s
      ease-in
      forwards;
  }

  @keyframes openingCore {
    0% {
      transform: scale(1);
      opacity: 0;
    }

    25% {
      opacity: 1;
      transform: scale(3);
    }

    60% {
      transform: scale(12);
      opacity: 1;
    }

    100% {
      transform: scale(75);
      opacity: 1;
    }
  }

  /* =====================================================
     RAIOS
  ===================================================== */

  .opening-rays {
    width: 10px;
    height: 10px;
    border-radius: 50%;

    background: #00d4ff;

    box-shadow:
      0 0 20px #00d4ff,
      0 0 50px rgba(0, 212, 255, 0.8),
      0 0 100px rgba(0, 212, 255, 0.5);

    animation:
      openingRays
      1.2s
      ease-in
      forwards;
  }

  @keyframes openingRays {
    0% {
      transform: scale(1);
      opacity: 0;
    }

    25% {
      opacity: 1;
      transform: scale(3);
    }

    60% {
      transform: scale(12);
      opacity: 1;
    }

    100% {
      transform: scale(75);
      opacity: 1;
    }
  }
`}</style>
      <img
        src={src}
        alt="Painel do Observatório da Indústria"
        loading="lazy"
        onLoad={onLoad}
        className="
          w-full
          h-full
          object-cover
          opacity-80
          hover:opacity-100
          transition-opacity
          duration-300
        "
      />

      {/* ======================================================
          GLOW SOBRE A IMAGEM
      ====================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(0,234,255,.08),
              transparent 42%,
              rgba(0,0,0,.30)
            )
          `,
        }}
      />

      {/* ======================================================
          BORDA HOLOGRÁFICA SUTIL
      ====================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: "1px solid rgba(0,212,255,.08)",
          boxShadow: "inset 0 0 30px rgba(0,212,255,.025)",
        }}
      />
    </div>
  );
};

// ============================================================
// COMPONENTE
// ============================================================

export default function OpeningPage({ onComplete }: OpeningPageProps) {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const entryStartedRef = useRef(false);
  const entryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (entryTimerRef.current !== null) clearTimeout(entryTimerRef.current);
  }, []);
  const [characterVisible, setCharacterVisible] = useState(false);

  const loadedCountRef = useRef(0);

  // ============================================================
  // CONTROLE DE LOADING
  // ============================================================

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;

    if (!isReady && loadedCountRef.current >= 1) {
      setIsReady(true);
    }
  }, [isReady]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  // ============================================================
  // DISTRIBUIÇÃO DAS IMAGENS NAS COLUNAS
  // ============================================================

  const colMedia = useMemo(() => {
    const col1Base = PROJECT_IMAGES.filter((_, index) => index % 4 === 0);

    const col2Base = PROJECT_IMAGES.filter((_, index) => index % 4 === 1);

    const col3Base = PROJECT_IMAGES.filter((_, index) => index % 4 === 2);

    const col4Base = PROJECT_IMAGES.filter((_, index) => index % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, []);

  // ============================================================
  // SCROLL
  // ============================================================

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollWrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // ============================================================
  // HOMEM FUTURISTA — APARECE NO FINAL DO SCROLL
  // ============================================================

  const futuristicManOpacity = useTransform(
    smoothProgress,
    [0.82, 0.94, 1],
    [0, 0, 1],
  );

  const futuristicManScale = useTransform(
    smoothProgress,
    [0.82, 0.94, 1],
    [0.65, 0.85, 1],
  );

  const futuristicManY = useTransform(
    smoothProgress,
    [0.82, 0.94, 1],
    [120, 40, 0],
  );

  const futuristicManBlur = useTransform(
    smoothProgress,
    [0.82, 0.94, 1],
    [18, 8, 0],
  );

  const futuristicManFilter = useTransform(
    futuristicManBlur,
    (blur) => `blur(${blur}px)`,
  );
  useEffect(() => {
    const revealCharacter = (progress: number) => {
      if (progress >= 0.965) setCharacterVisible(true);
    };
    revealCharacter(smoothProgress.get());
    return smoothProgress.on("change", revealCharacter);
  }, [smoothProgress]);

  // ============================================================
  // BANNER
  // ============================================================

  const bannerWidth = useTransform(
    smoothProgress,
    [0, 0.15],
    ["90vw", "100vw"],
  );

  const bannerHeight = useTransform(
    smoothProgress,
    [0, 0.15],
    ["80vh", "100vh"],
  );

  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);

  const bannerBorderWidth = useTransform(
    smoothProgress,
    [0, 0.15],
    ["4px", "0px"],
  );

  // ============================================================
  // MATRIZ 3D
  // ============================================================

  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);

  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);

  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);

  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  // ============================================================
  // PARALLAX DAS COLUNAS
  // ============================================================

  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);

  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);

  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);

  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

  // ============================================================
  // ENTRADA NO APP
  // ============================================================

  const handleEnterApp = () => {
    if (entryStartedRef.current) return;
    entryStartedRef.current = true;
    setIsEntering(true);

    entryTimerRef.current = setTimeout(() => {
      onComplete();
    }, 1100);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      ref={scrollWrapperRef}
      className="
        fixed
        inset-0
        z-[99999]
        w-full
        h-screen
        overflow-y-auto
        overflow-x-hidden
      "
      style={{
        background: COLORS.background,
      }}
    >
      <section
        ref={containerRef}
        className="
          relative
          w-full
          h-[600vh]
          text-white
          font-sans
        "
        style={{
          background: COLORS.background,
          selectionColor: COLORS.white,
        }}
      >
        {/* =====================================================
    TRANSIÇÃO PARA O LABORATÓRIO
===================================================== */}

        {isEntering && (
          <div className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden">
            {/* =================================================
        FLASH
    ================================================= */}

            <div className="absolute inset-0 bg-cyan-400/10 animate-openingFlash" />

            {/* =================================================
        PORTAL CENTRAL
    ================================================= */}

            <div className="absolute left-1/2 top-1/2">
              <div className="opening-portal" />
              <div className="opening-portal opening-portal-2" />
              <div className="opening-portal opening-portal-3" />
            </div>

            {/* =================================================
        NÚCLEO
    ================================================= */}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="opening-core" />
            </div>

            {/* =================================================
        RAIOS
    ================================================= */}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="opening-rays" />
            </div>

            {/* =================================================
        VINHETA
    ================================================= */}

            <div className="absolute inset-0 bg-black animate-openingVignette" />
          </div>
        )}
        {/* =====================================================
            ÁREA FIXA
        ===================================================== */}

        <div
          className="
            sticky
            top-0
            h-screen
            w-full
            flex
            justify-center
            items-center
            overflow-hidden
          "
        >
          <motion.div
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: bannerRadius,
              borderWidth: bannerBorderWidth,
              borderColor: COLORS.electric,
              boxShadow:
                "0 0 50px rgba(0,212,255,.05), inset 0 0 50px rgba(0,212,255,.025)",
            }}
            className="
              relative
              overflow-hidden
              flex
              items-center
              justify-center
              max-w-[1920px]
              mx-auto
              will-change-transform
            "
          >
            {/* =================================================
    FUNDO — fundo.png
================================================= */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${fundo})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
                opacity: 0.7,
                filter: "brightness(0.7) saturate(1.2)",
              }}
            />

            {/* =================================================
                AMBIENTE
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                flex
                justify-center
                items-center
                pointer-events-none
              "
              style={{
                perspective: "1000px",
              }}
            >
              {/* =================================================
                  GLOW AMBIENTE
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  z-10
                  pointer-events-none
                "
                style={{
                  background: `
                    radial-gradient(
                      circle at center,
                      rgba(0,234,255,.09) 0%,
                      rgba(0,212,255,.045) 25%,
                      rgba(0,120,220,.02) 45%,
                      transparent 70%
                    )
                  `,
                  filter: "blur(25px)",
                }}
              />

              {/* =================================================
                  HALO CENTRAL
              ================================================= */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-[300px]
                  h-[300px]
                  md:w-[500px]
                  md:h-[500px]
                  rounded-full
                  pointer-events-none
                "
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,234,255,.06), rgba(0,120,220,.025) 40%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* =================================================
                  MÁSCARA VERTICAL
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  z-20
                  pointer-events-none
                  shadow-[inset_0_100px_150px_-50px_rgba(0,0,0,1),inset_0_-100px_150px_-50px_rgba(0,0,0,1)]
                "
              />

              {/* =================================================
                  MÁSCARA HORIZONTAL
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  z-20
                  pointer-events-none
                  shadow-[inset_150px_0_150px_-50px_rgba(0,0,0,1),inset_-150px_0_150px_-50px_rgba(0,0,0,1)]
                "
              />

              {/* =================================================
                  MATRIZ 3D
              ================================================= */}

              <motion.div
                animate={
                  isEntering
                    ? {
                        scale: 1.8,
                        opacity: 0,
                        rotateY: -70,
                        rotateX: 35,
                        z: -1800,
                      }
                    : {
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  rotateX,
                  rotateY,
                  rotateZ,
                  z: translateZ,
                  transformStyle: "preserve-3d",
                }}
                className="
                  flex
                  gap-4
                  md:gap-6
                  justify-center
                  items-center
                  w-[120vw]
                  h-[150vh]
                  origin-center
                  opacity-100
                  will-change-transform
                "
              >
                {/* =================================================
                    COLUNA 1
                ================================================= */}

                <motion.div
                  style={{ y: yCol1 }}
                  className="
                    flex
                    flex-col
                    gap-4
                    md:gap-6
                    w-[22vw]
                    min-w-[200px]
                    pointer-events-auto
                  "
                >
                  {colMedia.col1.map((src, index) => (
                    <ImageCard
                      key={`col1-${index}`}
                      src={src}
                      onLoad={handleItemLoad}
                    />
                  ))}
                </motion.div>

                {/* =================================================
                    COLUNA 2
                ================================================= */}

                <motion.div
                  style={{ y: yCol2 }}
                  className="
                    flex
                    flex-col
                    gap-4
                    md:gap-6
                    w-[22vw]
                    min-w-[200px]
                    pointer-events-auto
                  "
                >
                  {colMedia.col2.map((src, index) => (
                    <ImageCard
                      key={`col2-${index}`}
                      src={src}
                      onLoad={handleItemLoad}
                    />
                  ))}
                </motion.div>

                {/* =================================================
                    COLUNA 3
                ================================================= */}

                <motion.div
                  style={{ y: yCol3 }}
                  className="
                    flex
                    flex-col
                    gap-4
                    md:gap-6
                    w-[22vw]
                    min-w-[200px]
                    pointer-events-auto
                  "
                >
                  {colMedia.col3.map((src, index) => (
                    <ImageCard
                      key={`col3-${index}`}
                      src={src}
                      onLoad={handleItemLoad}
                    />
                  ))}
                </motion.div>

                {/* =================================================
                    COLUNA 4
                ================================================= */}

                <motion.div
                  style={{ y: yCol4 }}
                  className="
                    flex
                    flex-col
                    gap-4
                    md:gap-6
                    w-[22vw]
                    min-w-[200px]
                    pointer-events-auto
                  "
                >
                  {colMedia.col4.map((src, index) => (
                    <ImageCard
                      key={`col4-${index}`}
                      src={src}
                      onLoad={handleItemLoad}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* =================================================
                OVERLAY FINAL
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                z-30
                pointer-events-none
              "
              style={{
                background: `
                  linear-gradient(
                    to bottom,
                    rgba(2,8,13,.12),
                    transparent 30%,
                    transparent 70%,
                    rgba(2,8,13,.48)
                  )
                `,
              }}
            />

            {/* =================================================
    HOMEM FUTURISTA — FINAL DO SCROLL
================================================= */}

            <motion.div
              className="
    absolute
    left-1/2
    bottom-0
    -translate-x-1/2
    z-[45]
    pointer-events-none
    flex
    justify-center
    items-end
  "
              style={{
                opacity: futuristicManOpacity,
                scale: futuristicManScale,
                y: futuristicManY,
                filter: futuristicManFilter,
              }}
            >
              {/* Glow atrás do personagem */}
              <div
                className="
      absolute
      left-1/2
      bottom-0
      -translate-x-1/2
      w-[300px]
      h-[500px]
      md:w-[500px]
      md:h-[650px]
      rounded-full
      pointer-events-none
    "
                style={{
                  background:
                    "radial-gradient(ellipse at center bottom, rgba(0,234,255,.20) 0%, rgba(0,120,220,.10) 35%, transparent 72%)",
                  filter: "blur(35px)",
                }}
              />

              {characterVisible && <OpeningCharacter onDissolveComplete={handleEnterApp} />}
            </motion.div>

            {/* =================================================
                LINHAS HUD
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                z-[35]
                pointer-events-none
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(0,212,255,.035) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(0,212,255,.035) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "80px 80px",
                maskImage:
                  "radial-gradient(circle at center, black 0%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 0%, transparent 75%)",
              }}
            />

            {/* =================================================
                RETÍCULO CENTRAL
            ================================================= */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-40
                pointer-events-none
              "
            >
              <div
                className="
                  relative
                  w-28
                  h-28
                  md:w-36
                  md:h-36
                  rounded-full
                "
                style={{
                  border: "1px solid rgba(0,212,255,.18)",
                  boxShadow:
                    "0 0 50px rgba(0,212,255,.07), inset 0 0 25px rgba(0,212,255,.025)",
                }}
              >
                {/* Anel interno */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-14
                    h-14
                    md:w-20
                    md:h-20
                    rounded-full
                  "
                  style={{
                    border: "1px solid rgba(0,234,255,.10)",
                    boxShadow: "0 0 25px rgba(0,234,255,.05)",
                  }}
                />

                {/* Núcleo */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-1.5
                    h-1.5
                    rounded-full
                  "
                  style={{
                    background: COLORS.white,
                    boxShadow: `
                      0 0 10px rgba(255,255,255,.95),
                      0 0 25px rgba(0,234,255,.85),
                      0 0 50px rgba(0,212,255,.45)
                    `,
                  }}
                />
              </div>
            </div>

            {/* =================================================
                TEXTO DE ABERTURA
            ================================================= */}

            <div
              className="
                absolute
                z-[60]
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                text-center
                pointer-events-none
                w-full
                px-6
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: isEntering ? 0 : isReady ? 1 : 0,
                  y: isEntering ? -30 : isReady ? 0 : 20,
                  scale: isEntering ? 0.8 : 1,
                }}
                transition={{
                  duration: isEntering ? 0.35 : 1,
                  ease: "easeOut",
                }}
              >
                {/* =================================================
                    IDENTIFICAÇÃO
                ================================================= */}

                <div
                  className="
                    text-[10px]
                    md:text-xs
                    tracking-[0.5em]
                    uppercase
                    mb-4
                  "
                  style={{
                    color: COLORS.electric,
                    textShadow:
                      "0 0 15px rgba(0,234,255,.7), 0 0 30px rgba(0,212,255,.25)",
                  }}
                >
                  OBSERVATÓRIO DA INDÚSTRIA DA PARAÍBA
                </div>

                {/* =================================================
                    TÍTULO
                ================================================= */}

                <h1
                  className="
                    text-4xl
                    sm:text-5xl
                    md:text-7xl
                    font-light
                    tracking-tight
                  "
                  style={{
                    textShadow: `
                      0 0 25px rgba(0,212,255,.18),
                      0 0 55px rgba(0,120,220,.10)
                    `,
                  }}
                >
                  Visualização
                  <br />
                  <span
                    style={{
                      color: COLORS.light,
                      textShadow: `
                        0 0 15px rgba(0,234,255,.7),
                        0 0 40px rgba(0,212,255,.3)
                      `,
                    }}
                  >
                    De Painéis
                  </span>
                </h1>

                {/* =================================================
                    SUBTÍTULO
                ================================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: isReady ? 1 : 0,
                    y: isReady ? 0 : 15,
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                  }}
                  className="
                    mt-6
                    text-[9px]
                    md:text-[10px]
                    tracking-[0.35em]
                    uppercase
                  "
                  style={{
                    color: "rgba(210,245,255,.68)",
                  }}
                >
                  Dados · Tecnologia · Indústria
                </motion.div>

                {/* =================================================
                    BOTÃO ENTRAR
                ================================================= */}

                <motion.button
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: isReady ? 1 : 0,
                    y: isReady ? 0 : 15,
                  }}
                  transition={{
                    delay: 1,
                    duration: 0.8,
                  }}
                  onClick={handleEnterApp}
                  className="
                    pointer-events-auto
                    mt-8
                    px-7
                    py-3
                    rounded-full
                    uppercase
                    text-[10px]
                    tracking-[0.3em]
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                  style={{
                    border: "1px solid rgba(0,234,255,.45)",
                    background: "rgba(0,212,255,.045)",
                    color: COLORS.electric,
                    backdropFilter: "blur(12px)",
                    boxShadow: `
                      0 0 25px rgba(0,212,255,.08),
                      inset 0 0 15px rgba(0,212,255,.025)
                    `,
                  }}
                >
                  Entrar na Plataforma
                </motion.button>
              </motion.div>
            </div>
            {/* =================================================
    PELÍCULA DE DESTAQUE DO CONTEÚDO
================================================= */}

            <div
              className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[40%]
    max-w-[550px]
    h-[380px]
    md:h-[430px]
    rounded-[40px]
    pointer-events-none
    z-[41]
  "
              style={{
                background: `
      radial-gradient(
        ellipse at center,
        rgba(2, 12, 20, 0.88) 0%,
        rgba(2, 12, 20, 0.72) 45%,
        rgba(2, 12, 20, 0.35) 70%,
        transparent 100%
      )
    `,
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                boxShadow: `
      0 0 80px rgba(0, 212, 255, 0.06),
      inset 0 0 60px rgba(0, 212, 255, 0.025)
    `,
              }}
            />

            {/* =================================================
                STATUS ESQUERDO
            ================================================= */}

            <div
              className="
                absolute
                bottom-6
                left-8
                z-50
                flex
                items-center
                gap-2
                pointer-events-none
              "
            >
              <span
                className="
                  w-1.5
                  h-1.5
                  rounded-full
                  animate-pulse
                "
                style={{
                  background: COLORS.status,
                  boxShadow: "0 0 8px rgba(0,255,136,.8)",
                }}
              />

              <span
                className="
                  text-[8px]
                  tracking-[0.3em]
                  uppercase
                "
                style={{
                  color: "rgba(210,245,255,.55)",
                }}
              >
                Sistema inicializado
              </span>
            </div>

            {/* =================================================
                STATUS DIREITO
            ================================================= */}

            <div
              className="
                absolute
                bottom-6
                right-8
                z-50
                text-[8px]
                tracking-[0.25em]
                uppercase
                pointer-events-none
              "
              style={{
                color: "rgba(0,212,255,.5)",
              }}
            >
              FIEPB · OBSERVATÓRIO · PARAÍBA
            </div>

            {/* =================================================
                LINHA INFERIOR HUD
            ================================================= */}

            <div
              className="
                absolute
                bottom-5
                left-1/2
                -translate-x-1/2
                w-24
                h-px
                z-50
                pointer-events-none
              "
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,234,255,.65), transparent)",
                boxShadow: "0 0 10px rgba(0,234,255,.35)",
              }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
