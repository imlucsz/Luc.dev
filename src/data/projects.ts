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
    slug: "chatbot-whatsapp-barbearia",
    title: "Chatbot WhatsApp para Barbearia",
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
    title: "SplitScreen: Badgley x Curry",
    tagline: "Projeto acadêmico desenvolvido como um portal web imersivo para apresentar a trajetória, carreira e conquistas do ator Penn Badgley e do atleta Stephen Curry de forma interativa.",
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
    ],
  } 
]
