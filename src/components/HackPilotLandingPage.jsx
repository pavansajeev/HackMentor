import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, Cpu, Lightbulb, Kanban, Presentation, 
  UserCheck, Award, Bot, Save, Download, CheckCircle2, ShieldCheck, 
  Flame, UtensilsCrossed, Layers, Server, Code2, Clock, Play, Pause, 
  RotateCcw, ChevronLeft, ChevronRight, Edit3, MessageSquare, RefreshCw, Star, Sliders
} from 'lucide-react';
import MentorDrawer from './MentorDrawer';
import ProblemSelection from './ProblemSelection';
import ArchitectureBlueprint from './ArchitectureBlueprint';
import MvpKanban from './MvpKanban';
import PitchBuilder from './PitchBuilder';
import JudgeSimulator from './JudgeSimulator';
import ReadinessScorecard from './ReadinessScorecard';
import QuickSetupModal from './QuickSetupModal';
import ErrorBoundary from './ErrorBoundary';
import heroImg from '../assets/hero.png';

const DEFAULT_PROJECT = {
  title: "GreenPulse - AI Supply Chain Decarbonizer",
  hackathonName: "TCS Global Innovate Hackathon 2026",
  teamName: "Team HackPilots",
  track: "Sustainability & AI",
  problemStatement: "Enterprise supply chains lack real-time carbon tracking across multi-tier vendors, leading to non-compliance penalties and inefficient transport routing.",
  solution: "An automated IoT + AI analytics dashboard that predicts route carbon footprint in real-time, optimizes cargo load dispatch, and auto-generates audit-ready sustainability reports.",
  novelty: "First-ever multi-tier Scope 3 carbon prediction engine with automated blockchain verification logs.",
  targetAudience: "Logistics Enterprise Operations, Sustainability Compliance Officers",
  techStack: ["React 18", "Node.js / Express", "FastAPI AI Engine", "PostgreSQL", "Google Gemini API"],
  architectureNodes: [
    { id: 'fe', name: 'React + Vite Web App', category: 'Frontend', status: 'ready' },
    { id: 'be', name: 'Node.js REST API Gateway', category: 'Backend', status: 'ready' },
    { id: 'ai', name: 'Gemini 1.5 Carbon Predictor Engine', category: 'AI/ML', status: 'ready' },
    { id: 'db', name: 'PostgreSQL + Prisma ORM', category: 'Database', status: 'ready' }
  ],
  kanbanTasks: [
    { id: '1', title: 'Connect Gemini API for carbon prediction', status: 'done', priority: 'High', phase: 'Core MVP' },
    { id: '2', title: 'Build interactive route map overlay UI', status: 'in-progress', priority: 'High', phase: 'Demo UI' },
    { id: '3', title: 'Setup sample CSV dataset for live demo', status: 'todo', priority: 'Medium', phase: 'Data' },
    { id: '4', title: 'Export PDF Sustainability Audit Report', status: 'todo', priority: 'Low', phase: 'Bonus' }
  ],
  slides: [
    { id: 1, title: 'The Problem', content: 'Enterprise Scope 3 carbon tracking is currently 80% manual, slow, and prone to heavy regulatory penalties.' },
    { id: 2, title: 'Our Solution: GreenPulse', content: 'Real-time AI carbon footprint prediction & automated dispatch optimization for logistics fleets.' },
    { id: 3, title: 'Live Product Demo', content: 'Showing real-time route optimization with live Gemini AI carbon score prediction.' },
    { id: 4, title: 'Technical Architecture', content: 'React frontend + FastAPI microservice powering real-time route optimization model.' },
    { id: 5, title: 'Impact & ROI', content: '30% reduction in fleet emissions, $1.2M saved in fuel efficiency annually for mid-sized fleets.' },
    { id: 6, title: 'Market & Scalability', content: 'Targeting $45B global carbon accounting market across logistics & shipping enterprise sector.' },
    { id: 7, title: 'Team & Future Scope', content: 'Team HackPilots: 2 Full-Stack Engineers, 1 AI/ML Developer. Next: IoT sensor hardware integration.' }
  ],
  elevatorScript: `🚀 "Did you know enterprise fleets waste $1.2M annually on inefficient routes while failing carbon compliance?\n\nMeet GreenPulse — the AI-powered supply chain decarbonizer. GreenPulse uses Google Gemini API to analyze multi-tier transit routes in real-time, predicting carbon output before dispatch and rerouting cargo for minimum emissions.\n\nIn our live demo today, you'll see how GreenPulse cuts carbon footprint by 30% with zero hardware setup. We are ready to revolutionize green logistics!"`,
  judgeScores: {
    techScore: 88,
    businessScore: 92,
    pitchScore: 85,
    qnaFeedback: []
  }
};

export default function HackPilotLandingPage() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeStage, setActiveStage] = useState('problem');
  const [projectState, setProjectState] = useState(() => {
    try {
      const saved = localStorage.getItem('hackpilot_project');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROJECT,
          ...parsed,
          techStack: parsed.techStack || DEFAULT_PROJECT.techStack,
          architectureNodes: parsed.architectureNodes || DEFAULT_PROJECT.architectureNodes,
          kanbanTasks: parsed.kanbanTasks || DEFAULT_PROJECT.kanbanTasks,
          slides: parsed.slides || DEFAULT_PROJECT.slides,
          judgeScores: parsed.judgeScores || DEFAULT_PROJECT.judgeScores
        };
      }
    } catch (err) {
      console.warn("Failed parsing saved project:", err);
    }
    return DEFAULT_PROJECT;
  });
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('hackpilot_project', JSON.stringify(projectState));
  }, [projectState]);

  const scrollToSection = (id, navKey) => {
    setActiveNav(navKey);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleStageNext = (nextStageKey) => {
    setActiveStage(nextStageKey);
    scrollToSection('menu-sec', 'menu');
  };

  const stages = [
    { id: 'problem', label: '1. Problem & Idea', icon: Lightbulb, color: '#F5D62E' },
    { id: 'blueprint', label: '2. Tech Blueprint', icon: Cpu, color: '#06b6d4' },
    { id: 'mvp', label: '3. MVP Kanban', icon: Kanban, color: '#10b981' },
    { id: 'pitch', label: '4. Pitch Deck & Script', icon: Presentation, color: '#8b5cf6' },
    { id: 'judge', label: '5. AI Judge Simulator', icon: UserCheck, color: '#f43f5e' },
    { id: 'scorecard', label: '6. Readiness Scorecard', icon: Award, color: '#3b82f6' }
  ];

  return (
    <div style={{ background: '#070a14', color: '#ffffff', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      
      {/* ── TOP FIXED NAVBAR (Exact Favhiker Business Layout) ── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(7, 10, 20, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '14px 32px'
      }}>
        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero-sec', 'home')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              background: '#F5D62E',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              color: '#000',
              fontSize: '1.2rem',
              boxShadow: '0 4px 15px rgba(245, 214, 46, 0.3)'
            }}>
              ⚡
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontWeight: 900, fontSize: '1.15rem', color: '#fff', lineHeight: 1 }}>HackPilot</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', color: '#F5D62E', marginTop: '2px' }}>AI COPILOT</span>
            </div>
          </div>

          {/* Center Floating Menu Capsule */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(20, 27, 45, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '999px',
            padding: '4px 6px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
          }}>
            {[
              { key: 'home', label: 'Home', secId: 'hero-sec' },
              { key: 'why', label: 'Why HackPilot', secId: 'why-sec' },
              { key: 'works', label: 'How it works', secId: 'works-sec' },
              { key: 'menu', label: 'Menu Command Center', secId: 'menu-sec' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.secId, item.key)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: activeNav === item.key ? 800 : 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeNav === item.key ? '#F5D62E' : 'transparent',
                  color: activeNav === item.key ? '#000000' : '#94a3b8',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsSetupModalOpen(true)}
              style={{
                background: 'rgba(245, 214, 46, 0.15)',
                border: '1px solid rgba(245, 214, 46, 0.4)',
                color: '#F5D62E',
                fontSize: '0.82rem',
                fontWeight: 800,
                padding: '8px 16px',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sliders size={14} /> Quick Setup
            </button>
            <button
              onClick={() => setIsMentorOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#F5D62E',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Bot size={16} /> Mentor AI
            </button>
            <button
              onClick={() => scrollToSection('menu-sec', 'menu')}
              style={{
                background: '#ffffff',
                color: '#000000',
                fontSize: '0.82rem',
                fontWeight: 800,
                padding: '10px 22px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER SECTION ── */}
      <section id="hero-sec" style={{
        position: 'relative',
        paddingTop: '160px',
        paddingBottom: '120px',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.32) saturate(1.2)',
          transform: 'scale(1.05)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #070a14 0%, rgba(7, 10, 20, 0.85) 60%, transparent 100%)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #070a14 0%, transparent 30%, #070a14 100%)'
        }} />

        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          padding: '0 32px',
          position: 'relative',
          zIndex: 10,
          width: '100%',
          textAlign: 'left'
        }}>
          <div style={{ maxWidth: '780px' }}>
            {/* Gold Pill Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(245, 214, 46, 0.12)',
              border: '1px solid rgba(245, 214, 46, 0.4)',
              color: '#F5D62E',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              <Sparkles size={14} color="#F5D62E" />
              FOR HACKATHON TEAMS & BUILDERS • 100% FREE
            </div>

            {/* Giant Title */}
            <h1 style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.08,
              margin: '0 0 24px',
              letterSpacing: '-0.02em'
            }}>
              Build winning projects <br />
              that impress <br />
              <span style={{ fontFamily: 'serif', fontStyle: 'italic', color: '#F5D62E', fontWeight: 400 }}>
                every judge.
              </span>
            </h1>

            {/* Sub-headline */}
            <p style={{
              fontSize: '1.1rem',
              color: '#cbd5e1',
              fontWeight: 400,
              lineHeight: 1.65,
              marginBottom: '32px',
              maxWidth: '620px'
            }}>
              HackPilot AI guides your team through problem selection, tech stack architecture, MVP scoping, 7-slide pitch deck generation, and live AI judge simulation.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsSetupModalOpen(true)}
                style={{
                  background: '#F5D62E',
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  padding: '14px 30px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(245, 214, 46, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>⚡ Input Custom Idea</span>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ArrowRight size={14} color="#000" />
                </div>
              </button>

              <button
                onClick={() => scrollToSection('menu-sec', 'menu')}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  padding: '14px 26px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Command Center
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: WHY HACKPILOT AI ── */}
      <section id="why-sec" style={{
        padding: '90px 32px',
        background: '#0a0e1c',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{ maxWidth: '1350px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '60px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', color: '#F5D62E', textTransform: 'uppercase' }}>
              WHY HACKPILOT AI
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '8px', color: '#ffffff' }}>
              Everything Your Team Needs to Win in 24–48 Hours
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', textAlign: 'left' }}>
            <div style={{
              background: '#11172a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '32px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(245, 214, 46, 0.12)',
                border: '1px solid rgba(245, 214, 46, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5D62E',
                marginBottom: '24px'
              }}>
                <Lightbulb size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 12px', color: '#ffffff' }}>
                Validated Problem Thesis
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Generate high-impact problem statements with built-in novelty, feasibility, and judge appeal scores.
              </p>
            </div>

            <div style={{
              background: '#11172a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '32px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(245, 214, 46, 0.12)',
                border: '1px solid rgba(245, 214, 46, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5D62E',
                marginBottom: '24px'
              }}>
                <Cpu size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 12px', color: '#ffffff' }}>
                System Architecture Blueprint
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Map out your tech stack & execution pipeline with pre-built timebox milestones and starter code snippets.
              </p>
            </div>

            <div style={{
              background: '#11172a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '32px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(245, 214, 46, 0.12)',
                border: '1px solid rgba(245, 214, 46, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5D62E',
                marginBottom: '24px'
              }}>
                <UserCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 12px', color: '#ffffff' }}>
                AI Judge Rehearsal Round
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Rehearse with 3 distinct AI judge personas (Tech Architect, VC, Product Lead) before presenting on stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: HOW IT WORKS ── */}
      <section id="works-sec" style={{ padding: '90px 32px', background: '#070a14' }}>
        <div style={{ maxWidth: '1350px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '60px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', color: '#F5D62E', textTransform: 'uppercase' }}>
              6-STAGE WORKFLOW
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '8px', color: '#ffffff' }}>
              From Idea Selection to Winning Demo Pitch
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', textAlign: 'left' }}>
            <div style={{ background: '#0f1424', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'rgba(245, 214, 46, 0.3)', display: 'block', marginBottom: '12px' }}>01</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>Stage 1–2: Ideate & Blueprint</h4>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Refine problem thesis, validate novelty, and design system architecture.
              </p>
            </div>

            <div style={{ background: '#0f1424', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'rgba(245, 214, 46, 0.3)', display: 'block', marginBottom: '12px' }}>02</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>Stage 3–4: MVP Kanban & Pitch</h4>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Focus on demo-first features, generate 7-slide pitch deck & 90s teleprompter script.
              </p>
            </div>

            <div style={{ background: '#0f1424', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'rgba(245, 214, 46, 0.3)', display: 'block', marginBottom: '12px' }}>03</span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>Stage 5–6: AI Judge & Export</h4>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Practice Q&A defense, get readiness score, and export full Markdown package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE MENU COMMAND CENTER ── */}
      <section id="menu-sec" style={{
        padding: '90px 32px',
        background: '#090d1a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1350px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', color: '#F5D62E', textTransform: 'uppercase' }}>
              MENU COMMAND CENTER
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '8px', color: '#ffffff' }}>
              Select Your Hackathon Stage
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '8px' }}>
              Click any menu tab below to work on that specific stage of your hackathon project.
            </p>
          </div>

          {/* Menu Stage Switcher Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px'
          }}>
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '999px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 800 : 600,
                    cursor: 'pointer',
                    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                    background: isActive ? '#F5D62E' : '#121727',
                    color: isActive ? '#000000' : '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isActive ? '0 8px 25px rgba(245, 214, 46, 0.3)' : 'none',
                    transform: isActive ? 'scale(1.04)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} color={isActive ? '#000' : stage.color} />
                  {stage.label}
                </button>
              );
            })}
          </div>

          {/* Active Stage View Container */}
          <ErrorBoundary key={activeStage}>
            <div style={{
              background: '#0b0f1d',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '36px',
              textAlign: 'left',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
            }}>
              {activeStage === 'problem' && (
                <ProblemSelection projectState={projectState} setProjectState={setProjectState} onNext={() => handleStageNext('blueprint')} />
              )}
              {activeStage === 'blueprint' && (
                <ArchitectureBlueprint projectState={projectState} setProjectState={setProjectState} onNext={() => handleStageNext('mvp')} />
              )}
              {activeStage === 'mvp' && (
                <MvpKanban projectState={projectState} setProjectState={setProjectState} onNext={() => handleStageNext('pitch')} />
              )}
              {activeStage === 'pitch' && (
                <PitchBuilder projectState={projectState} setProjectState={setProjectState} onNext={() => handleStageNext('judge')} />
              )}
              {activeStage === 'judge' && (
                <JudgeSimulator projectState={projectState} setProjectState={setProjectState} onNext={() => handleStageNext('scorecard')} />
              )}
              {activeStage === 'scorecard' && (
                <ReadinessScorecard projectState={projectState} setProjectState={setProjectState} onSelectTab={(tab) => handleStageNext(tab)} />
              )}
            </div>
          </ErrorBoundary>
        </div>
      </section>

      {/* Global AI Mentor Drawer */}
      <MentorDrawer
        isOpen={isMentorOpen}
        onClose={() => setIsMentorOpen(false)}
        projectState={projectState}
        currentStage={activeStage}
      />

      {/* Quick Custom Setup Modal */}
      <QuickSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        projectState={projectState}
        setProjectState={setProjectState}
        onGenerated={() => scrollToSection('menu-sec', 'menu')}
      />

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#04060c',
        padding: '30px 32px',
        fontSize: '0.82rem',
        color: '#64748b'
      }}>
        <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', background: '#F5D62E', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: '900', fontSize: '0.75rem' }}>⚡</div>
            <strong style={{ color: '#fff' }}>HackPilot AI</strong> — Empowering Hackathon Champions Worldwide.
          </div>
          <div>© 2026 HackPilot AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
