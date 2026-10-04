export interface Certification {
  name: string;
  issuer: string;
  date: string;
  technology: string;
  imageUrl: string;
  imageAlt: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "ONE | Imersão: Agentes de IA para Negócios",
    issuer: "Oracle Next Education e Alura",
    date: "30 set. 2026 · 4 horas",
    technology: "IA generativa",
    imageUrl:
      "/certifications/One%20%20Imers%C3%A3o%20Agentes%20de%20IA%20para%20Neg%C3%B3cios%20-%20Oracle.jpg",
    imageAlt: "Certificado ONE de Imersão: Agentes de IA para Negócios",
    credentialUrl:
      "https://cursos.alura.com.br/immersion/certificate/07b94376-d223-453b-994f-10806ca7aaeb",
  },
  {
    name: "Implementação de Serviços de Inteligência Artificial em Nuvem — AI-900",
    issuer: "SENAI São Paulo",
    date: "29 ago. – 5 dez. 2025 · 40 horas",
    technology: "Microsoft Azure AI",
    imageUrl:
      "/certifications/Implementa%C3%A7%C3%A3o%20de%20Servi%C3%A7os%20de%20inteligencia%20artificial%20em%20nuvem%20-MICROSOFT%20AI900%20-%20senai.jpg",
    imageAlt:
      "Certificado SENAI de Implementação de Serviços de Inteligência Artificial em Nuvem — Microsoft AI-900",
  },
  {
    name: "Capacita+: Construa com o Gemini",
    issuer: "Google Cloud",
    date: "25 set. 2026",
    technology: "Google Gemini",
    imageUrl: "/certifications/Google%20cloud%20capacita%20%2B%20gemini.jpg",
    imageAlt: "Certificado Google Cloud Capacita+: Construa com o Gemini",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "25 mar. 2026",
    technology: "Cibersegurança",
    imageUrl: "/certifications/Cisco.jpg",
    imageAlt: "Certificado Cisco Networking Academy Introduction to Cybersecurity",
  },
];