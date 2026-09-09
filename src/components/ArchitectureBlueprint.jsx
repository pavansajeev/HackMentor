import React, { useState } from 'react';
import { Cpu, Server, Database, Sparkles, Layers, CheckCircle2, Plus, Trash2, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';

const STACK_CATEGORIES = [
  { name: 'Frontend', options: ['React 18 + Vite', 'Next.js 14', 'Vue.js 3', 'Tailwind CSS', 'React Native'] },
  { name: 'Backend', options: ['Node.js / Express', 'Python FastAPI', 'Django REST', 'Go Fiber', 'Serverless Functions'] },
  { name: 'AI / ML', options: ['Google Gemini API', 'OpenAI GPT-4o', 'HuggingFace Transformers', 'LangChain', 'Pinecone Vector DB'] },
  { name: 'Database', options: ['PostgreSQL + Prisma', 'MongoDB', 'Supabase', 'Redis Cache', 'SQLite'] },
  { name: 'Deployment', options: ['Vercel', 'Render', 'Docker + AWS', 'Netlify', 'Localhost Demo Host'] }
];

export default function ArchitectureBlueprint({ projectState, setProjectState, onNext }) {
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeCat, setNewNodeCat] = useState('Backend');
  const [customTechInput, setCustomTechInput] = useState('');

  const handleToggleTech = (tech) => {
    setProjectState(prev => {
      const exists = prev.techStack.includes(tech);
      const updated = exists ? prev.techStack.filter(t => t !== tech) : [...prev.techStack, tech];
      return { ...prev, techStack: updated };
    });
  };

  const handleAddCustomTech = () => {
    if (!customTechInput.trim()) return;
    const tech = customTechInput.trim();
    if (!projectState.techStack.includes(tech)) {
      setProjectState(prev => ({
        ...prev,
        techStack: [...prev.techStack, tech]
      }));
    }
    setCustomTechInput('');
  };

  const handleAddNode = () => {
    if (!newNodeName.trim()) return;
    const node = {
      id: Date.now().toString(),
      name: newNodeName,
      category: newNodeCat,
      status: 'ready'
    };
    setProjectState(prev => ({
      ...prev,
      architectureNodes: [...prev.architectureNodes, node]
    }));
    setNewNodeName('');
  };

  const handleRemoveNode = (id) => {
    setProjectState(prev => ({
      ...prev,
      architectureNodes: prev.architectureNodes.filter(n => n.id !== id)
    }));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Banner */}
      <div className="glass-card glow-cyan" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'rgba(6, 182, 212, 0.2)',
            color: '#22d3ee',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}>
            <Cpu size={28} />
          </div>
          <div>
            <span className="badge badge-cyan">Stage 2 of 6</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>Tech Stack & System Architecture Blueprint</h2>
          </div>
        </div>
        <p style={{ color: '#94a3b8', maxWidth: '750px', fontSize: '1rem', lineHeight: '1.6' }}>
          Define your hackathon tech stack and map out the data pipeline. Judges scrutinize how clean, scalable, and resilient your architecture is under a 24h-48h deadline.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Left Column: Tech Stack Selector */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={20} color="#38bdf8" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Select Project Tech Stack</h3>
          </div>

          {/* Add Custom Tech Tag */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Add custom tech (e.g. Anthropic API)"
              value={customTechInput}
              onChange={(e) => setCustomTechInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomTech()}
              style={{ flex: 1 }}
            />
            <button onClick={handleAddCustomTech} className="btn btn-cyan" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
              <Plus size={16} /> Add Tech
            </button>
          </div>

          {/* Selected Custom Stack Tags */}
          {projectState.techStack.length > 0 && (
            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>Active Selected Stack:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                {projectState.techStack.map((tech) => (
                  <span key={tech} style={{ padding: '4px 10px', borderRadius: '999px', background: '#06b6d4', color: '#000', fontWeight: 700, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {tech}
                    <span onClick={() => handleToggleTech(tech)} style={{ cursor: 'pointer', opacity: 0.8 }}>✕</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {STACK_CATEGORIES.map((cat, idx) => (
            <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#a78bfa', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {cat.name}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.options.map((opt) => {
                  const isSelected = projectState.techStack.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => handleToggleTech(opt)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '999px',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                        color: isSelected ? '#38bdf8' : '#94a3b8',
                        border: isSelected ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isSelected ? '✓ ' : '+ '}{opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Visual Architecture Diagram & Pipeline Nodes */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Server size={20} color="#34d399" />
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>System Pipeline Visualizer</h3>
            </div>
            <span className="badge badge-emerald">{projectState.architectureNodes.length} Active Nodes</span>
          </div>

          {/* Interactive Flow Diagram */}
          <div style={{
            background: '#080c18',
            borderRadius: '14px',
            padding: '20px',
            border: '1px dashed rgba(6, 182, 212, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Data & Execution Flow
            </span>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              {projectState.architectureNodes.map((node, i) => (
                <React.Fragment key={node.id}>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc' }}>{node.name}</div>
                      <span className="badge badge-purple" style={{ fontSize: '0.65rem', marginTop: '4px' }}>{node.category}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveNode(node.id)}
                      style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '2px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {i < projectState.architectureNodes.length - 1 && (
                    <div style={{ color: '#06b6d4', display: 'flex', alignItems: 'center' }}>
                      <ArrowRight size={18} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Add New Node Form */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Redis Session Cache"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              style={{ flex: 1 }}
            />
            <select
              className="select-field"
              value={newNodeCat}
              onChange={(e) => setNewNodeCat(e.target.value)}
              style={{ width: '130px' }}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Database">Database</option>
              <option value="Cloud">Cloud</option>
            </select>
            <button onClick={handleAddNode} className="btn btn-secondary">
              <Plus size={18} />
            </button>
          </div>

          {/* 24-Hour Milestone Timebox Plan */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock size={18} color="#f59e0b" />
              <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Recommended 24-Hour Timebox Breakdown</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Hours 0–4: Repository setup & API key integration</span>
                <span className="badge badge-emerald">Done</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Hours 4–12: Core AI Engine & Database logic</span>
                <span className="badge badge-cyan">In Progress</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Hours 12–18: Demo UI & Fallback sample dataset</span>
                <span className="badge badge-amber">Scheduled</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Hours 18–24: Pitch deck, teleprompter script & demo testing</span>
                <span className="badge badge-purple">Pending</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <button
              onClick={onNext}
              className="btn btn-emerald"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              Lock Tech Stack & Proceed to MVP Kanban
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
