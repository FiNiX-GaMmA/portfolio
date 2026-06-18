# 🔬 Scientific Machine Learning & Data Science Portfolio

### 🚀 Live Website: [https://finix-gamma.github.io/portfolio/](https://finix-gamma.github.io/portfolio/)

A premium, high-contrast, lightweight personal portfolio web application developed with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Adheres to a pristine **Neo-Brutalist Light** design language with solid boxy structures, vibrant color shadows, and smooth spring animations.

This portfolio is configured for **fully automated, warning-free CI/CD deployment on GitHub Pages** using GitHub Actions and Node 24.

---

## 🌟 Key Features

1. **🤖 Cortex-Arya AI Semantic Console**:
   An interactive, deterministic RAG chatbot simulator trained exclusively on your real-world achievements. To ensure 100% professional accuracy and prevent hallucinations, free-text queries are replaced by a sleek, retro **Vector Query Console** triggering precise, indexed database lookups.
2. **🎠 Autosliding Project Carousel (16 Projects)**:
   An infinite, horizontal animated sliding carousel displaying your complete timeline of 16 personal, academic, and enterprise projects. It features auto-slide cycles, pause-on-hover capabilities, and manual transition controls.
3. **💼 Career Milestones & Timeline**:
   A clean chronological timeline highlighting your **3+ years of hands-on Machine Learning, GenAI, and Data Science experience** spanning roles as a Data Science Specialist, Associate ML Engineer, and Data Science Intern.
4. **📜 Professional Certifications Grid**:
   A high-contrast grid displaying 9 of your advanced technical credentials (including Anthropic Model Context Protocol, AWS Advanced ML Level 300, and Udacity GenAI Foundations) with Credential IDs and live verification links.
5. **💬 Verbatim Peer Accolades Wall**:
   A masonry style feedback log showing raw, sanitized reviews and testimonials from team leads, directors, and colleagues.
6. **🔒 Proprietary Code Protection**:
   Personal and open-source projects link directly to your GitHub profile, while enterprise-restricted architectures (such as `SearchIQ`, `LEGO multimodals`, and `Halcyon classifiers`) are elegantly labeled with a **`🔒 Enterprise Proprietary`** badge to maintain compliance.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Framework**: [React 18](https://react.dev/) + [Vite](https://vite.dev/) (ultra-fast compilation & hot reloading)
* **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) (Neo-Brutalist utility configurations)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) (smooth spring physics & AnimatePresence transitions)
* **Icons**: [Lucide React](https://lucide.dev/) (stark vector icons)
* **Data Layer**: Clean decoupled JSON schemas (`src/data.json`)
* **CI/CD Deployment**: GitHub Actions (`deploy.yml`) running Node 24

---

## 🚀 Local Installation & Execution

Ensure you have **Node.js** (v22+ or v24+ recommended) and **npm** installed on your machine.

### 1. Install Dependencies
Navigate into your project folder and run:
```bash
npm install
```

### 2. Launch Local Development Server
Start the local server in hot-reload dev mode:
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser to interact with the webpage.

### 3. Compile Production Bundle Locally
To verify the build or output static static structures in `dist/`:
```bash
npm run build
```

---

## 📦 Automated GitHub Pages Deployment (CI/CD)

The project includes an automated deployment pipeline configured under `.github/workflows/deploy.yml`.

To deploy your page live on **`https://FiNiX-GaMmA.github.io/portfolio/`**:

1. **Push your code to GitHub**: Commit and push your local directory to your main branch on GitHub.
2. **Enable Actions as the Pages Source**:
   * Go to your repository settings page: `https://github.com/FiNiX-GaMmA/portfolio/settings/pages`
   * Under **Build and deployment -> Source**, change the dropdown from `Deploy from a branch` to **`GitHub Actions`**.
3. **Automated Run**: Any future push to your default branch will automatically trigger the workflow, compile your React build under Node 24, and publish it live in less than 60 seconds!

---

## 📂 Directory Structure

```text
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions Node 24 deployment pipeline
├── public/
│   └── Aryaroop_..._Resume.pdf  # Static resume PDF linked on-page
├── src/
│   ├── App.jsx              # Main Single-Page App (all views, cards & states)
│   ├── data.json            # Extracted peer reviews, timeline, and milstones
│   ├── index.css            # Tailwind base directive and custom boxy-shadows
│   └── main.jsx             # React DOM renderer
├── index.html               # Main HTML entrypoint (Inter & JetBrains Mono fonts)
├── package.json             # Build script configurations & dependencies
├── postcss.config.js        # PostCSS directives
├── tailwind.config.js       # Color, font extensions & boxy shadow offsets
└── README.md                # This documentation file
```

---

## 🎓 Author Profile
* **GitHub**: [@FiNiX-GaMmA](https://github.com/FiNiX-GaMmA)
* **Medium Blog**: [@aryaroop04](https://aryaroop04.medium.com/)
* **LinkedIn**: [Aryaroop Majumder](https://linkedin.com/in/aryaroop-majumder-a779691bb)
* **Email**: [aryaroop04@gmail.com](mailto:aryaroop04@gmail.com)
