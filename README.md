<div>
  <br>
</div>

<div align="left"> 
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> 
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=react-query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white"/>
</div>

<div>
  <br>
</div>

# 🌐 Personal Website Monorepo

A **monorepo project** my personal website project is built with a modern frontend (React + Vite + TypeScript), Firebase Cloud Functions, Redis, and Notion for data storage with the help of Notion API. This repository is organized into **apps** and **packages**, leveraging **PNPM workspaces** for dependency management.

## 🚀 Features

- **Frontend (React 19 + Vite)**: Fast, modular UI with Styled Components, React Router DOM, and TanStack Query.
- **Backend (Firebase Cloud Functions)**: Node.js 22, TypeScript, Firebase Admin SDK.
- **Caching Layer**: Redis with ioredis client, 24h blog cache TTL.
- **External Services**: Notion API for content management.
- **Infrastructure**: Firebase Hosting, CDN, SSL/HTTPS, and Serverless Functions.
- **Development**: PNPM Workspaces, Husky, Lint-staged, ESLint, Prettier, TypeScript.

## 📦 Monorepo Structure

```
personal-website-monorepo/
├── apps/
│   ├── web/            # React + Vite frontend
│   └── functions/      # Firebase Cloud Functions backend
├── packages/           # Shared packages (future extensions)
├── .github/            # CI/CD workflows
├── .husky/             # Git hooks
├── firebase.json       # Firebase configuration
├── pnpm-workspace.yaml # Workspace configuration
└── package.json        # Root scripts and dev tooling
```

## 🛠️ Root Scripts

- `pnpm dev` → Start frontend (web)
- `pnpm build` → Build both functions and web
- `pnpm build:web` → Build frontend only
- `pnpm build:functions` → Build functions only
- `pnpm lint` → Run ESLint across repo
- `pnpm lint:fix` → Auto-fix lint errors
- `pnpm type-check` → Type-check both frontend & functions
- `pnpm deploy:functions` → Deploy Firebase Functions

## 🖥️ Frontend (apps/web)

### Tech Stack

- React 19, TypeScript, Vite
- TanStack Query for server state management
- Styled Components for styling
- i18next & react-i18next for localization
- React Router DOM for routing
- Lucide React & React Icons for icons
- Highlight.js for syntax highlighting

### Scripts

- `pnpm dev` → Start Vite dev server
- `pnpm build` → Build for production
- `pnpm preview` → Preview production build
- `pnpm lint` → Lint frontend code
- `pnpm generate-sitemap` → Generate sitemap dynamically

## 🔥 Backend (apps/functions)

### Tech Stack

- Firebase Cloud Functions
- Node.js 22, TypeScript
- Firebase Admin SDK
- Redis (ioredis client)

### Scripts

- `pnpm build` → Compile TypeScript
- `pnpm serve` → Start emulator
- `pnpm deploy` → Deploy functions
- `pnpm logs` → View function logs
- `pnpm type-check` → Validate TypeScript types

## 📚 Development Setup

### Prerequisites

- Node.js v22+
- PNPM v10+
- Firebase CLI installed (`npm i -g firebase-tools`)

### Installation

```bash
# Clone repo
git clone https://github.com/your-username/personal-website-monorepo
cd personal-website-monorepo

# Install dependencies
pnpm install

# Start frontend dev server
pnpm dev
```

## 🔄 Deployment

```bash
# Deploy only frontend (Firebase Hosting)
pnpm --filter web build && firebase deploy --only hosting

# Deploy only backend (Functions)
pnpm deploy:functions

# Deploy everything
pnpm build && firebase deploy
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'feat: added new feature'`)
4. Push (`git push origin feature/my-feature`)
5. Open PR

## 📝 License

This project is licensed under the **MIT License**.
