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
    frontendRepo:
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
];
