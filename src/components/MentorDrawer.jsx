import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Zap, ShieldAlert, Award, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function MentorDrawer({ isOpen, onClose, projectState, currentStage }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hi! I'm **HackPilot AI**, your dedicated hackathon mentor. I'll guide you through problem formulation, tech stack architecture, MVP scope, pitch deck creation, and simulated judge Q&A.\n\nHow can I help your team right now?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "🔥 How to impress hackathon judges?",
    "⚡ What makes a 2-minute demo pitch win?",
    "🛠️ Tech architecture checklist for 24 hours",
    "🎯 Help me define our USP / Novelty factor"
  ];

  const generateAIResponse = (prompt) => {
    setIsTyping(true);
    setTimeout(() => {
      let reply = "";
      const lower = prompt.toLowerCase();

      if (lower.includes("impress") || lower.includes("judge")) {
        reply = "💡 **Hackathon Judge Secret Formula (The 4-Vector Rule):**\n\n1. **30-Second Hook:** Start with a real human story or painful metric, NOT 'Hi we are Team X'.\n2. **Live Working Demo:** Never show slide-only pitches unless mandatory. Show actual working UI + API response.\n3. **Clarity of Business/Impact:** Who pays or benefits? Show realistic market adoption.\n4. **Handling Q&A:** Admitting what is simulated vs real earns +10 respect points over fake claims!";
      } else if (lower.includes("demo") || lower.includes("pitch")) {
        reply = "⏱️ **Winning 2-Minute Demo Structure:**\n\n- **0:00 - 0:20**: The Problem Hook (Pain point & metric)\n- **0:20 - 0:50**: Live Demo (Core User Flow - showing the 'Magic Moment')\n- **0:50 - 1:20**: Tech Architecture & Secret Sauce (AI models, fast DB, low latency)\n- **1:20 - 1:45**: Impact & Feasibility (ROI / Adoption)\n- **1:45 - 2:00**: Future Roadmap & Punchy Closing!";
      } else if (lower.includes("tech") || lower.includes("architecture")) {
        reply = `🛠️ **24-Hour Architecture Advice for ${projectState.title || 'your project'}:**\n\n- Keep Frontend snappy with React + Vite\n- Use lightweight serverless functions or FastAPI/Express backend\n- Pre-seed sample data in DB (don't rely on live internet scraping during demo!)\n- Add fallback mocking for third-party APIs in case rate limits hit during judging.`;
      } else if (lower.includes("usp") || lower.includes("novelty")) {
        reply = `🎯 **Formulating USP for ${projectState.title || 'Your Project'}:**\n\nFocus on: **"Why now?"** and **"Why existing solutions fail"**.\n- If competitors are slow or manual → Your USP is Real-time AI Automation.\n- If competitors are generic → Your USP is Domain-specific contextual accuracy.`;
      } else {
        reply = `🤖 **HackPilot Mentor Analysis:**\n\nRegarding "${prompt}": For stage "${currentStage.toUpperCase()}", my top advice is to focus on execution clarity. Ensure your project "${projectState.title || 'Hackathon Idea'}" has a clear value proposition and a working live demo pathway. Let me know if you want me to refine your slide deck or run a judge Q&A rehearsal!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');
    generateAIResponse(currentInput);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '420px',
      maxWidth: '100vw',
      background: 'rgba(10, 15, 30, 0.95)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(139, 92, 246, 0.3)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.7)',
      animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.15))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)'
          }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              HackPilot Mentor AI
              <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>Active</span>
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>Stage: {currentStage}</p>
          </div>
        </div>
        <button className="btn btn-ghost" onClick={onClose} style={{ padding: '6px', borderRadius: '50%' }}>
          <X size={20} />
        </button>
      </div>

      {/* Quick Prompts */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(15, 23, 42, 0.4)',
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputText(qp);
              generateAIResponse(qp);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              background: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              fontSize: '0.78rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.borderColor = '#8b5cf6'}
            onMouseOut={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '88%',
              padding: '12px 16px',
              borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              background: m.sender === 'user'
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                : 'rgba(30, 41, 59, 0.85)',
              border: m.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              fontSize: '0.9rem',
              lineHeight: '1.55',
              whiteSpace: 'pre-wrap',
              boxShadow: m.sender === 'user'
                ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                : '0 4px 15px rgba(0, 0, 0, 0.3)'
            }}>
              {m.text}
            </div>
            <span style={{
              fontSize: '0.7rem',
              color: '#64748b',
              marginTop: '4px',
              paddingLeft: '4px',
              paddingRight: '4px'
            }}>
              {m.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a78bfa', fontSize: '0.85rem' }}>
            <Sparkles size={16} className="animate-spin" />
            HackPilot AI mentor is thinking...
          </div>
        )}
      </div>

      {/* Input Footer */}
      <form onSubmit={handleSend} style={{
        padding: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(15, 23, 42, 0.8)',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          className="input-field"
          placeholder="Ask HackPilot anything..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
