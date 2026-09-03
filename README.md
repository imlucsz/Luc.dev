# Lucas Araujo de Souza | Portfólio

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Portfólio profissional desenvolvido para apresentar minha trajetória, projetos e habilidades em desenvolvimento de software. Atualmente, busco uma oportunidade de estágio em desenvolvimento Backend, Full-Stack ou Engenharia de Software.

Sou estudante de Desenvolvimento de Software Multiplataforma na Fatec Itaquera, com interesse em APIs, automação, arquitetura de software, sistemas distribuídos e bancos de dados. Tenho experiência prática com TypeScript, Node.js, Python, React, Next.js, SQL e NoSQL.

**Disponível para estágio:** Desenvolvimento Backend, Full-Stack e Engenharia de Software.

**Contato:** [LinkedIn](https://www.linkedin.com/in/imlucsz) · [GitHub](https://github.com/imlucsz) · [E-mail](mailto:lucasaraujosouza05@gmail.com)

---

## Sobre o Projeto

Este projeto é uma aplicação web responsiva construída para funcionar como meu portfólio profissional. A página reúne informações sobre minha formação, experiência, stack técnica e projetos selecionados, com páginas individuais para apresentar detalhes de cada trabalho.

---

## Seções da Aplicação

- **Hero / Apresentação:** Apresentação inicial com fundo animado em Canvas HTML5 (`<DotField/>`), interativo com o movimento do cursor e visual escuro com estética de terminal.
- **Sobre Mim:** Resumo profissional com foco em Engenharia de Software, arquitetura e construção de APIs RESTful.
- **Experiência e Formação:** Linha do tempo com minha experiência profissional e formação acadêmica.
- **Projetos em Destaque:** Sistemas desenvolvidos como Orquestra Queue System, FinWise e FuraFila Digital, com páginas individuais de detalhes.
- **Página de Detalhes do Projeto (`/projects/[slug]`):** Roteamento dinâmico que apresenta galeria de imagens com proporção natural, tags técnicas, links para repositórios GitHub/Live Demo, visão geral do sistema e especificações de arquitetura.
- **Tecnologias & Skills:** Ecossistema de habilidades categorizado em Linguagens, Frontend, Backend, Banco de Dados/ORM, Filas/Serviços e DevOps.
- **Navegação Responsiva:** Header com transições fluidas e menu hambúrguer animado no mobile via `motion`.

---

## Tecnologias & Ferramentas

### Core & Framework
- **[Next.js](https://nextjs.org/):** App Router, Server Components e Static Site Generation (SSG) para alta velocidade de carregamento.
- **[React](https://react.dev/):** Biblioteca principal para renderização e gerenciamento de estado.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática rigorosa para segurança e previsibilidade do código.

### Interface & Animações
- **[Tailwind CSS](https://tailwindcss.com/):** Estilização responsiva baseada em utilitários.
- **[Motion](https://motion.dev/):** Animações de entrada, transições e componentes interativos.
- **[Lucide React](https://lucide.dev/):** Pacote de ícones minimalistas.

### Tooling & Deploy
- **[Turbopack](https://nextjs.org/docs/app/api-reference/turbopack):** Bundler ultrarrápido para desenvolvimento.
- **[Vercel](https://vercel.com/):** Hospedagem e integração contínua.
- **ESLint:** Análise estática e qualidade do código.

---

## Estrutura de Pastas

```text
Luc.dev/
├── public/                # Imagens estáticas, prints e artes dos projetos
├── src/
│   ├── app/               # Next.js App Router (Páginas e rotas dinâmicas)
│   │   ├── page.tsx       # Landing page principal
│   │   └── projects/      # Rota dinâmica [slug] para detalhes de cada projeto
│   ├── components/        # Componentes Reutilizáveis de UI
│   │   ├── Navbar.tsx     # Menu de navegação responsivo
│   │   ├── Hero.tsx       # Seção principal de entrada
│   │   ├── TechStack.tsx  # Seção de habilidades por categoria
│   │   └── ui/            # Componentes gráficos (DotField canvas, etc.)
│   └── data/              # Dados do perfil e dos projetos
├── next.config.ts         # Configuração do Next.js
└── package.json           # Dependências e scripts do projeto
```

## Como Executar o Projeto Localmente
### Pré-requisitos
- Node.js v18 ou superior instalado.
- Gerenciador de pacotes npm, yarn ou pnpm.

### Passo a Passo
1. Clone o repositório:
```bash
git clone https://github.com/imlucsz/Luc.dev.git
cd Luc.dev
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
Abra http://localhost:3000 para visualizar a aplicação em execução.

5. Teste o build de produção:
```bash
npm run build
npm run start
```

## Licença
Este projeto está sob a licença MIT. Veja o arquivo para mais detalhes.
