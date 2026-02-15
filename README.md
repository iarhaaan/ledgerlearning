<div align="center">

# 📒 LedgerLearning

### Master SAP — The Modern Way

**A premium, open-source SAP training platform built with React 19, TypeScript, and ❤️**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

<br />

**`4 Modules`** · **`80+ Lessons`** · **`Interactive Quizzes`** · **`Certification Simulator`** · **`Dark Mode`** · **`10+ Theme Colors`**

---

</div>

## ✨ What is LedgerLearning?

LedgerLearning is a **beautifully crafted, feature-rich SAP learning platform** that takes you from beginner to certification-ready. Covering the most in-demand SAP modules — **FICO**, **SD**, **MM**, and **ABAP** — it combines expert-crafted content with a modern, interactive learning experience.

No backend. No accounts. No paywalls. Just open it and start learning.

<br />

## 🧭 Modules

| Module | Description |
|--------|-------------|
| 🏦 **SAP FICO** | Financial Accounting & Controlling — chart of accounts, G/L, AP/AR, cost centers, profit centers, and more |
| 📦 **SAP MM** | Materials Management — procurement, purchase orders, inventory, invoice verification |
| 🛒 **SAP SD** | Sales & Distribution — order-to-cash, pricing, shipping, billing, credit management |
| 💻 **SAP ABAP** | ABAP Programming — syntax, data dictionary, reports, ALV, BAPIs, enhancements, debugging |

<br />

## 🚀 Features

### 📖 Learning Engine
- **80+ detailed lessons** with real-world SAP context
- Structured curriculum: Modules → Chapters → Lessons
- Rich content with T-Codes, SPRO paths, tips, and key concepts
- Auto-advance to the next lesson on completion
- Bookmark system for saving important lessons

### 🧠 Practice & Assessment
- **Chapter-end quizzes** with instant scoring and detailed answer review
- **Certification Simulator** — timed mock exams that mirror the real SAP certification format
- **Scenario Mode** — interactive business case walkthroughs (consultancy-style problem solving)
- **Flashcards** — spaced repetition for glossary terms and T-Codes

### 🔎 Reference Tools
- **Glossary** — searchable SAP terminology with shareable deep links
- **T-Code Index** — filterable, searchable transaction code reference across all modules
- **SPRO Explorer** — hierarchical tree view of SAP configuration (IMG) paths
- **Cheatsheet Generator** — printable quick-reference sheets per module

### 📊 Progress Tracking
- Visual progress dashboard with module-level and chapter-level completion
- Local storage persistence — your progress stays even after closing the browser
- Confetti celebration 🎉 when you complete milestones

### 🎨 Design & UX
- **Light & Dark mode** with smooth transitions
- **10+ theme color palettes** — Indigo, Emerald, Rose, Amber, Cyan, and more
- **Lenis smooth scrolling** for a native-app feel
- Glassmorphism, subtle animations, and micro-interactions
- Fully responsive — optimized for desktop, tablet, and mobile

<br />

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router 7 |
| **Scrolling** | Lenis |
| **Animations** | CSS Keyframes + canvas-confetti |
| **State** | React Context API + localStorage |

<br />

## 📁 Project Structure

```
ledgerlearning/
├── components/          # 15 React components
│   ├── LandingPage.tsx          # Hero landing with animated stats
│   ├── Dashboard.tsx            # Module overview & progress dashboard
│   ├── ModuleDetail.tsx         # Lesson viewer, quiz engine, navigation
│   ├── Header.tsx               # Nav, search, theme controls
│   ├── CertificationSimulator.tsx  # Timed mock certification exams
│   ├── ScenarioMode.tsx         # Interactive business case simulator
│   ├── FlashcardsPage.tsx       # Flashcard study mode
│   ├── GlossaryPage.tsx         # Searchable glossary
│   ├── TCodeIndexPage.tsx       # Transaction code reference
│   ├── SproExplorerPage.tsx     # SPRO/IMG path explorer
│   ├── CheatsheetPage.tsx       # Printable cheatsheet generator
│   └── ...
├── constants/
│   ├── content/                 # 85+ lesson content files
│   │   ├── fico/                # SAP FICO lessons
│   │   ├── sd/                  # SAP SD lessons
│   │   ├── mm/                  # SAP MM lessons
│   │   └── abap/                # SAP ABAP lessons
│   ├── glossary.ts              # 100+ SAP terms
│   └── modules.ts               # Module definitions
├── contexts/                    # React Context providers
│   ├── ProgressContext.tsx       # Lesson completion tracking
│   ├── QuizContext.tsx           # Quiz state & scoring
│   ├── ThemeColorContext.tsx     # Dynamic theme color system
│   └── LenisContext.tsx          # Smooth scroll provider
├── index.html                   # App shell + global CSS
├── App.tsx                      # Root component + routing
└── types.ts                     # TypeScript type definitions
```

<br />

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ledgerlearning.git
cd ledgerlearning

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **`http://localhost:5173`** 🚀

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

<br />

## 🗺️ Roadmap

- [ ] More SAP modules (PP, QM, HCM, Basis)
- [ ] Spaced repetition algorithm for flashcards
- [ ] Export progress as PDF certificate
- [ ] Community-contributed content
- [ ] PWA support for offline learning

<br />

## 🤝 Contributing

Contributions are welcome! Whether it's adding new SAP content, fixing bugs, or improving the UI — every PR matters.

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

<br />

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<br />

---

<div align="center">

**Built with ❤️ by [Farhan](https://github.com/your-username)**

*If LedgerLearning helped you, give it a ⭐ on GitHub!*

</div>
