import image01 from "../assets/analisedosegressos.png";
import image02 from "../assets/analisedeacidentedetrabalho.png";
import image03 from "../assets/cadastronacional.png";
import image04 from "../assets/dataensight.png";
import image05 from "../assets/empresasativas.png";
import image06 from "../assets/enriquecimento_empresas.png";
import image07 from "../assets/hub_observatorio.png";
import image08 from "../assets/indicadoresdajuventudebrasileira.png";
import image09 from "../assets/infraestrutura.png";
import image10 from "../assets/mapeamento_empresas.png";
import image11 from "../assets/mapeamento_senai.png";
import image12 from "../assets/monitornacionaldeinvestimentos.png";
import image13 from "../assets/painel_de_prospeccao.png";
import image14 from "../assets/portal_dos_sindicatos.png";
import image15 from "../assets/previsibilidadedeoferta.png";

export interface Panel {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  color: string;

  trend: "up" | "down" | "stable";
}

export const panels: Panel[] = [
  {
    id: 1,
    title: "Análise dos Egressos",
    description: "Análise dos egressos",
    image: image01,
    link: "https://site1.com",
    color: "#00d4ff",

    trend: "up",
  },
  {
    id: 2,
    title: "Análise de Acidentes de Trabalho",
    description:
      "Quantum entanglement field measurements showing stable coherence levels. Decoherence rate maintained below critical threshold of 0.03 qubits/ms.",
    image: image02,
    link: "https://site2.com",
    color: "#00ff88",

    trend: "stable",
  },
  {
    id: 3,
    title: "Cadastro Nacional",
    description:
      "Central reactor plasma containment temperature readings. Magnetic field integrity at 99.7% with fusion efficiency exceeding standard parameters.",
    image: image03,
    link: "https://site3.com",
    color: "#ff6b35",

    trend: "up",
  },
  {
    id: 4,
    title: "Data Ensight",
    description:
      "WIMP interaction events detected in the last 24-hour cycle. Collision cross-section analysis reveals anomalous clustering near sector 7-G.",
    image: image04,
    link: "https://site4.com",
    color: "#b44fff",

    trend: "up",
  },
  {
    id: 5,
    title: "Empresas Ativas",
    description:
      "LIGO-class sensor array detecting spacetime curvature anomalies. Current strain sensitivity at 10^-21 Hz, with 3 significant events flagged this cycle.",
    image: image05,
    link: "https://site5.com",
    color: "#ffcc00",

    trend: "stable",
  },
  {
    id: 6,
    title: "Enriquecimento de Empresas",
    description:
      "Charged particle accelerator beam focus metrics. Emittance correction algorithms operating at 96.4% efficiency with sub-nanometer precision alignment.",
    image: image06,
    link: "https://site6.com",
    color: "#00d4ff",

    trend: "up",
  },
  {
    id: 7,
    title: "HUB do Observatório",
    description:
      "FTL relay network signal integrity and packet transmission rates across 47 active nodes. Latency below 2ms with zero packet loss in the last hour.",
    image: image07,
    link: "https://site7.com",
    color: "#ff4488",

    trend: "up",
  },
  {
    id: 8,
    title: "Indicadores da Juventude Brasileira",
    description:
      "Penning trap magnetic field stability for antimatter storage. Containment efficiency at 99.99% with electromagnetic coil redundancy active on all systems.",
    image: image08,
    link: "https://site8.com",
    color: "#00ff88",

    trend: "stable",
  },
  {
    id: 9,
    title: "Infraestrutura",
    description:
      "Deep space observation array tracking 1,247 exoplanets. Spectrographic analysis identifies 3 candidates with atmospheric biosignatures in the habitable zone.",
    image: image09,
    link: "https://site9.com",
    color: "#ffcc00",

    trend: "up",
  },
  {
    id: 10,
    title: "Mapeamento Empresas",
    description:
      "Real-time threat detection and neutralization across all network perimeters. 14,823 intrusion attempts blocked this session with zero breaches recorded.",
    image: image10,
    link: "https://site10.com",
    color: "#ff6b35",

    trend: "down",
  },
  {
    id: 11,
    title: "Mapeamento SENAI",
    description:
      "Alcubierre metric distortion measurements across the propulsion manifold. Exotic matter density requirements reduced by 12% through topology optimization.",
    image: image11,
    link: "https://site11.com",
    color: "#b44fff",

    trend: "up",
  },
  {
    id: 12,
    title: "Monitor Nacional de Investimentos",
    description:
      "Multi-species biological signature array with 360-degree coverage. 847 distinct life form signatures classified across 12 taxonomic categories.",
    image: image12,
    link: "https://site12.com",
    color: "#00ff88",

    trend: "up",
  },
  {
    id: 13,
    title: "Painel de Prospecção",
    description:
      "Chronometric sensor array detecting localized time dilation effects. Current variance from baseline timeline within acceptable 0.0003% tolerance band.",
    image: image13,
    link: "https://site13.com",
    color: "#00d4ff",

    trend: "stable",
  },
  {
    id: 14,
    title: "Portal dos Sindicatos",
    description:
      "Power distribution network load balancing across 32 primary conduits. Zero-point energy extraction efficiency at record 134% of theoretical maximum.",
    image: image14,
    link: "https://site14.com",
    color: "#ffcc00",

    trend: "up",
  },
  {
    id: 15,
    title: "Previsibilidade de Oferta",
    description:
      "Photon emitter array coherence and resolution metrics for holodeck subsystems. Currently rendering 47 simultaneous environments at 8K volumetric resolution.",
    image: image15,
    link: "https://site15.com",
    color: "#ff4488",

    trend: "up",
  },
];
