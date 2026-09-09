import type { DomainCategory, StageInfo } from '../types/mentor';

export const STAGES_INFO: StageInfo[] = [
  {
    id: 1,
    title: 'Problem Selection',
    subtitle: 'Identify & Define',
    iconName: 'Target',
    description: 'Select your interest area, define target users, existing alternatives, and pin down the core problem.'
  },
  {
    id: 2,
    title: 'Problem Reasoning',
    subtitle: 'Validate & Analyze',
    iconName: 'BrainCircuit',
    description: 'Validate urgency, root cause, expected impact, and construct your Unique Value Proposition (UVP).'
  },
  {
    id: 3,
    title: 'Solution Design',
    subtitle: 'Architect & Stack',
    iconName: 'Layers',
    description: 'Map system architecture, select optimal tech stack, design DB schema, APIs, and user flow.'
  },
  {
    id: 4,
    title: 'Feasibility & MVP',
    subtitle: 'Scope & De-risk',
    iconName: 'ShieldAlert',
    description: 'Scope essential vs optional features for hackathon time limits, build MVP checklist & risk matrix.'
  },
  {
    id: 5,
    title: 'Pitch & Defense',
    subtitle: 'Sell & Defend',
    iconName: 'Award',
    description: 'Prepare a winning 3-5 min pitch, 30-sec elevator pitch, judge Q&A defense, and team roadmap.'
  }
];

export const DOMAINS: { name: DomainCategory; description: string; badgeColor: string; icon: string }[] = [
  { name: 'Healthcare', description: 'Patient care, remote diagnosis, mental wellness, medical workflow', badgeColor: '#ef4444', icon: 'HeartPulse' },
  { name: 'Education', description: 'Personalized learning, accessibility, skill matching, smart tutoring', badgeColor: '#3b82f6', icon: 'GraduationCap' },
  { name: 'Agriculture', description: 'Crop yield prediction, smart irrigation, farmer marketplaces, soil AI', badgeColor: '#22c55e', icon: 'Sprout' },
  { name: 'Finance', description: 'Fintech, fraud detection, micro-investing, crypto/DeFi, financial literacy', badgeColor: '#eab308', icon: 'Coins' },
  { name: 'Environment', description: 'Carbon tracking, waste management, renewable energy, climate alert', badgeColor: '#10b981', icon: 'Leaf' },
  { name: 'AI', description: 'Generative AI tools, autonomous agents, multimodal assistants, RAG applications', badgeColor: '#a855f7', icon: 'Cpu' },
  { name: 'Cybersecurity', description: 'Phishing defense, vulnerability scanner, privacy preservation, zero-trust', badgeColor: '#f97316', icon: 'ShieldCheck' },
  { name: 'Others', description: 'Smart cities, robotics, gaming, logistics, open innovation', badgeColor: '#06b6d4', icon: 'Compass' }
];

export const TECH_OPTIONS = {
  backend: [
    { name: 'Node.js (Express)', pros: 'Fast setup, unified JS/TS codebase, huge ecosystem', bestFor: 'Real-time APIs & rapid MVP prototyping' },
    { name: 'FastAPI (Python)', pros: 'Automatic OpenAPI docs, asynchronous support, high performance for AI pipelines', bestFor: 'Python AI integration & clean data validation' },
    { name: 'Python Flask', pros: 'Lightweight, easy to plug into AI models, minimal boilerplate', bestFor: 'Quick microservices & simple AI wrappers' },
    { name: 'Django', pros: 'Built-in admin panel, battery-included auth, robust ORM', bestFor: 'Data-heavy applications requiring swift admin UI' }
  ],
  frontend: [
    { name: 'React (Vite)', pros: 'High flexibility, rich component UI libraries, quick state management', bestFor: 'Web dashboards & responsive web apps' },
    { name: 'HTML/CSS/JS (Vanilla)', pros: 'Zero build step setup, lightning fast load, maximum browser control', bestFor: 'Single-page lightweight pitch demos' },
    { name: 'Flutter', pros: 'Cross-platform native compilation (iOS, Android, Web) from single codebase', bestFor: 'Sleek mobile applications' },
    { name: 'React Native', pros: 'Leverages React paradigm, rich native module access', bestFor: 'Mobile apps requiring web code sharing' }
  ],
  database: [
    { name: 'MongoDB', pros: 'Flexible JSON schema, fast iterations, easy Atlas cloud hosting', bestFor: 'Unstructured document storage & fast schema updates' },
    { name: 'PostgreSQL', pros: 'ACID compliance, powerful relational queries, vector search support (pgvector)', bestFor: 'Structured relational data & embeddings' },
    { name: 'Firebase Firestore', pros: 'Real-time listener synchronization, instant cloud deployment, zero backend config', bestFor: 'Instant MVP backend with live UI sync' }
  ],
  aiModel: [
    { name: 'Gemini API', pros: 'Multimodal (Text, Image, Video, Audio), fast response, generous rate limits', bestFor: 'Reasoning, vision, & agentic workflows' },
    { name: 'OpenAI API (GPT-4o)', pros: 'High instruction compliance, structured JSON mode, reliable tool calling', bestFor: 'Complex reasoning & function execution' },
    { name: 'Hugging Face Inference', pros: 'Access to 100k+ open source models (Llama, Whisper, Stable Diffusion)', bestFor: 'Specialized domain models & audio/image pipelines' },
    { name: 'Local LLM (Ollama/LM Studio)', pros: '100% offline, privacy focused, zero API cost', bestFor: 'Offline hackathons & sensitive data demo' }
  ],
  cloud: [
    { name: 'Vercel', pros: 'One-click GitHub push deployment, automatic HTTPS, preview builds', bestFor: 'Frontend & Next.js/React hosting' },
    { name: 'Render', pros: 'Free tier web services, managed Postgres/Redis, container support', bestFor: 'Fullstack Node/Python REST APIs' },
    { name: 'Railway', pros: 'Instant Docker container deployments, environment variables sync', bestFor: 'Multi-service microservice backends' },
    { name: 'Firebase Hosting', pros: 'Global CDN distribution, easy CLI deploy', bestFor: 'Static apps with Firebase backend' }
  ],
  auth: [
    { name: 'Firebase Auth', pros: 'Supports Google, Email, Phone out-of-the-box with pre-built UI components', bestFor: 'Instant zero-effort user sign-in' },
    { name: 'Google OAuth 2.0', pros: 'Frictionless one-tap user onboarding', bestFor: 'Standard user sign-in' },
    { name: 'Email/Password (Custom JWT)', pros: 'Complete auth control without third-party dependencies', bestFor: 'Custom database auth integration' }
  ]
};

export const JUDGE_QUESTIONS_BANK = [
  {
    question: "Why this problem?",
    guidePrompt: "Explain the human impact, urgency, and why existing tools fail to solve it.",
    defaultPoints: ["Identified through real user pain points", "Saves significant time/money", "Growing urgency in the market"]
  },
  {
    question: "Why your approach?",
    guidePrompt: "Detail your unique angle, architecture efficiency, and user-centered design.",
    defaultPoints: ["Lower barrier to entry for end users", "Simpler workflow than incumbents", "Leverages modern AI automation"]
  },
  {
    question: "Why this technology stack?",
    guidePrompt: "Justify stack choices based on speed, developer familiarity, reliability, and hackathon constraints.",
    defaultPoints: ["Chosen for fast development velocity", "Modular & easy to maintain", "Scalable cloud infrastructure"]
  },
  {
    question: "What makes your project unique?",
    guidePrompt: "Highlight your Unique Value Proposition (UVP) and competitive moat.",
    defaultPoints: ["Novel combination of AI + seamless UI", "Real-time user feedback loop", "First-of-its-kind workflow integration"]
  },
  {
    question: "What if you had more time (Future Scope)?",
    guidePrompt: "Demonstrate vision beyond the 24-48h hackathon prototype.",
    defaultPoints: ["Integration with enterprise APIs", "Native mobile app deployment", "Fine-tuned custom ML models on user data"]
  }
];

export const STANDARD_TEAM_ROLES = [
  {
    title: "Backend & Systems Lead",
    keyDeliverables: ["REST/GraphQL API endpoints", "Database schema & ORM integration", "Third-party AI service connectors"],
    recommendedSkills: ["Node.js / FastAPI", "PostgreSQL / MongoDB", "API design & env management"]
  },
  {
    title: "Frontend & UI Developer",
    keyDeliverables: ["Responsive glassmorphic UI layout", "Interactive forms & state flow", "Live data presentation & dashboards"],
    recommendedSkills: ["React / HTML / Tailwind / CSS", "State management", "UX animation"]
  },
  {
    title: "AI Integration & Data Specialist",
    keyDeliverables: ["Prompt engineering & structured JSON outputs", "Vector embeddings / RAG pipeline", "Model latency & token cost optimization"],
    recommendedSkills: ["Gemini / OpenAI API", "LangChain / LlamaIndex", "Python data processing"]
  },
  {
    title: "UI/UX & Product Designer",
    keyDeliverables: ["User journey flow maps", "Pitch deck visual slides", "High-fidelity clickable demo mockups"],
    recommendedSkills: ["Figma / Penpot", "Visual hierarchy", "Micro-interaction design"]
  },
  {
    title: "Presenter & Project Pitch Lead",
    keyDeliverables: ["3-5 minute persuasive pitch deck script", "Live demo narrative & backup recording", "Judge Q&A defense prep"],
    recommendedSkills: ["Storytelling", "Public speaking", "Problem validation framing"]
  }
];
