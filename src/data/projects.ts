export interface ProjectGalleryItem {
  url: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  imageUrl?: string;
  gallery?: ProjectGalleryItem[];
  color?: string;
  description: string;
  fullDescription: string;
  tags: string[];
  backendRepo?: string;
  frontendRepo?: string;
  liveUrl?: string;
  features: string[];
  architecture?: string[];
}

export const projects: Project[] = [
  
  {
    slug: "Sadrakinho-Chatbot",
    title: "Sadrakinho | Chatbot de Agendamento via WhatsApp para Barbearia",
    color: "#b91c1c",
    tagline:
      "TCC desenvolvido para automatizar o atendimento, agendamento e gerenciamento de uma barbearia pelo WhatsApp.",
    role: "Autor / Desenvolvedor Full-Stack",
    period: "2025",
    imageUrl: "/Sadrakinho.jpg",
    gallery: [
      { url: "/welcome.png", caption: "Mensagem de boas-vindas do bot." },
      { url: "/cardapio.png", caption: "Cardápio de serviços e preços." },
      {
        url: "/Escolha o corte de cabelo.png",
        caption: "Escolha do tipo de corte.",
      },
      { url: "/horario.png", caption: "Escolha do dia e horário." },
      { url: "/confirmação.png", caption: "Confirmação do agendamento." },
      { url: "/painel administrador.png", caption: "Painel administrativo pelo WhatsApp." },
      { url: "/planilha.png", caption: "Exemplo de planilha exportada." },
    ],
    description:
      "Aplicação Flask que automatiza o atendimento de uma barbearia pelo WhatsApp usando Twilio, MongoDB e Google Sheets.",
    fullDescription:
      "Este Trabalho de Conclusão de Curso apresenta um chatbot para WhatsApp capaz de conduzir o atendimento de uma barbearia de forma objetiva e automatizada. O bot apresenta os serviços disponíveis, agenda e cancela horários, controla usuários e estados de conversa, oferece funções administrativas e exporta dados para o Google Sheets.",
    tags: [
      "Python",
      "Flask",
      "Twilio WhatsApp API",
      "MongoDB",
      "Google Sheets API",
      "Webhooks",
    ],
    backendRepo:
      "https://github.com/imlucsz/whatsapp-automation-Hair-salon",
    features: [
      "Menu de serviços e preços pelo WhatsApp",
      "Agendamento e cancelamento de horários",
      "Persistência de usuários, conversas, agendamentos e banimentos",
      "Painel administrativo integrado ao próprio WhatsApp",
      "Exportação de agendamentos, banimentos e relatórios para o Google Sheets",
      "Controle da janela de atendimento de 24 horas",
      "Endpoint Flask para receber webhooks do Twilio",
    ],
    architecture: [
      "Aplicação Flask responsável pelo endpoint de entrada e roteamento das mensagens",
      "MongoDB para persistência dos dados e estados do atendimento",
      "Twilio para integração com o WhatsApp e envio das mensagens",
      "Google Sheets API para exportação e organização dos relatórios",
      "Variáveis de ambiente para manter credenciais e configurações fora do código",
    ],
  },
{
    slug: "splitscreen-badgley-x-curry",
    title: "YOU vs. The Athlete | Plataforma Web Interativa",
    tagline: "Projeto acadêmico desenvolvido como um portal webgit imersivo para apresentar a trajetória, carreira e conquistas do ator Penn Badgley e do atleta Stephen Curry de forma interativa.",
    role: "Autor / Desenvolvedor Front-End",
    period: "2026",
    imageUrl: "/capa_penn_vs cury.jpg",
    color: "#09e51b",
    description: "Portal web interativo que une entretenimento e esportes, apresentando as biografias e marcos de Penn Badgley e Stephen Curry em uma experiência cinematográfica.",
    fullDescription: "Desenvolvido para a disciplina de Desenvolvimento Web I do curso de DSM na FATEC Itaquera, o SplitScreen une as histórias de um artista e de um atleta em uma única Single Page Application (SPA). O projeto conta com design system dark, componentes modulares, linha do tempo interativa com animações de scroll, quiz com pontuação em tempo real e um player multimídia com integração do YouTube.",
    tags: ["HTML5", "CSS3", "JavaScript", "Git"],
    frontendRepo: "https://github.com/imlucsz/Fan-Page",
    liveUrl: "https://fan-page-indol.vercel.app/",
    features: [
      "Perfil Hero imersivo com efeito tilt e vídeo de fundo interativo",
      "Navegação por abas (Sobre, Carreira, Prêmios) e linha do tempo expansível",
      "Carrosséis e modais dinâmicos no estilo plataformas de streaming",
      "Quiz interativo com embaralhamento e cálculo de pontuação ao vivo",
      "Player de vídeo customizado com playlist lateral dinâmica",
      "Cursor customizado em desktop e layout 100% responsivo"
    ],
    architecture: [
      "HTML5 Semântico focado em acessibilidade e marcas ARIA",
      "CSS3 avançado com CSS Grid, Flexbox e variáveis customizadas",
      "JavaScript Vanilla para manipulação avançada do DOM e Intersection Observer",
      "Estrutura otimizada em Single Page Application (SPA)"
    ],
    gallery: [
      { 
        url: "/lobby.png", 
        caption: "Lobby SplitScreen: escolha interativa entre o universo do entretenimento e dos esportes." 
      },
      { 
        url: "/inicial_penn.png", 
        caption: "Seção Hero de Penn Badgley com tipografia temática e citação marcante." 
      },
      { 
        url: "/conheca_peen.png", 
        caption: "Visão geral do artista com métricas de carreira e navegação por abas." 
      },
      { 
        url: "/timeline_penn.png", 
        caption: "Linha do tempo interativa destacando os principais marcos históricos e profissionais." 
      },
      { 
        url: "/netflix_penn.png", 
        caption: "Carrossel de obras no estilo plataforma de streaming com detalhes em modal." 
      },
      { 
        url: "/Quiz_penn.png", 
        caption: "Módulo de quiz interativo para testar o conhecimento do usuário." 
      },
      { 
        url: "/Player_de_Vídeos_penn.png", 
        caption: "Player de mídia customizado com integração ao YouTube e playlist lateral." 
      },
      { 
        url: "/galeria_penn.png", 
        caption: "Mural multimídia com exibição de fotos e momentos marcantes do ator." 
      },
      { 
        url: "/curry_inicio.png", 
        caption: "Seção Hero de Stephen Curry no estilo Spotify com estatísticas da NBA." 
      },
      { 
        url: "/conheca_curry.png", 
        caption: "Perfil detalhado do atleta com contadores de títulos, MVPs e arremessos." 
      },
      { 
        url: "/timeline_curry.png", 
        caption: "Linha do tempo interativa rastreando da NCAA ao topo do basquete mundial." 
      },
      { 
        url: "/estatisticas_curry.png", 
        caption: "Painel visual de métricas avançadas e histórico das melhores temporadas." 
      },
      { 
        url: "/spotify_curry.png", 
        caption: "Interface de jogos históricos inspirada no visual do Spotify." 
      },
      { 
        url: "/quiz_curry.png", 
        caption: "Quiz interativo temático sobre a trajetória de Stephen Curry." 
      },
    ],
  },
  {
    slug: "tela-livre",
    title: "Tela Livre",
    tagline:
      "Plataforma web full-stack desenvolvida em equipe como Projeto Integrador da FATEC, com controle de permissões por perfil.",
    role: "Desenvolvedor Back-End / Líder Técnico",
    period: "2026",
    color: "#2E5D7A",
    description:
      "Plataforma web full-stack em Next.js e TypeScript, com autenticação via NextAuth v5 e persistência de dados em MongoDB.",
    fullDescription:
      "Projeto Integrador desenvolvido em equipe na FATEC Itaquera. Atuei na construção das rotas de API RESTful, no controle de acesso por perfil (RBAC) e na modelagem de dados NoSQL no MongoDB, além de liderar tecnicamente o time e manter o versionamento de código estruturado via Git/GitHub.",
    tags: ["Next.js", "TypeScript", "NextAuth v5", "MongoDB", "RBAC"],
    features: [
      "Autenticação e controle de acesso por perfil (RBAC)",
      "Modelagem de dados NoSQL no MongoDB",
      "Rotas de API RESTful",
      "Versionamento de código estruturado em equipe",
    ],
    architecture: [
      "Next.js com TypeScript no front-end e back-end integrados",
      "NextAuth v5 para autenticação",
      "MongoDB para persistência de dados",
      "Git/GitHub para controle de versão em equipe",
    ],
  },
  {
    slug: "sistema-agendamento-barbearia",
    title: "Sistema de Agendamento para Barbearia",
    tagline:
      "Sistema web de agendamento online desenvolvido em equipe, com catálogo de serviços, agendamento por cliente e painel administrativo.",
    role: "Desenvolvedor Back-End",
    period: "2026",
    color: "#1A2733",
    description:
      "Sistema completo de agendamento online para barbearias, com backend em FastAPI e autenticação JWT.",
    fullDescription:
      "Projeto acadêmico em equipe na FATEC Itaquera. Desenvolvido com backend em Python (FastAPI e SQLAlchemy), banco de dados SQLite e autenticação JWT com Passlib, além de frontend em HTML5, CSS3 e JavaScript consumindo a API via fetch.",
    tags: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "SQLite",
      "JWT",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    features: [
      "Catálogo de serviços e agendamento por cliente",
      "Painel administrativo para o gestor",
      "Autenticação JWT com Passlib",
      "Consultas e regras de negócio direto no banco de dados",
    ],
    architecture: [
      "Backend em FastAPI com SQLAlchemy e SQLite",
      "Autenticação via JWT",
      "Frontend em HTML5, CSS3 e JavaScript consumindo a API via fetch",
    ],
  },
  {
    slug: "fala-fatec",
    title: "Fala Fatec | Assistente de Comunicação Acadêmica com IA",
    tagline:
      "Assistente de comunicação acadêmica da FATEC Itaquera, desenvolvido no 1º Hackathon da instituição.",
    role: "Tech Lead",
    period: "2026",
    color: "#9FD4E8",
    imageUrl: "/falafatec/falafatec_capa.jpg",
    gallery: [
      { url: "/falafatec/falafatec_mascote.jpg", caption: "Mascote do projeto Fala Fatec." },
      {
        url: "/falafatec/falafatec_login.png",
        caption: "Tela demonstrativa de login; não integrada ao MVP atual.",
      },
      {
        url: "/falafatec/falafatec_cadastro.png",
        caption: "Tela demonstrativa de cadastro; não integrada ao MVP atual.",
      },
      {
        url: "/falafatec/falafatec_comunicados.png",
        caption: "Interface demonstrativa de comunicados; não integrada ao MVP atual.",
      },
      {
        url: "/falafatec/falafatec_interface.jpg",
        caption: "Fluxo do bot no WhatsApp para consultas e comunicados acadêmicos.",
      },
    ],
    description:
      "Assistente acadêmico pelo WhatsApp, conectado a uma API FastAPI com integração ao Google Gemini para responder dúvidas gerais dos alunos.",
    fullDescription:
      "Desenvolvido em equipe no 1º Hackathon FATEC Itaquera, em 26/09/2026. Como Tech Lead, participei da construção de uma API em Python com FastAPI, integração com o Google Gemini e um bot de WhatsApp. O assistente permite consultar aulas do dia seguinte, provas, eventos e comunicados, enviar sugestões e encaminhar dúvidas gerais para a IA. Professores podem cadastrar comunicados pela API, e o bridge pode distribuir avisos oficiais aos alunos correspondentes. O MVP não possui frontend, PostgreSQL ou autenticação de professores integrados; os dados das rotas da API ficam em memória e são perdidos quando o processo reinicia.",
    tags: [
      "Python",
      "FastAPI",
      "Google Gemini",
      "google-genai",
      "Node.js",
      "Baileys",
      "WhatsApp",
      "Axios",
      "OpenAPI",
      "Hackathon",
    ],
    backendRepo: "https://github.com/imlucsz/hackathon-fatec-2026",
    features: [
      "Consulta de aulas do dia seguinte, provas, eventos e comunicados pelo WhatsApp",
      "Modo de IA com Google Gemini para dúvidas gerais dos alunos",
      "Envio de sugestões de mudança pelos alunos",
      "Cadastro e consulta de comunicados acadêmicos pela API",
      "Distribuição periódica de comunicados oficiais aos alunos vinculados ao curso e semestre",
      "Documentação interativa da API disponível via OpenAPI/Swagger",
      "Sessão do WhatsApp vinculada por QR Code",
    ],
    architecture: [
      "API REST em Python 3.11+ com FastAPI e documentação OpenAPI em /docs",
      "Google Gemini integrado pelo SDK google-genai; modelo configurado por GEMINI_MODEL",
      "Bridge em Node.js com Baileys para conexão ao WhatsApp e Axios para chamadas à API",
      "Dados de alunos e controle de comunicados enviados persistidos localmente em arquivos JSON no bridge",
      "Rotas da API armazenam dados em memória, sem persistência após reinício",
      "MVP sem frontend, PostgreSQL ou autenticação de professores integrados",
    ],
  },
  {
    slug: "Mini_Kanban",
    title: "Mini Kanban",
    tagline:
      "Kanban web simples e visual, criado para ajudar a organizar rotinas do dia a dia.",
    imageUrl: "/mini-kanban/kanban-capa.jpg",
    role: "Autor / Desenvolvedor Front-End",
    period: "2026",
    color: "#b91c1c",
    description:
      "Aplicação de Kanban em HTML, CSS e JavaScript puro, com persistência local via LocalStorage.",
    fullDescription:
      "Projeto pessoal front-end, construído com HTML, CSS e JavaScript puro, sem frameworks, com persistência de dados via LocalStorage e inspiração visual no React Bits.",
    tags: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    frontendRepo: "https://github.com/imlucsz/Mini-Kanban",
    liveUrl: "https://mini-kanban-umber.vercel.app/",
    features: [
      "Quadro Kanban com colunas e cartões organizáveis",
      "Persistência de dados local via LocalStorage",
      "Interface visual inspirada no React Bits",
    ],
  },
];
