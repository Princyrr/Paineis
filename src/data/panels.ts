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
    description:
      "Monitora a trajetória dos egressos, permitindo analisar inserção profissional, empregabilidade e conexão entre formação e mercado de trabalho.",
    image: image01,
    link: "https://observatorios.fiepr.org.br/salaprospectiva/web/fiepb/analise-egresso",
    color: "#00d4ff",
    trend: "up",
  },

  {
    id: 2,
    title: "Análise de Acidentes de Trabalho",
    description:
      "Reúne dados sobre acidentes de trabalho para identificar ocorrências, padrões e indicadores de segurança, apoiando ações de prevenção e redução de riscos.",
    image: image02,
    link: "https://site2.com",
    color: "#00ff88",
    trend: "stable",
  },

  {
    id: 3,
    title: "Cadastro Nacional",
    description:
      "Centraliza informações cadastrais de empresas e organizações, facilitando a consulta, análise e utilização estratégica de dados para estudos e decisões.",
    image: image03,
    link: "https://site3.com",
    color: "#ff6b35",
    trend: "up",
  },

  {
    id: 4,
    title: "Data Ensight",
    description:
      "Plataforma de inteligência de dados que integra informações e análises para transformar dados em evidências, insights e suporte à tomada de decisão.",
    image: image04,
    link: "https://site4.com",
    color: "#b44fff",
    trend: "up",
  },

  {
    id: 5,
    title: "Empresas Ativas",
    description:
      "Apresenta um panorama das empresas ativas, permitindo analisar distribuição, características e dinâmica do ambiente empresarial em diferentes territórios.",
    image: image05,
    link: "https://site5.com",
    color: "#ffcc00",
    trend: "stable",
  },

  {
    id: 6,
    title: "Enriquecimento de Empresas",
    description:
      "Amplia informações cadastrais e econômicas das empresas a partir da integração de diferentes fontes de dados, qualificando análises e estudos estratégicos.",
    image: image06,
    link: "https://site6.com",
    color: "#00d4ff",
    trend: "up",
  },

  {
    id: 7,
    title: "HUB do Observatório",
    description:
      "Concentra produtos, dados e soluções do Observatório em um ambiente integrado, facilitando o acesso às informações e ferramentas de inteligência.",
    image: image07,
    link: "http://hub.observatoriopb.com.br/",
    color: "#ff4488",
    trend: "up",
  },

  {
    id: 8,
    title: "Indicadores da Juventude Brasileira",
    description:
      "Reúne indicadores sobre a população jovem brasileira, permitindo acompanhar aspectos demográficos, educacionais, profissionais e socioeconômicos.",
    image: image08,
    link: "https://site8.com",
    color: "#00ff88",
    trend: "stable",
  },

  {
    id: 9,
    title: "Infraestrutura",
    description:
      "Apresenta informações sobre infraestrutura e sua distribuição territorial, apoiando análises de capacidade, cobertura e desenvolvimento regional.",
    image: image09,
    link: "https://site9.com",
    color: "#ffcc00",
    trend: "up",
  },

  {
    id: 10,
    title: "Mapeamento Empresas",
    description:
      "Permite visualizar e analisar a distribuição das empresas no território, identificando concentrações, setores de atividade e oportunidades regionais.",
    image: image10,
    link: "https://site10.com",
    color: "#ff6b35",
    trend: "down",
  },

  {
    id: 11,
    title: "Mapeamento SENAI",
    description:
      "Apresenta a distribuição da atuação e da estrutura do SENAI, apoiando a visualização da oferta de serviços e sua relação com as demandas territoriais.",
    image: image11,
    link: "https://site11.com",
    color: "#b44fff",
    trend: "up",
  },

  {
    id: 12,
    title: "Monitor Nacional de Investimentos",
    description:
      "Acompanha investimentos realizados no território nacional, permitindo identificar valores, setores, localidades e movimentos relevantes para a economia.",
    image: image12,
    link: "https://site12.com",
    color: "#00ff88",
    trend: "up",
  },

  {
    id: 13,
    title: "Painel de Prospecção",
    description:
      "Apoia a identificação e análise de empresas e oportunidades estratégicas, utilizando dados para orientar ações de prospecção e relacionamento.",
    image: image13,
    link: "https://site13.com",
    color: "#00d4ff",
    trend: "stable",
  },

  {
    id: 14,
    title: "Portal dos Sindicatos",
    description:
      "Reúne informações e serviços relacionados aos sindicatos, facilitando o acesso a dados institucionais e fortalecendo a conexão com o setor industrial.",
    image: image14,
    link: "https://site14.com",
    color: "#ffcc00",
    trend: "up",
  },

  {
    id: 15,
    title: "Previsibilidade de Oferta",
    description:
      "Utiliza dados e indicadores para analisar a disponibilidade e o comportamento da oferta, contribuindo para antecipar cenários e apoiar decisões estratégicas.",
    image: image15,
    link: "https://site15.com",
    color: "#ff4488",
    trend: "up",
  },
];
