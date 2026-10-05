# Lucas Araujo de Souza | Portfólio

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Portfólio profissional criado para apresentar minha jornada em tecnologia, meus projetos, experiência prática e habilidades como desenvolvedor. Aqui você encontra uma visão geral da minha formação acadêmica, projetos construídos, stack técnica e formas de contato.

Sou estudante de Desenvolvimento de Software Multiplataforma na Fatec Itaquera e busco oportunidades em desenvolvimento Backend, Full-Stack e Engenharia de Software. Tenho foco em APIs RESTful, automação, arquitetura de software, sistemas distribuídos, bancos de dados e integração com IA.

### Disponível para
- Estágio em desenvolvimento Backend
- Estágio em desenvolvimento Full-Stack
- Estágio/treinee em Engenharia de Software

### Contato
- [LinkedIn](https://www.linkedin.com/in/imlucsz)
- [GitHub](https://github.com/imlucsz)
- [E-mail](mailto:lucasaraujosouza05@gmail.com)

---

## Sobre o projeto

Este repositório contém o código do meu portfólio web, desenvolvido em Next.js com React e TypeScript. A aplicação tem um design moderno, visual escuro com estética de terminal, layout responsivo e seções dedicadas para apresentação pessoal, formação, experiência e projetos.

O objetivo principal é demonstrar:
- minhas competências técnicas;
- meu histórico acadêmico e profissional;
- projetos que desenvolvi individualmente ou em equipe;
- facilidade com interfaces, APIs e arquitetura de software.

---

## Principais seções da aplicação

A landing page inclui:

- Hero / apresentação inicial com visual impactante e fundo interativo.
- Sobre mim com resumo profissional e foco em engenharia de software.
- Experiência e formação acadêmica.
- Grid de projetos em destaque.
- Página detalhada de cada projeto em rota dinâmica.
- Esfera interativa com as principais tecnologias utilizadas.
- Seção de certificações e credenciais.
- Footer com links sociais e contato.

Além disso, a aplicação possui:

- navegação responsiva;
- animações suaves;
- layout mobile-first;
- visual consistente para apresentação profissional;
- páginas de detalhes com galeria de imagens, badges e arquitetura do projeto.

---

## Stack tecnológica

### Core
- [Next.js](https://nextjs.org/) 16.2
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)

### Estilização e UX
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide React](https://lucide.dev/)
- [Motion](https://motion.dev/)
- `clsx` e `tailwind-merge`

### Ferramentas e qualidade
- ESLint
- App Router do Next.js
- TypeScript strict mode
- Vercel-ready

---

## Projetos em destaque

A estrutura de dados do portfólio inclui projetos reais desenvolvidos por mim, como:

1. Sadrakinho | Chatbot de Agendamento via WhatsApp para Barbearia
   - Automação de atendimento e agendamento por WhatsApp
   - Integração com Twilio, MongoDB e Google Sheets
   - Backend em Python/Flask

2. YOU vs. The Athlete | Plataforma Web Interativa
   - Fan page de Penn Badgley e Stephen Curry
   - SPA com timeline interativa, quiz e player multimídia
   - Desenvolvimento front-end em HTML, CSS e JavaScript

3. Tela Livre
   - Plataforma web full-stack com controle de permissões por perfil
   - Uso de Next.js, TypeScript, NextAuth v5 e MongoDB

4. Sistema de Agendamento para Barbearia
   - Sistema de agendamento online
   - Backend em FastAPI + SQLAlchemy + SQLite
   - Autenticação JWT

5. Fala Fatec | Assistente de Comunicação Acadêmica com IA
   - Bot via WhatsApp com IA para responder dúvidas acadêmicas
   - Integração com Google Gemini e bridge de WhatsApp
   - Projeto desenvolvido em hackathon

6. Mini Kanban
   - Kanban simples com persistência local via LocalStorage
   - Interface organizada para produtividade pessoal

---

## Certificações e formação

Além dos projetos, o portfólio também destaca minhas certificações em IA, cloud, cibersegurança e tecnologia.

Certificações presentes no projeto:
- ONE | Imersão: Agentes de IA para Negócios
- Implementação de Serviços de Inteligência Artificial em Nuvem — AI-900
- Capacita+: Construa com o Gemini
- Introduction to Cybersecurity

Formação:
- Fatec Itaquera — Desenvolvimento de Software Multiplataforma
- Etec de Ferraz de Vasconcelos — Técnico em Administração

---

## Estrutura do repositório

```text
Luc.dev/
├── LICENSE
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public/                     # imagens, assets, screenshots e arte dos projetos
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── projects/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Certifications.tsx
│   │   ├── ClippyAssistant.tsx
│   │   ├── DesktopGoose.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navbar.tsx
│   │   ├── PixelPet.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── TechStack.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ui/
│   │       ├── DotField.tsx
│   │       └── SpotlightCard.tsx
│   ├── data/
│   │   ├── certifications.ts
│   │   ├── loading.ts
│   │   ├── profile.ts
│   │   └── projects.ts
│   └── lib/
│       └── utils.ts
└── tsconfig.json
```

---

## Como executar localmente

### Pré-requisitos
- Node.js 18+ 
- npm, pnpm ou yarn

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/imlucsz/Luc.dev.git
cd Luc.dev
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

```text
http://localhost:3000
```

### Build de produção

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Scripts disponíveis

No arquivo `package.json`, os scripts principais são:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

---

## Observações

- O projeto foi construído para funcionar como um portfolio de apresentação pessoal e profissional.
- O conteúdo principal está centralizado em arquivos na pasta `src/data/`, o que facilita manutenção e atualização de perfis, projetos e certificações.
- O design foi pensado para ser moderno, responsivo e visualmente diferenciado, mantendo boa legibilidade em desktop e mobile.
- A aplicação está pronta para deploy em Vercel, sendo compatível com a infraestrutura padrão do Next.js.

---

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Conecte-se comigo

Se quiser conversar sobre tecnologia, projetos, oportunidades, arquitetura de software ou desenvolvimento de produtos, fique à vontade para me chamar:

- [LinkedIn](https://www.linkedin.com/in/imlucsz)
- [GitHub](https://github.com/imlucsz)
- [E-mail](mailto:lucasaraujosouza05@gmail.com)
