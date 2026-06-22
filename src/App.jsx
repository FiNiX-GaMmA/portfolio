import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Cpu,
  Database,
  Cloud,
  FileText,
  Download,
  Award,
  Shield,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  RefreshCw,
  Send,
  Terminal,
  Star,
  BookOpen,
  ExternalLink,
  Heart,
  Sparkles,
  ArrowUpRight,
  Zap,
  Menu,
  X,
  BadgeAlert,
  Layers,
  Flame,
  Check,
  HelpCircle,
  Play,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import rawData from "./data.json";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I am **Cortex-Arya v1.2**, an offline-compiled AI semantic console. To prevent generic LLM hallucinations, free-text query has been disabled. \n\nPlease select one of the specific verified database queries below to fetch precise technical details, architectures, and peer reviews.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isInitialMount = useRef(true);

  // Auto-scroll chat body container only, keeping parent browser page steady
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Projects list compiled from all your resumes over the years
  const projects = [
    {
      id: "yobitsugi",
      title: "yobitsugi (呼継ぎ)",
      category: "AI / Security CLI",
      desc: "An interactive CLI tool connecting security scanners (SAST/SCA) directly with AI coding assistants (Claude Code, Cursor, Codex, etc.). Scans codebases and guides users step-by-step through security and dependency fixes in real-time.",
      tech: ["Python", "SAST", "SCA", "CLI", "AI Agents"],
      github: "https://github.com/FiNiX-GaMmA/yobitsugi",
      highlight: "Type `/yobitsugi .` in your AI editor",
    },
    {
      id: "searchiq",
      title: "SearchIQ & SEO-Tool Suite",
      category: "AI / SEO Platform",
      desc: "A flagship Scientific Search Intelligence Platform. Maps high-dimensional semantic vector embeddings to cluster search phrases, scores keyword difficulty based on real-time SERP competitive clarity, and features a RAG chatbot for strategy advice.",
      tech: ["GCP", "GenAI", "RAG", "Vector Embeddings", "Flask", "CI/CD"],
      proprietary: true,
      highlight: "Engineered high-dimensional embedding analyzers",
    },
    {
      id: "ats-resume",
      title: "ATS Shield AI",
      category: "AI / Agentic Coach",
      desc: "A containerized, production-grade resume scoring and job-matching coach powered by LangGraph. Features interactive guided resume building and automated applications incorporating an OCR/human-in-the-loop CAPTCHA bypass.",
      tech: ["LangGraph", "Python", "OCR", "Docker", "Form-Builder"],
      github: "https://github.com/FiNiX-GaMmA/ats-resume",
      highlight: "Stateless multi-provider AI backend",
    },
    {
      id: "contextual-rag",
      title: "Hybrid Contextual RAG Chatbot",
      category: "GenAI / RAG",
      desc: "A production-style RAG application with FastAPI endpoints. Combines dense search (Qdrant) and sparse search (BM25) with Reciprocal Rank Fusion (RRF), LLM reranking, and neighboring chunk expansion for grounded, hallucination-free Q&A.",
      tech: ["FastAPI", "Qdrant", "BM25", "RRF", "Reranker", "Docker"],
      github: "https://github.com/FiNiX-GaMmA/contextual-rag-chatbot",
      highlight: "Dense & sparse hybrid search with reranking",
    },
    {
      id: "llama2-chatbot",
      title: "Opensource LLM Chatbot",
      category: "LLM App / Chatbot",
      desc: "A conversational chatbot interface built with Streamlit and optimized for locally-run open-source LLMs, particularly Llama 2. Fine-tuned with localized parameters to handle direct instruction-following prompts.",
      tech: ["Llama 2", "Streamlit", "Hugging Face", "Quantization", "Python"],
      github: "https://github.com/FiNiX-GaMmA/llama2_chatbot",
      highlight: "Custom fine-tuning parameter controls",
    },
    {
      id: "firetv-helper",
      title: "Fire TV Customizer & Vanilla Launcher",
      category: "DevOps / Android OS",
      desc: "A root-aware ADB debloating system, automatic compilation suite, and runbooks converting Amazon Fire TV devices into ad-free and telemetry-free Android TV interfaces, with DNS-over-TLS ad-blocking via ControlD.",
      tech: ["ADB", "Shell Scripting", "Android", "Private DNS", "Vanilla UI"],
      github: "https://github.com/FiNiX-GaMmA/firetv-home-helper",
      highlight: "Freezes 120+ telemetry & bloatware apps",
    },
    {
      id: "nl-to-sql",
      title: "Natural Language to SQL Chatbot",
      category: "GenAI / LLM App",
      desc: "Developed an innovative NL-to-SQL chatbot enabling non-SQL professionals to interact with and draw insights from databases. Leveraged open-source models like Llama 3.1, Google Flan T5, and Starcoder.",
      tech: ["Llama 3.1", "Flan-T5", "Streamlit", "Flask API", "Docker"],
      proprietary: true,
      highlight: "Built for non-SQL database users",
    },
    {
      id: "lego-tagging",
      title: "LEGO Multimodal Tagging",
      category: "Computer Vision",
      desc: "Engineered a GenAI product-tagging automation combining product image signals with onsite textual web scrapers, significantly reducing manual taxonomy effort and improving cataloging accuracy.",
      tech: ["Computer Vision", "Multimodal LLM", "Scrapers", "Python"],
      proprietary: true,
      highlight: "Vision-language product tagger",
    },
    {
      id: "halcyon-classifier",
      title: "Halcyon Topical Classifier",
      category: "NLP / Clustering",
      desc: "Implemented a client-agnostic topical classification system, utilizing advanced NLP clustering algorithms to accurately categorize diverse search phrases across client data sources.",
      tech: ["NLP", "Topical Classifier", "Clustering", "Python"],
      proprietary: true,
      highlight: "Client-agnostic semantic text analyzer",
    },
    {
      id: "pymc",
      title: "TWC PyMC Bayesian Modeling",
      category: "Data Science / Stats",
      desc: "Adapts daily app-install metrics into 5 Bayesian modeling patterns: hierarchical partial pooling (8-schools pattern), ordinal logistic regression for Net_Trust levels, stochastic volatility, and Gaussian mixtures.",
      tech: [
        "PyMC v5",
        "Bayesian Inference",
        "Marimo",
        "ArviZ",
        "Stochastic Volatility",
      ],
      proprietary: true,
      highlight: "Statistical Marketing Mix Modeling",
    },
    {
      id: "wallet",
      title: "Wallet Link Scanner",
      category: "Android App",
      desc: "A personal Android app and local backend turning physical ticket screenshots into official Google Wallet or Samsung Wallet passes using ML Kit Barcode scanning and OCR text recognition.",
      tech: ["Kotlin", "Android SDK", "Google Wallet API", "ML Kit OCR"],
      github: "https://github.com/FiNiX-GaMmA/wallet",
      highlight: "Extracts editable ticket structures",
    },
    {
      id: "seo-similarity",
      title: "Keyword-URL Similarity Dashboard",
      category: "SEO Science",
      desc: "Streamlit dashboard analyzing semantic cosine similarity between keywords and target URLs. Features PostgreSQL user authentication and robust data connectors pulling from Google Sheets and BigQuery.",
      tech: [
        "Streamlit",
        "PostgreSQL",
        "BigQuery",
        "Google Sheets",
        "Cosine Similarity",
      ],
      proprietary: true,
      highlight: "Semantic text matching dashboard",
    },
    {
      id: "hand-gestures",
      title: "Gesture Controlled Volume",
      category: "Computer Vision",
      desc: "Built a custom OpenCV and Mediapipe module to control your computer system device volume using hand gestures. NumPy mapped the physical distance in the video feed to OS volume APIs.",
      tech: ["OpenCV", "Mediapipe", "NumPy", "Python"],
      github: "https://github.com/FiNiX-GaMmA",
      highlight: "Mediapipe hand tracking matrix engine",
    },
    {
      id: "heart-disease",
      title: "Heart Disease Prediction model",
      category: "Machine Learning",
      desc: "Built a classification machine learning model using scikit-learn and TensorFlow to predict the chance of a patient having heart disease from their blood metrics. Applied hyper-parameter tuning.",
      tech: ["Scikit-Learn", "TensorFlow", "Python", "GridSearch"],
      github: "https://github.com/FiNiX-GaMmA",
      highlight: "Achieved high risk classification",
    },
    {
      id: "global-terrorism",
      title: "Global Terrorism Dataset Analysis",
      category: "Data Analytics",
      desc: "Performed full Exploratory Data Analysis (EDA) on the Global Terrorism Dataset. Conducted data cleansing, manipulation, and geospatial mapping to extract global hot zones and trends.",
      tech: ["Pandas", "Python", "Data Cleansing", "Geospatial mapping"],
      github: "https://github.com/FiNiX-GaMmA",
      highlight: "Extracted key safety hot zone trends",
    },
    {
      id: "scratch-classifier",
      title: "Logistic Classifier from Scratch",
      category: "Deep Learning",
      desc: "Constructed an image classifier model (cat vs non-cat) completely from scratch utilizing logistic regression and raw mathematical matrix calculus without Scikit-Learn or TensorFlow.",
      tech: [
        "Python",
        "Matrix Calculus",
        "Sigmoid Function",
        "Logistic Regression",
      ],
      github: "https://github.com/FiNiX-GaMmA",
      highlight: "Constructed with raw Sigmoid calculus",
    },
    {
      id: "discussion-forum",
      title: "Discussion Forum Access-Level",
      category: "Java / OOP",
      desc: "Built a Java command-line discussion forum utilizing Object-Oriented principles. Developed UserRoles() and GetRole() functions to handle hierarchical access systems.",
      tech: ["Java", "Object Oriented Programming", "Access Control", "CLI"],
      github: "https://github.com/FiNiX-GaMmA",
      highlight: "Java CLI user authentication forum",
    },
    {
      id: "omniverse",
      title: "Omniverse Media Player",
      category: "Native Streaming",
      desc: "An ultra-premium, blazing-fast native media companion app for iOS, iPadOS, Android, and Android TV devices, supporting high-throughput private local streaming.",
      tech: ["Kotlin", "Swift", "ExoPlayer", "AVKit", "Native UX"],
      github: "https://github.com/FiNiX-GaMmA/omniplay",
      highlight: "Completely native streaming client",
    },
  ];

  // Autoslide effect
  useEffect(() => {
    if (carouselPaused) return;
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [carouselPaused, projects.length]);

  const handleNextProject = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrevProject = () => {
    setCarouselIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length,
    );
  };

  // Helper to sanitize emails and provide clean professional titles
  const getFriendlyAuthor = (email) => {
    if (!email) return { name: "Engineering Peer", role: "Collaborator" };
    const lower = email.toLowerCase();
    if (lower.includes("sushrut"))
      return { name: "Sushrut T.", role: "Data Science Lead" };
    if (lower.includes("anusha"))
      return { name: "Anusha K.", role: "Senior Analyst" };
    if (lower.includes("gaurav"))
      return { name: "Gaurav M.", role: "Director, MMM" };
    if (lower.includes("yash"))
      return { name: "Yash W.", role: "Product Associate" };
    if (lower.includes("tushar"))
      return { name: "Tushar P.", role: "DevOps & Infrastructure Lead" };
    if (lower.includes("michele"))
      return { name: "Michele L.", role: "Engineering Lead" };
    if (lower.includes("divya"))
      return { name: "Divya P.", role: "Engagement Lead" };
    if (lower.includes("santosh"))
      return { name: "Santosh K.", role: "Agile Delivery Lead" };

    // fallback
    const parts = email.split("@")[0].split(".");
    const name = parts
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return { name, role: "Engineering Colleague" };
  };

  // Preset chatbot prompts with explicit, verified responses
  const chatPrompts = [
    {
      q: "Explain the yobitsugi architecture",
      id: "yobitsugi",
      reply:
        "**yobitsugi (呼継ぎ)** is an interactive CLI scanner built in Python. It solves the gap between static analysis tools and real-time developer workflows by linking standard SAST (Static Application Security Testing) and SCA (Software Composition Analysis) scanners directly with terminal-based LLM assistants.\n\nKey Mechanics:\n* **SAST/SCA Hook:** Automates codebase scanning for vulnerable dependencies, leaked API keys, and injection vectors.\n* **Incremental Repair Cycles:** Passes the JSON audit logs to your active AI assistant (Claude, Cursor, Aider, etc.).\n* **Guided Interactive Fixes:** Guides the developer through editing files line-by-line, verifying fixes against compiler checks in real-time.",
    },
    {
      q: "What did Arya build for LEGO Group?",
      id: "lego",
      reply:
        "For **LEGO Group**, Arya developed and shipped an **automated product-tagging engine** driven by GenAI and multimodal inputs.\n\nKey accomplishments on this project:\n* **Multimodal Fusion:** Engineered a system that ingests raw physical product images and processes them alongside scraped webpage textual catalogs.\n* **Semantic Enrichment:** Leveraged vision-language signals to map products to specific, standardized taxonomy tags.\n* **Operational Impact:** Drastically reduced the manual categorization labor previously required by LEGO data content teams, yielding immediate business value and high stakeholder satisfaction.",
    },
    {
      q: "Detail the SearchIQ platform capabilities",
      id: "searchiq",
      reply:
        "**SearchIQ** is a flagship Scientific Search Intelligence Platform deployed on Google Cloud Platform (GCP). Arya built the backend microservices and analysis utilities.\n\nPlatform Core Features:\n1. **High-Dimensional Embedding Analyzer:** Uses vector embeddings and cosine similarity clustering to map and cluster search phrases.\n2. **RAG Search Strategy Chatbot:** An LLM-powered advisory bot enabling search strategists to perform conversational keyword mappings and query search volume curves.\n3. **SERP competitive clarity engine:** Evaluates the difficulty and organic ranking potential of target search terms by parsing live SERP features.",
    },
    {
      q: "What is Arya's core engineering tech stack?",
      id: "skills",
      reply:
        "Arya's core capabilities map across four specialized disciplines:\n\n* **Machine Learning & GenAI:** LangGraph (stateful agents), RAG pipelines, Vector Embeddings (cosine similarity clustering), Prompt Engineering, Topical Classification.\n* **Data Engineering & Cloud:** Python, PySpark, SQL, Pandas, AWS (Glue, Lambda, S3, EC2), GCP, Azure, Airflow (orchestration), Docker, CI/CD.\n* **Analytics & Statistics:** Bayesian statistical modeling with **PyMC v5** (hierarchical pooling, ordinal logistic regression, stochastic app-install modeling), Demand Forecasting.\n* **Android Development:** Native Android Kotlin, ML Kit (OCR & Barcode scanning), Photo Picker integration, Wallet API linkages.",
    },
    {
      q: "Display colleague review accolades",
      id: "accolades",
      reply:
        "Here is verified peer feedback from Arya's development logs:\n\n* **Sushrut T. (Data Science Lead):** *'Arya successfully delivered the demo of our new AI SEO tool, SearchIQ, with great confidence. On the Halcyon project, Arya displayed excellent proactivity.'*\n* **Anusha K. (Senior Analyst):** *'Huge Shoutout to Arya for implementing the client-agnostic topical classification system... His ability to manage tasks significantly boosts overall team velocity.'*\n* **Tushar P. (DevOps & Infrastructure Lead):** *'Arya brings infectious energy and an excellent, scalable perspective... He excels at developing automated, long-term solutions for complex data pipelines.'*\n* **Yash W. (Product Associate):** *'Thank you, Arya, for the comprehensive walkthrough of the LEGO use case and for articulating the concepts so clearly.'*",
    },
    {
      q: "Describe Arya's expertise as a GenAI Specialist",
      id: "genai_specialist",
      reply:
        "Arya's **Generative AI Specialist** role combines industry-level consulting with cutting-edge engineering:\n\n* **Fortune 500 Product-Tagging:** Built an automated product-tagging engine for a global consumer products client by fusing image signals, web scraping, prompt engineering, and classification rules.\n* **SEO AI Suite:** Shipped an AI SEO tool on GCP integrating RAG workflows, embedding clustering, and topical analysis, slashing research turnaround time by **85%**.\n* **Structured Data Access:** Developed a natural language interface translating complex, ambiguous user queries into precise SQL statements using models like Llama 3.1 and StarCoder.",
    },
    {
      q: "What is Arya's LLM engineering experience?",
      id: "llm_engineer",
      reply:
        "Arya has extensive experience designing and deploying **Large Language Model (LLM)** architectures:\n\n* **Advanced Retrieval Patterns:** Solely built a hybrid contextual RAG application with dense search (Qdrant), sparse search (BM25), reciprocal rank fusion (RRF), LLM reranking, and conversational context enrichment.\n* **Grounding & Validation:** Designed evaluation checks to measure context relevancy, hallucination risks, and answer correctness to ensure high-fidelity responses with clear citations.\n* **Quantization & Efficiency:** Optimized hosting costs, model selection, and search infrastructures to reduce enterprise platform costs from $500+ down to $100-$150 for hundreds of active users.",
    },
    {
      q: "Detail Arya's experience in Credit Model development",
      id: "credit_model",
      reply:
        "Arya applies rigorous, transferable ML engineering principles to **Credit Model Development & Validation**:\n\n* **Mathematical & Statistical Rigor:** Deeply familiar with classification algorithms, scorecard-style models, and probability calibrations (Logistic Regression, Decision Trees).\n* **Model Validation Metrics:** Proficient in computing model evaluation metrics including Area Under the Curve (AUC-ROC), Kolmogorov-Smirnov (KS) statistic, Gini coefficient, Confusion Matrix, and PSI.\n* **Population Stability Index (PSI):** Experienced in measuring input data drift and evaluating performance stability across historical datasets to detect model deterioration.",
    },
    {
      q: "How did Arya optimize big data pipelines?",
      id: "pyspark_pipeline",
      reply:
        "As an Associate ML Engineer at Prescience, Arya optimized enterprise big data workloads for Amazon:\n\n* **AWS Glue DPU Optimization:** Tuned DPU execution parameters and resource management, boosting data-heavy processing performance by **35%** and cutting AWS platform costs by **50%**.\n* **Pyspark ETL Workflows:** Developed robust PySpark pipelines for schema normalization, cleaning, and preparation of extremely large datasets.\n* **Data Quality Framework:** Built automated validation systems resolving **99.99%** of data quality issues prior to model ingestion.",
    },
    {
      q: "Detail Arya's expertise in Agentic AI and MCP",
      id: "agentic_mcp",
      reply:
        "Arya is at the absolute forefront of **Agentic AI** and Anthropic's **Model Context Protocol (MCP)**:\n\n* **Model Context Protocol:** Certified in MCP and Claude 101, designing server/client connectors to securely expose backend tools and filesystem contexts to LLM agents.\n* **Published Tooling:** Developed and published `yobitsugi` on PyPI—an interactive security scanner and LLM remediation pipeline that automates deterministic codebase scans and incremental repair loops.\n* **Orchestration Frameworks:** Implemented multi-agent orchestrations and stateful workflows using LangGraph and Airflow to manage long-running backend decision processes.",
    },
  ];

  const handlePromptClick = (prompt) => {
    if (isTyping || isStreaming) return;

    setCurrentPrompt(prompt.id);

    // Add user message
    const updatedMessages = [...messages, { role: "user", content: prompt.q }];
    setMessages(updatedMessages);
    setIsTyping(true);

    // Simulate RAG chatbot database query response with streaming
    setTimeout(() => {
      setIsTyping(false);
      setIsStreaming(true);

      // Add empty assistant message to stream into
      const streamMessageIdx = updatedMessages.length;
      const finalMessages = [
        ...updatedMessages,
        { role: "assistant", content: "" },
      ];
      setMessages(finalMessages);

      const words = prompt.reply.split(" ");
      let currentWordIdx = 0;
      let streamedText = "";

      const interval = setInterval(() => {
        if (currentWordIdx < words.length) {
          streamedText +=
            (currentWordIdx === 0 ? "" : " ") + words[currentWordIdx];
          setMessages((prev) => {
            const clone = [...prev];
            if (clone[streamMessageIdx]) {
              clone[streamMessageIdx].content = streamedText;
            }
            return clone;
          });
          currentWordIdx++;
        } else {
          clearInterval(interval);
          setIsStreaming(false);
        }
      }, 35); // 35ms per word is extremely smooth & natural
    }, 1000);
  };

  // Helper to render markdown bolding and bullet list items inside chatbot bubbles
  const renderMarkdown = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      let currentLine = line;
      const isListItem =
        currentLine.trim().startsWith("* ") ||
        currentLine.trim().startsWith("- ");
      if (isListItem) {
        currentLine = currentLine.trim().replace(/^[\*\-]\s+/, "");
      }

      // Split by bold regex to extract matches
      const parts = currentLine.split(/\*\*([^*]+)\*\*/g);
      const parsedLine = parts.map((part, partIdx) => {
        if (partIdx % 2 === 1) {
          // Odd elements are wrapped in bold tags with a high-contrast yellow highlighter background
          return (
            <strong
              key={partIdx}
              className="font-extrabold text-slate-950 bg-brainlabs-yellow/45 px-1 py-0.5 rounded-sm mx-0.5 border-b border-brainlabs-yellow/60"
            >
              {part}
            </strong>
          );
        }
        return part;
      });

      if (isListItem) {
        return (
          <li
            key={lineIdx}
            className="ml-5 list-disc text-xs sm:text-sm text-slate-900 font-bold my-1 leading-relaxed"
          >
            {parsedLine}
          </li>
        );
      }

      if (line.trim() === "") {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p
          key={lineIdx}
          className="text-xs sm:text-sm text-slate-900 font-bold my-1 leading-relaxed"
        >
          {parsedLine}
        </p>
      );
    });
  };

  // Get visible indices for the carousel
  const getVisibleProjects = () => {
    const list = [];
    for (let i = 0; i < Math.min(3, projects.length); i++) {
      list.push(projects[(carouselIndex + i) % projects.length]);
    }
    return list;
  };

  return (
    <div className="min-h-screen bg-brainlabs-cream text-slate-900 font-sans flex flex-col relative selection:bg-brainlabs-yellow selection:text-slate-900">
      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b-3 border-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 border-2 border-slate-900 rounded-lg flex items-center justify-center relative shadow-[3px_3px_0px_0px_#ffdd33]">
              <span className="text-white font-extrabold text-xl font-mono">
                A
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brainlabs-blue rounded-full border border-slate-950 animate-pulse" />
            </div>
            <div>
              <h1 className="font-extrabold tracking-tighter text-xl text-slate-900 flex items-center gap-1.5 leading-none">
                ARYAROOP{" "}
                <span className="text-brainlabs-yellow font-light">×</span>{" "}
                MAJUMDER
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-600 font-black font-mono">
                Scientific Engineering
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-black text-sm text-slate-800">
            <a
              href="#about"
              className="hover:text-brainlabs-yellow transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="hover:text-brainlabs-yellow transition-colors"
            >
              Projects
            </a>
            <a
              href="#timeline"
              className="hover:text-brainlabs-yellow transition-colors"
            >
              Milestones
            </a>
            <a
              href="#certifications"
              className="hover:text-brainlabs-yellow transition-colors"
            >
              Certifications
            </a>
            <a
              href="#accolades"
              className="hover:text-brainlabs-yellow transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#chatbot"
              className="hover:text-brainlabs-yellow transition-colors flex items-center gap-1"
            >
              <span className="w-2.5 h-2.5 bg-brainlabs-green rounded-full inline-block animate-ping" />{" "}
              Ask AI
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setShowResumeModal(true)}
              className="bg-white text-slate-900 border-3 border-slate-900 px-5 py-2 font-black text-sm tracking-tight shadow-[3px_3px_0px_0px_#ffdd33] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#ffdd33] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_0px_#ffdd33] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-900" /> Download Resume
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border-3 border-slate-900 p-1.5 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t-3 border-slate-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4 font-black text-base text-slate-700">
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brainlabs-yellow"
                >
                  About
                </a>
                <a
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brainlabs-yellow"
                >
                  Projects
                </a>
                <a
                  href="#timeline"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brainlabs-yellow"
                >
                  Milestones
                </a>
                <a
                  href="#certifications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brainlabs-yellow"
                >
                  Certifications
                </a>
                <a
                  href="#accolades"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brainlabs-yellow"
                >
                  Testimonials
                </a>
                <a
                  href="#chatbot"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brainlabs-yellow flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 bg-brainlabs-green rounded-full inline-block" />{" "}
                  Chat with Cortex AI
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowResumeModal(true);
                  }}
                  className="bg-brainlabs-yellow text-slate-900 border-3 border-slate-900 p-3 text-center font-black flex items-center justify-center gap-2 cursor-pointer w-full"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section
        id="about"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 grid md:grid-cols-12 gap-12 items-center"
      >
        {/* Hero Left Info */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white text-slate-900 border-3 border-slate-900 px-4 py-2 text-xs font-black w-fit uppercase tracking-wider shadow-[3px_3px_0px_0px_#80dbff]">
            <Zap className="w-4 h-4 text-brainlabs-yellow fill-brainlabs-yellow" />
            The most agentic portfolio
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none text-slate-900 uppercase">
            What's your next best move to{" "}
            <span className="text-[#ff5c8d] underline decoration-brainlabs-blue decoration-4 sm:decoration-8">
              maximize
            </span>{" "}
            AI &amp; Engineering?
          </h2>

          <p className="text-lg sm:text-xl font-bold text-slate-700 leading-relaxed max-w-2xl">
            Hi, I'm{" "}
            <strong className="text-slate-900 font-extrabold font-mono">
              @Arya
            </strong>
            . I'm a Data Science Specialist and ML Engineer building
            high-throughput GenAI, RAG tools, and Bayesian statistical engines.
            Built to drive provable results, not just activities.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="#projects"
              className="bg-slate-900 text-white border-3 border-slate-900 px-6 py-3.5 font-black text-base tracking-tight shadow-[4px_4px_0px_0px_#ffdd33] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#ffdd33] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_0px_#ffdd33] transition-all flex items-center gap-2"
            >
              Explore My Works{" "}
              <ChevronRight className="w-5 h-5 text-brainlabs-blue" />
            </a>
            <a
              href="#chatbot"
              className="bg-white text-slate-900 border-3 border-slate-900 px-6 py-3.5 font-black text-base tracking-tight shadow-[4px_4px_0px_0px_#80dbff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#80dbff] active:translate-x-[0px] active:translate-y-[0px] transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5 text-[#ff5c8d]" /> Consult
              Cortex-Arya AI
            </a>
          </div>

          {/* Social Stats Row */}
          <div className="flex items-center gap-6 mt-4 text-xs font-black text-slate-600">
            <a
              href="https://github.com/FiNiX-GaMmA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brainlabs-yellow transition-colors"
            >
              <span className="font-mono bg-white p-1 border-2 border-slate-900 rounded">
                GitHub
              </span>{" "}
              @FiNiX-GaMmA
            </a>
            <a
              href="https://aryaroop04.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brainlabs-yellow transition-colors"
            >
              <span className="font-mono bg-white p-1 border-2 border-slate-900 rounded">
                Medium
              </span>{" "}
              @aryaroop04
            </a>
          </div>
        </div>

        {/* Hero Right Dashboard Panel */}
        <div className="md:col-span-5 relative">
          {/* Main Boxy Dashboard Card */}
          <div className="bg-white border-3 border-slate-900 p-6 rounded-none shadow-[6px_6px_0px_0px_#ffdd33] relative overflow-hidden">
            {/* Red accent dot */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-50 text-red-600 border-2 border-red-200 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />{" "}
              Live Status
            </div>

            {/* Title / Header */}
            <div className="border-b-3 border-slate-900 pb-4 mb-4">
              <h3 className="font-mono font-black text-xs text-[#ff5c8d] uppercase tracking-widest">
                Active System Profile
              </h3>
              <p className="font-black text-2xl tracking-tight text-slate-900">
                CORTEX-ARYA v1.2
              </p>
            </div>

            {/* Profile Metrics */}
            <div className="flex flex-col gap-4 font-black">
              <div className="flex justify-between items-center border-b-2 border-slate-100 pb-2">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Title Level
                </span>
                <span className="text-xs font-black text-slate-900 bg-brainlabs-yellow border-2 border-slate-900 px-2.5 py-0.5 shadow-[1.5px_1.5px_0px_0px_#000]">
                  Specialist, Data Science
                </span>
              </div>

              <div className="flex justify-between items-center border-b-2 border-slate-100 pb-2">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Experience Level
                </span>
                <span className="text-sm font-black text-slate-800 uppercase font-mono">
                  3+ Years (Full-time &amp; Intern)
                </span>
              </div>

              <div className="flex justify-between items-start border-b-2 border-slate-100 pb-2">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider mt-1">
                  Credentials
                </span>
                <div className="flex flex-col gap-1.5 items-end">
                  <span className="text-[11px] font-black text-slate-800 flex items-center gap-1.5 bg-pink-50 px-2.5 py-1 border-2 border-slate-900 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]">
                    <Award className="w-4 h-4 text-[#ff5c8d]" /> Anthropic MCP
                  </span>
                  <span className="text-[11px] font-black text-slate-800 flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 border-2 border-slate-900 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,0.1)]">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />{" "}
                    Amazon ML Summer (Top 200)
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  KPI Utilization
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-100 h-3 border-2 border-slate-900 rounded-full overflow-hidden">
                    <div className="bg-brainlabs-green h-full w-full" />
                  </div>
                  <span className="text-xs font-black font-mono text-slate-800">
                    100% (Delivering)
                  </span>
                </div>
              </div>
            </div>

            {/* Miniature bottom terminal log */}
            <div className="mt-5 bg-slate-950 p-3.5 rounded-md font-mono text-[10px] border-2 border-slate-900 shadow-inner">
              {/* Window Controls */}
              <div className="flex gap-1.5 mb-2 border-b border-slate-800 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-slate-950" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 border border-slate-950" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 border border-slate-950" />
              </div>
              <p className="text-emerald-400 font-black">
                &gt; sys.load_metrics().status
              </p>
              <p className="text-white font-bold pl-2">
                &quot;Operational Excellence: 100% timesheets&quot;
              </p>
              <p className="text-sky-400 font-black mt-1">
                &gt; sys.run_pipeline() : Success (35% speedup)
              </p>
            </div>
          </div>

          {/* Absolute Background Boxy Outlines */}
          <div className="absolute -bottom-3 -right-3 w-full h-full border-3 border-slate-900 -z-10 bg-brainlabs-yellow/20" />
          <div className="absolute -bottom-6 -right-6 w-full h-full border-3 border-slate-900 -z-20 bg-brainlabs-blue/20" />
        </div>
      </section>

      {/* 3. Interactive RAG Chatbot Section */}
      <section
        id="chatbot"
        className="bg-white py-16 md:py-24 border-y-3 border-slate-900 relative overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:32px_24px]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs bg-brainlabs-yellow text-slate-900 border-2 border-slate-900 px-4 py-1.5 font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#80dbff] rounded-md font-mono">
              Verified AI Semantic Agent
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mt-4 text-slate-900">
              Query Cortex-Arya Database
            </h2>
            <p className="text-slate-700 font-bold text-sm sm:text-base mt-2">
              Select a verified vector query below to instantly fetch specific
              technical details, architectures, and client project results.
            </p>
          </div>

          {/* Chat Interface Panel (Light-Themed IDE) */}
          <div className="border-3 border-slate-900 bg-white rounded-none overflow-hidden shadow-[8px_8px_0px_0px_#ffdd33]">
            {/* Terminal Window Header */}
            <div className="bg-slate-50 border-b-3 border-slate-900 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full border border-slate-900" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full border border-slate-900" />
                <div className="w-3 h-3 bg-green-500 rounded-full border border-slate-900" />
                <span className="font-mono text-xs text-slate-700 font-black ml-2">
                  cortex_assistant.py
                </span>
              </div>
              <div className="font-mono text-[10px] text-brainlabs-yellow font-black uppercase tracking-wider">
                Model: Gemini 3.5 + AryaRAG v1
              </div>
            </div>

            {/* Chat Body */}
            <div
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50 font-mono text-xs sm:text-sm border-b-3 border-slate-900"
            >
              <AnimatePresence>
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg border-2 p-4 ${
                        m.role === "user"
                          ? "bg-brainlabs-yellow text-slate-900 border-slate-900 shadow-[3px_3px_0px_0px_#1b1b1b]"
                          : "bg-white text-slate-900 border-slate-900 shadow-[3px_3px_0px_0px_#ffdd33]"
                      }`}
                    >
                      <p
                        className={`font-black text-[9px] uppercase tracking-widest mb-1.5 ${m.role === "user" ? "text-slate-900" : "text-[#ff5c8d] font-black"}`}
                      >
                        {m.role === "user"
                          ? "► Selected Query"
                          : "🤖 Cortex AI"}
                      </p>
                      <div className="space-y-1">
                        {renderMarkdown(m.content)}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border-2 border-slate-900 p-3 rounded-lg shadow-[3px_3px_0px_0px_#ffdd33] flex items-center gap-2.5 text-slate-800 font-mono text-xs font-black">
                      <RefreshCw className="w-4 h-4 animate-spin text-brainlabs-yellow" />
                      <span>RAG matching semantic vectors...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Select Prompt Panel - High contrast light theme */}
            <div className="bg-white p-6">
              <p className="font-mono text-xs uppercase font-black text-slate-800 mb-4 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brainlabs-yellow" />
                  Select Vector Query to Run ({chatPrompts.length} Verified
                  Queries):
                </span>
                <span className="text-[10px] text-slate-400 font-mono normal-case hidden sm:inline-block">
                  Scroll for more ↓
                </span>
              </p>

              {/* Scrollable Container with Neo-Brutalist scrollbars */}
              <div className="max-h-60 overflow-y-auto pr-1.5 border-3 border-slate-900 p-3 bg-slate-50">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {chatPrompts.map((p, i) => (
                    <button
                      key={i}
                      disabled={isTyping || isStreaming}
                      onClick={() => handlePromptClick(p)}
                      className={`bg-white text-left text-xs font-mono text-slate-900 border-2 border-slate-900 p-3.5 transition-all flex items-center justify-between group hover:border-brainlabs-yellow hover:bg-pink-50 hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_0px_#ffdd33] rounded-lg font-black h-full ${
                        isTyping || isStreaming
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]"
                      }`}
                    >
                      <span className="transition-colors pr-2 leading-snug text-slate-900">
                        {p.q}
                      </span>
                      <Play className="w-3.5 h-3.5 text-slate-900 group-hover:text-[#ff5c8d] transition-all shrink-0 fill-slate-900 group-hover:fill-[#ff5c8d]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Scientific Practice Capabilities */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b-3 border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs bg-brainlabs-blue/20 text-slate-800 border-2 border-brainlabs-blue px-4 py-1.5 font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
            Capabilities Matrix
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mt-4 text-slate-900">
            My Engineering Practices
          </h2>
          <p className="text-slate-700 font-bold text-sm sm:text-base mt-2">
            My core competencies aligned directly with high-performance modern
            scientific engineering practices.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white border-3 border-slate-900 p-6 hover:translate-y-[-4px] shadow-[4px_4px_0px_0px_#ffdd33] hover:shadow-[8px_8px_0px_0px_#ffdd33] transition-all flex flex-col justify-between rounded-lg">
            <div>
              <div className="w-12 h-12 bg-pink-50 border-2 border-pink-200 rounded-lg flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                <Search className="w-6 h-6 text-brainlabs-yellow" />
              </div>
              <h3 className="font-extrabold text-lg mb-2.5 text-slate-900 uppercase tracking-tight">
                Semantic AI &amp; SEO
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bold">
                SEO analytics, site experiences, and automated scrapers mapping
                keyword queries against live search results using clustering
                algorithms and custom scrapers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-[10px] text-slate-400">
              ⚡ SearchIQ • Screaming Frog alternative • Halcyon classification
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-3 border-slate-900 p-6 hover:translate-y-[-4px] shadow-[4px_4px_0px_0px_#80dbff] hover:shadow-[8px_8px_0px_0px_#80dbff] transition-all flex flex-col justify-between rounded-lg">
            <div>
              <div className="w-12 h-12 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                <Database className="w-6 h-6 text-brainlabs-blue" />
              </div>
              <h3 className="font-extrabold text-lg mb-2.5 text-slate-900 uppercase tracking-tight">
                Bayesian Statistics
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bold">
                Bayesian Marketing Mix Modeling (MMM) with PyMC v5. Structuring
                multi-layered frameworks with partial pooling, ordinal metrics,
                and stochastic app returns.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-slate-100 font-mono text-[10px] text-slate-500 font-black">
              ⚡ PyMC Modeling • Beall's MMM Fitment • Ordinal Regression
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-3 border-slate-900 p-6 hover:translate-y-[-4px] shadow-[4px_4px_0px_0px_#ffdd33] hover:shadow-[8px_8px_0px_0px_#ffdd33] transition-all flex flex-col justify-between rounded-lg">
            <div>
              <div className="w-12 h-12 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                <Cpu className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-extrabold text-lg mb-2.5 text-slate-900 uppercase tracking-tight">
                GenAI &amp; RAG Agents
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bold">
                LangGraph stateful orchestration, semantic vector retrieval
                (RAG), LEGO tagging automations merging visual computer signals
                with onsite textual data.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-slate-100 font-mono text-[10px] text-slate-500 font-black">
              ⚡ RAG Chatbots • LangGraph Resume • Computer Vision Tagging
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border-3 border-slate-900 p-6 hover:translate-y-[-4px] shadow-[4px_4px_0px_0px_#80dbff] hover:shadow-[8px_8px_0px_0px_#80dbff] transition-all flex flex-col justify-between rounded-lg">
            <div>
              <div className="w-12 h-12 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                <Cloud className="w-6 h-6 text-brainlabs-green" />
              </div>
              <h3 className="font-extrabold text-lg mb-2.5 text-slate-900 uppercase tracking-tight">
                Cloud &amp; Pipelines
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bold">
                Building scalable data transformation engines with
                PySpark/Pandas pipelines, scheduling with Airflow, and running
                containerized workflows across GCP and AWS.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-slate-100 font-mono text-[10px] text-slate-500 font-black">
              ⚡ AWS Advanced ML • AWS Glue / Lambda • Docker Swarms • Airflow
              Pipelines
            </div>
          </div>
        </div>
      </section>

      {/* 5. Seamless Infinite Projects Marquee */}
      <section
        id="projects"
        className="py-20 md:py-28 border-b-3 border-slate-900 bg-brainlabs-cream overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <span className="text-xs bg-white text-brainlabs-yellow border-3 border-slate-900 px-4 py-1.5 font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
            Engineering Artifacts
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mt-4 text-slate-900 font-extrabold">
            My Full History of Projects
          </h2>
          <p className="text-slate-700 font-bold text-sm sm:text-base mt-2 max-w-xl">
            A seamless infinite marquee displaying all projects built over the
            years. Hover over any card to pause and inspect!
          </p>
        </div>

        {/* Seamless Scrolling Marquee Container */}
        <div className="w-full relative py-6 overflow-hidden">
          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brainlabs-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brainlabs-cream to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-left pause-on-hover flex gap-6">
            {[...projects, ...projects].map((proj, idx) => (
              <div
                key={`${proj.id}-${idx}`}
                className="w-[340px] bg-white border-3 border-slate-900 rounded-lg flex flex-col justify-between shadow-[4px_4px_0px_0px_#cbd5e1] hover:shadow-[6px_6px_0px_0px_#ffdd33] hover:border-pink-300 transition-all p-6 relative overflow-hidden h-[340px] shrink-0 boxy-hover"
              >
                {proj.featured && (
                  <div className="absolute top-0 right-0 bg-brainlabs-yellow text-slate-900 border-b-2 border-l-2 border-slate-900 text-[9px] uppercase font-black px-2.5 py-1 tracking-widest shadow-[1px_1px_0px_0px_rgba(0,0,0,0.15)] animate-pulse">
                    Featured
                  </div>
                )}

                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-slate-800 bg-slate-100 px-2 py-0.5 rounded border-2 border-slate-900">
                    {proj.category}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight mt-3">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bold mt-3 overflow-hidden text-ellipsis line-clamp-4">
                    {proj.desc}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.tech.slice(0, 4).map((t, i) => (
                      <span
                        key={i}
                        className="bg-slate-50 text-[9px] font-black px-1.5 py-0.5 rounded border-2 border-slate-900 text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="bg-slate-50 text-[9px] font-black px-1.5 py-0.5 rounded border-2 border-slate-900 text-slate-500">
                        +{proj.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-4 pt-3 border-t-2 border-slate-100">
                    {proj.proprietary ? (
                      <span className="text-xs font-black text-slate-500 flex items-center gap-1.5 bg-slate-100/60 p-1.5 px-2.5 border-2 border-slate-300 rounded font-mono">
                        🔒 Enterprise Proprietary
                      </span>
                    ) : (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-black text-slate-900 hover:text-brainlabs-yellow flex items-center gap-1 hover:underline"
                      >
                        GitHub Repo{" "}
                        <ArrowUpRight className="w-4 h-4 text-slate-900" />
                      </a>
                    )}
                    {proj.pypi && (
                      <a
                        href={proj.pypi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-black text-brainlabs-yellow bg-pink-50 px-2 py-0.5 border-2 border-brainlabs-yellow rounded hover:bg-pink-100 transition-all shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.15)]"
                      >
                        PyPI
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Blog Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-12 bg-white border-3 border-slate-900 p-8 flex flex-col md:flex-row items-center justify-between shadow-[6px_6px_0px_0px_#80dbff] gap-6 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-pink-50 border-2 border-slate-900 rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
                <BookOpen className="w-8 h-8 text-brainlabs-yellow" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-950 uppercase leading-none">
                  Read Arya's Medium Publication
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-bold mt-2">
                  Articles on RAG chatbots, docker-workflows, and deploying
                  cloud models.
                </p>
              </div>
            </div>
            <a
              href="https://aryaroop04.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-slate-900 border-3 border-slate-900 px-6 py-3 font-black text-sm tracking-tight shadow-[3px_3px_0px_0px_#80dbff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#80dbff] active:translate-x-[0px] active:translate-y-[0px] transition-all flex items-center gap-2 w-full md:w-auto justify-center rounded-lg font-black"
            >
              Visit Medium Blog{" "}
              <ExternalLink className="w-4 h-4 text-brainlabs-yellow" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Professional Milestones Timeline Section */}
      <section
        id="timeline"
        className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b-3 border-slate-900"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs bg-pink-50 text-brainlabs-yellow border-2 border-pink-100 px-4 py-1.5 font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
            Professional Timeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mt-4 text-slate-900">
            Career Milestones &amp; History
          </h2>
          <p className="text-slate-700 font-bold text-sm sm:text-base mt-2">
            Chronological log of my 3+ years of professional engineering and
            data science deployments.
          </p>
        </div>

        {/* Timeline List of Cards */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto relative pl-6 border-l-4 border-slate-900 py-2">
          {/* Milestone 1 */}
          <div className="bg-white border-3 border-slate-900 p-6 rounded-lg relative shadow-[4px_4px_0px_0px_#ffdd33]">
            {/* Timeline Circle Bullet */}
            <div className="absolute top-1/2 left-[-16px] transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-brainlabs-yellow border-3 border-slate-900 shadow-[1px_1px_0px_0px_#000]" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-100 pb-3 mb-4 gap-2">
              <div>
                <span className="text-[10px] font-black uppercase bg-brainlabs-yellow text-slate-900 border-2 border-slate-900 px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.15)] font-mono">
                  Full-Time Specialist
                </span>
                <h3 className="font-extrabold text-xl text-slate-900 uppercase mt-2">
                  Data Science Specialist
                </h3>
              </div>
              <span className="font-mono text-xs font-black text-slate-600 bg-slate-100 border border-slate-200 p-1.5 rounded">
                Apr 2025 - Present
              </span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-bold leading-relaxed list-disc pl-4">
              <li>
                Engineered and deployed **SearchIQ** AI SEO suite microservices
                on GCP incorporating **high-dimensional vector mapping** and
                topic clustering.
              </li>
              <li>
                Built and shipped **LEGO multimodal product tagging** automation
                merging onsite web text data with computer vision image
                classification models.
              </li>
              <li>
                Created client-agnostic topical text classification engine for
                **Halcyon project**, accurately mapping diverse query phrases
                dynamically.
              </li>
              <li>
                Delivered core utility microservices: SERP feature analyzers,
                keywords volume mapping, Screaming Frog custom alternative.
              </li>
              <li>
                Coached technical knowledge sharing on Docker swarms, Bayesian
                MMM modeling, and Agentic AI workflows.
              </li>
            </ul>
          </div>

          {/* Milestone 2 */}
          <div className="bg-white border-3 border-slate-900 p-6 rounded-lg relative shadow-[4px_4px_0px_0px_#80dbff]">
            {/* Timeline Circle Bullet */}
            <div className="absolute top-1/2 left-[-16px] transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-brainlabs-blue border-3 border-slate-900 shadow-[1px_1px_0px_0px_#000]" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-100 pb-3 mb-4 gap-2">
              <div>
                <span className="text-[10px] font-black uppercase bg-brainlabs-blue text-slate-900 border-2 border-slate-900 px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.15)] font-mono">
                  Full-Time Associate
                </span>
                <h3 className="font-extrabold text-xl text-slate-900 uppercase mt-2">
                  Associate ML Engineer
                </h3>
                <p className="text-xs text-slate-500 font-black mt-1">
                  Prescience Decision Solutions
                </p>
              </div>
              <span className="font-mono text-xs font-black text-slate-600 bg-slate-100 border border-slate-200 p-1.5 rounded">
                Aug 2024 - Mar 2025
              </span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-bold leading-relaxed list-disc pl-4">
              <li>
                Designed and implemented a modular **Data Transformation
                Engine** built in Python, Pandas, and **PySpark** for highly
                scalable backend computations.
              </li>
              <li>
                Developed and enforced extensive backend data quality
                validations that **resolved 99.99% of identified data
                anomalies** across supported client pipelines.
              </li>
              <li>
                Optimized large-scale PySpark data pipelines, resulting in a
                **35% speed improvement** and a **50% cloud platform cost
                reduction** by strategic DPU allocation.
              </li>
              <li>
                Maintained microservice APIs and automated workflows on AWS
                (Lambda, Glue, S3, EC2) and Azure (Blob Storage, VMs).
              </li>
            </ul>
          </div>

          {/* Milestone 3 */}
          <div className="bg-white border-3 border-slate-900 p-6 rounded-lg relative shadow-[4px_4px_0px_0px_#cbd5e1]">
            {/* Timeline Circle Bullet */}
            <div className="absolute top-1/2 left-[-16px] transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-400 border-3 border-slate-900 shadow-[1px_1px_0px_0px_#000]" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-100 pb-3 mb-4 gap-2">
              <div>
                <span className="text-[10px] font-black uppercase bg-slate-200 text-slate-900 border-2 border-slate-900 px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.15)] font-mono">
                  Engineering Intern
                </span>
                <h3 className="font-extrabold text-xl text-slate-900 uppercase mt-2">
                  Data Science Intern
                </h3>
                <p className="text-xs text-slate-500 font-black mt-1">
                  Prescience Decision Solutions
                </p>
              </div>
              <span className="font-mono text-xs font-black text-slate-600 bg-slate-100 border border-slate-200 p-1.5 rounded">
                Jun 2023 - Jul 2024
              </span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-bold leading-relaxed list-disc pl-4">
              <li>
                Built a comprehensive **Data Quality validation product** using
                Python and Flask API, and optimized code execution speed by 30%.
              </li>
              <li>
                Created a decoupled, automated ML/Data pipeline using
                open-source **Apache Airflow**, reducing third-party
                orchestration SaaS costs and boosting processing speed by 25%.
              </li>
              <li>
                Led the design and deployment of an innovative **Natural
                Language to SQL chatbot** using Llama 3.1, Flan-T5, StarCoder,
                and Streamlit, containerized under Docker for non-technical
                database stakeholders.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6.5 Dedicated Certifications Section - Seamless Infinite Marquee */}
      <section
        id="certifications"
        className="py-20 md:py-28 border-b-3 border-slate-900 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs bg-brainlabs-yellow text-slate-900 border-2 border-slate-900 px-4 py-1.5 font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] rounded-md font-mono">
              Academic Credentials
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mt-4 text-slate-900 font-extrabold">
              Professional Certifications
            </h2>
            <p className="text-slate-700 font-bold text-sm sm:text-base mt-2">
              Verified professional credentials. Hover over any card to pause
              and verify live!
            </p>
          </div>
        </div>

        {/* Seamless Scrolling Marquee Container (Scrolling in opposite direction!) */}
        <div className="w-full relative py-6 overflow-hidden">
          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-right pause-on-hover flex gap-6">
            {[
              {
                title: "Introduction to Model Context Protocol (MCP)",
                issuer: "Anthropic",
                date: "Issued Jun 2026",
                id: "vgh5txmx3dbi",
                link: "https://verify.skilljar.com/c/vgh5txmx3dbi",
                color: "pink",
              },
              {
                title:
                  "Building GenAI Solutions with Best Practices & Design Choices - Technical (Level 300)",
                issuer: "Amazon Web Services (AWS)",
                date: "Issued Mar 2024",
                color: "blue",
              },
              {
                title: "Foundation of Generative AI",
                issuer: "Udacity Nanodegree",
                date: "Program Completion",
                link: "https://www.udacity.com/certificate/e/df88db1a-b7bc-11ef-8b2e-8386e32aaca7",
                color: "yellow",
              },
              {
                title:
                  "Scalable Machine Learning on Big Data using Apache Spark",
                issuer: "IBM",
                date: "Issued Dec 2023",
                id: "TERQUHZM6RVL",
                link: "https://www.coursera.org/account/accomplishments/verify/TERQUHZM6RVL",
                color: "green",
              },
              {
                title: "Databases and SQL for Data Science with Python",
                issuer: "IBM",
                date: "Issued Jul 2023",
                id: "JESRQ532L4MR",
                link: "https://www.coursera.org/account/accomplishments/certificate/JESRQ532L4MR",
                color: "pink",
              },
              {
                title: "Amazon ML Summer School (Top 200 India)",
                issuer: "Amazon India",
                date: "Issued Jul 2022",
                color: "blue",
              },
              {
                title: "Bertelsmann Next Generation Tech Booster Scholarship",
                issuer: "Bertelsmann",
                date: "Credential 2024 - 2025",
                color: "yellow",
              },
              {
                title: "Foundations of Prompt Engineering",
                issuer: "Google",
                date: "Issued Dec 2023",
                color: "green",
              },
              {
                title: "Crash Course on Python",
                issuer: "Google Inc",
                date: "Issued Dec 2021",
                color: "pink",
              },
            ]
              .reduce((arr, val) => [...arr, val, val], [])
              .map((cert, index) => {
                const shadowColor =
                  cert.color === "pink"
                    ? "shadow-[3px_3px_0px_0px_#ffdd33]"
                    : cert.color === "blue"
                      ? "shadow-[3px_3px_0px_0px_#80dbff]"
                      : cert.color === "yellow"
                        ? "shadow-[3px_3px_0px_0px_#fff95f]"
                        : "shadow-[3px_3px_0px_0px_#00FF6A]";
                const shadowHover =
                  cert.color === "pink"
                    ? "hover:shadow-[5px_5px_0px_0px_#ffdd33]"
                    : cert.color === "blue"
                      ? "hover:shadow-[5px_5px_0px_0px_#80dbff]"
                      : cert.color === "yellow"
                        ? "hover:shadow-[5px_5px_0px_0px_#fff95f]"
                        : "hover:shadow-[5px_5px_0px_0px_#00FF6A]";
                return (
                  <div
                    key={index}
                    className={`w-[290px] bg-white border-2 border-slate-900 p-5 rounded-lg flex flex-col justify-between transition-all hover:translate-y-[-2px] shrink-0 boxy-hover ${shadowColor} ${shadowHover}`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-800 bg-slate-100 px-2 py-0.5 border-2 border-slate-900 rounded font-mono">
                          {cert.issuer}
                        </span>
                        <span className="text-[9px] font-mono font-black text-slate-500 shrink-0">
                          {cert.date}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-xs text-slate-900 leading-snug line-clamp-2 uppercase">
                        {cert.title}
                      </h3>
                      {cert.id && (
                        <p className="text-[10px] font-mono text-slate-500 mt-2 font-bold bg-slate-50 p-1 px-1.5 border border-slate-200 rounded w-fit">
                          ID: {cert.id}
                        </p>
                      )}
                    </div>

                    {cert.link && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-black text-slate-900 hover:text-brainlabs-yellow transition-colors hover:underline"
                        >
                          Verify Credential{" "}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* 7. Accolades Section */}
      <section
        id="accolades"
        className="py-20 md:py-28 bg-white border-b-3 border-slate-900 relative overflow-hidden"
      >
        {/* Accent decorations */}
        <div className="absolute top-24 left-10 w-24 h-24 bg-brainlabs-yellow/5 rounded-full blur-2xl" />
        <div className="absolute bottom-24 right-10 w-32 h-32 bg-brainlabs-blue/5 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs bg-blue-50 text-brainlabs-blue border-2 border-blue-200 px-4 py-1.5 font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_#ffdd33]">
              Proven Delivery Value
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase mt-4 text-slate-900">
              Testimonials &amp; Peer Shoutouts
            </h2>
            <p className="text-slate-700 font-bold text-sm sm:text-base mt-2">
              Verbatim feedback logs extracted from peer reviews and shoutouts
              during my engineering development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rawData.feedback_received?.slice(0, 9).map((fb, idx) => {
              const friendlyAuthor = getFriendlyAuthor(fb.from);
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border-2 border-slate-900 p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_#cbd5e1] hover:shadow-[4px_4px_0px_0px_#ffdd33] hover:border-pink-300 transition-all relative rounded-lg"
                >
                  <div className="absolute top-4 right-4">
                    <MessageSquare className="w-5 h-5 text-slate-400" />
                  </div>

                  <div>
                    {/* Feedback category badge */}
                    <span className="inline-block text-[9px] uppercase font-black tracking-wider text-slate-900 bg-brainlabs-yellow border-2 border-slate-900 px-2 py-0.5 rounded-md mb-4">
                      {fb.source || "Public Shoutout"}
                    </span>

                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic mb-6 font-bold">
                      &quot;{fb.text}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {friendlyAuthor.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-black font-mono mt-0.5">
                        {friendlyAuthor.role}
                      </p>
                    </div>
                    {/* Timestamp */}
                    <span className="text-[9px] font-mono text-slate-500 font-black">
                      {new Date(fb.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Call to Action / Footer */}
      <footer className="bg-slate-50 text-slate-700 border-t-3 border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8 border-b-2 border-slate-200 pb-12">
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 border-2 border-slate-900 rounded-lg flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#ffdd33]">
                <span className="text-white font-extrabold text-xl font-mono">
                  A
                </span>
              </div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 tracking-tight uppercase">
                Aryaroop Majumder
              </h3>
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-w-sm font-black">
              Applying the scientific Test and Earn methodology across
              high-throughput machine learning pipelines, GenAI applications,
              and RAG search indexers.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
              Practice Focus
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-black">
              <li>• Semantic AI &amp; SEO</li>
              <li>• Bayesian MMM modeling</li>
              <li>• LangGraph &amp; agentic frameworks</li>
              <li>• Cloud Data Pipelines</li>
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400">
              Engineering Consults &amp; Projects
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-black">
              Reach out directly for architectural consults, pipeline reviews,
              or technical pitches.
            </p>
            <div className="flex flex-col gap-2 font-mono text-xs text-slate-700 bg-white border-2 border-slate-900 p-3 rounded-md font-bold">
              <p>📍 Location: Bengaluru, Karnataka, India</p>
              <p>
                ✉️ Email:{" "}
                <a
                  href="mailto:aryaroop04@gmail.com"
                  className="hover:text-brainlabs-yellow hover:underline"
                >
                  aryaroop04@gmail.com
                </a>
              </p>
              <p>📞 Phone: +91 97848 07414</p>
            </div>
          </div>
        </div>

        {/* Copy / Fine-print */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-bold">
          <p>© 2020-2026 Aryaroop Majumder. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/FiNiX-GaMmA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brainlabs-yellow transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aryaroop-majumder/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brainlabs-yellow transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://aryaroop04.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brainlabs-yellow transition-colors"
            >
              Medium
            </a>
          </div>
        </div>
      </footer>

      {/* Resume Category Download Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResumeModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_#ffdd33] w-full max-w-2xl relative z-10 overflow-hidden rounded-none"
            >
              {/* Modal Header */}
              <div className="bg-slate-50 border-b-4 border-slate-900 px-6 py-4 flex items-center justify-between">
                <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight text-slate-900 flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#ff5c8d] stroke-[3px]" />
                  Select Resume Version
                </h3>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="border-3 border-slate-900 p-1.5 bg-white hover:bg-[#ff5c8d] transition-colors rounded-none cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-900" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4 bg-slate-50">
                <p className="text-slate-700 font-bold text-sm">
                  Arya's expertise spans multiple core AI/ML disciplines. Choose
                  the targeted resume that aligns with your vacancy:
                </p>

                <div className="grid gap-4">
                  {[
                    {
                      category: "GenAI",
                      title: "Generative AI Specialist",
                      desc: "Focuses on building production-grade Generative AI products, multimodal product-tagging, SEO content intelligence automation, and marketing mix modeling (PyMC). Highly specialized in designing custom agentic workflows.",
                      file: "./Majumder_Aryaroop_21062026.pdf",
                      downloadName: "Aryaroop_Majumder_GenAI_Resume.pdf",
                    },
                    {
                      category: "LLM Engineer",
                      title: "Large Language Model Engineer",
                      desc: "Focuses on advanced LLM applications, RAG pipelines, Pinecone/FAISS/Qdrant vector stores, quantized models, and LLM evaluation. Expert in retrieval optimization, chunking, and metadata tagging.",
                      file: "./Aryaroop_Majumder_GenAI_LLM_Engineer_Resume.pdf",
                      downloadName: "Aryaroop_Majumder_LLM_Engineer_Resume.pdf",
                    },
                    {
                      category: "ML Engineer",
                      title: "Machine Learning / Credit Model Engineer",
                      desc: "Focuses on model development, evaluation (AUC/ROC, PSI/stability, back-testing), PySpark ETL, Amazon big data production pipelines (AWS Glue/Lambda/S3), and statistical scoring.",
                      file: "./Aryaroop_Majumder_Credit_Model_Development_Resume.pdf",
                      downloadName: "Aryaroop_Majumder_ML_Engineer_Resume.pdf",
                    },
                    {
                      category: "AI Engineer",
                      title: "AI & GenAI Backend Engineer",
                      desc: "Focuses on AI-powered microservices, FastAPI/Flask REST APIs, Docker containerization, CI/CD, Model Context Protocol (MCP), agent-based components, and cloud architectures (GCP/AWS/Azure).",
                      file: "./Aryaroop_Majumder_GenAI_Backend_AI_Engineer_Resume.pdf",
                      downloadName: "Aryaroop_Majumder_AI_Engineer_Resume.pdf",
                    },
                  ].map((res, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-3 border-slate-900 p-4 shadow-[4px_4px_0px_0px_#1b1b1b] hover:shadow-[6px_6px_0px_0px_#ffdd33] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-brainlabs-yellow text-slate-900 border-2 border-slate-900 px-2.5 py-0.5 font-black uppercase tracking-wider rounded-md font-mono">
                            {res.category}
                          </span>
                          <h4 className="font-black text-slate-900 text-sm sm:text-base">
                            {res.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 font-bold leading-relaxed">
                          {res.desc}
                        </p>
                      </div>

                      <a
                        href={res.file}
                        download={res.downloadName}
                        className="bg-slate-900 text-white font-black text-xs px-4 py-2.5 border-2 border-slate-900 flex items-center justify-center gap-2 hover:bg-brainlabs-yellow hover:text-slate-900 hover:shadow-[2px_2px_0px_0px_#1b1b1b] transition-all shrink-0 uppercase tracking-tight cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 border-t-4 border-slate-900 px-6 py-3 text-right">
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="bg-white border-3 border-slate-900 text-slate-900 px-4 py-1.5 font-black text-xs uppercase tracking-tight shadow-[3px_3px_0px_0px_#1b1b1b] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#ffdd33] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[1px_1px_0px_0px_#1b1b1b] transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
