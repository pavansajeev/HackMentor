import React, { useState } from 'react';
import { Lightbulb, Sparkles, Target, Zap, Award, CheckCircle, ShieldAlert, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { generateProjectFromPrompt } from '../lib/aiGenerator';

const TRACK_PRESETS = [
  { id: 'sustainability', name: 'Sustainability & Green Tech', icon: '🌿', color: '#10b981' },
  { id: 'genai', name: 'Generative AI & Enterprise LLMs', icon: '🤖', color: '#8b5cf6' },
  { id: 'fintech', name: 'FinTech & DeFi Infrastructure', icon: '💳', color: '#06b6d4' },
  { id: 'health', name: 'Healthcare & MedTech Diagnostics', icon: '🩺', color: '#f43f5e' },
  { id: 'supplychain', name: 'Smart Mobility & Logistics', icon: '📦', color: '#f59e0b' },
  { id: 'cyber', name: 'Cybersecurity & Fraud Prevention', icon: '🛡️', color: '#6366f1' }
];

const SAMPLE_IDEAS = {
  sustainability: [
    {
      title: "GreenPulse - AI Carbon Decarbonizer",
      problem: "Enterprise supply chains lack real-time carbon tracking across multi-tier vendors, leading to non-compliance penalties.",
      solution: "IoT + AI analytics dashboard predicting route carbon footprint in real-time and auto-generating audit-ready reports.",
      novelty: "Scope 3 real-time carbon forecasting model using multimodal transport telemetry."
    },
    {
      title: "EcoLoop - E-Waste Circular Marketplace",
      problem: "Corporations discard millions of dollars in refurbishable tech hardware without easy recycling pipelines.",
      solution: "AI hardware scanner that assesses component resale value instantly and connects with certified e-waste buyers.",
      novelty: "Computer-vision automated hardware health & valuation scoring."
    }
  ],
  genai: [
    {
      title: "DocuSense - Autonomous RFP & Contract AI",
      problem: "B2B sales teams spend 15+ hours manually filling out compliance RFPs and security questionnaires.",
      solution: "AI agent that auto-synthesizes past proposals, verifies compliance rules, and generates instant accurate draft RFPs.",
      novelty: "Multi-agent cross-verification system preventing hallucinated compliance claims."
    }
  ],
  fintech: [
    {
      title: "FraudShield AI - Synthetic Identity Detector",
      problem: "Neobanks lose billions annually to AI-generated synthetic ID fraud during digital KYC onboarding.",
      solution: "Biometric behavior analysis combined with graph neural networks to flag synthetic identity clusters in real-time.",
      novelty: "Zero-knowledge graph verification for privacy-first fraud scoring."
    }
  ]
};

export default function ProblemSelection({ projectState, setProjectState, onNext }) {
  const [selectedTrack, setSelectedTrack] = useState('sustainability');
  const [customIdeaInput, setCustomIdeaInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleApplyPresetIdea = (idea) => {
    const trackObj = TRACK_PRESETS.find(t => t.id === selectedTrack);
    const trackName = trackObj ? trackObj.name : 'Generative AI';
    const generated = generateProjectFromPrompt(
      idea.title,
      trackName,
      projectState.hackathonName || 'Global Hackathon 2026',
      projectState.teamName || 'Team HackPilots'
    );
    
    setProjectState(prev => ({
      ...prev,
      ...generated,
      problemStatement: idea.problem || generated.problemStatement,
      solution: idea.solution || generated.solution,
      novelty: idea.novelty || generated.novelty
    }));
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const topic = customIdeaInput.trim() || 'AI Smart Assistant';
      const trackObj = TRACK_PRESETS.find(t => t.id === selectedTrack);
      const trackName = trackObj ? trackObj.name : 'Generative AI';
      
      const generatedSuite = generateProjectFromPrompt(
        topic,
        trackName,
        projectState.hackathonName || 'Global Hackathon 2026',
        projectState.teamName || 'Team HackPilots'
      );

      setProjectState(prev => ({
        ...prev,
        ...generatedSuite
      }));
      
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Banner */}
      <div className="glass-card glow-purple" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'rgba(139, 92, 246, 0.2)',
            color: '#a78bfa',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <Lightbulb size={28} />
          </div>
          <div>
            <span className="badge badge-purple">Stage 1 of 6</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>Problem Selection & Idea Refinement</h2>
          </div>
        </div>
        <p style={{ color: '#94a3b8', maxWidth: '750px', fontSize: '1rem', lineHeight: '1.6' }}>
          Winning hackathons starts with picking a problem statement that has high judge appeal, clear ROI, and a realistic technical scope for 24–48 hours. Let HackPilot AI help you brainstorm or fine-tune your core thesis.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Left Column: Track Selection & AI Generator */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target size={20} color="#06b6d4" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Select Hackathon Track</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {TRACK_PRESETS.map((tr) => (
              <button
                key={tr.id}
                onClick={() => setSelectedTrack(tr.id)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: selectedTrack === tr.id ? 'rgba(139, 92, 246, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  border: selectedTrack === tr.id ? `1px solid ${tr.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  color: selectedTrack === tr.id ? '#f8fafc' : '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{tr.icon}</span>
                <span style={{ flex: 1 }}>{tr.name}</span>
              </button>
            ))}
          </div>

          <div style={{ marginTop: '10px' }}>
            <label style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Or Type Your Custom Idea / Topic:
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. AI drone for precision farming disease detection"
              value={customIdeaInput}
              onChange={(e) => setCustomIdeaInput(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="btn btn-primary glow-purple"
            style={{ width: '100%', padding: '14px', marginTop: '10px' }}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Synthesizing Winning Idea...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate AI Idea Proposal
              </>
            )}
          </button>

          {/* AI Idea Preset Suggestions */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Suggested Hackathon Ideas ({TRACK_PRESETS.find(t => t.id === selectedTrack)?.name})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(SAMPLE_IDEAS[selectedTrack] || SAMPLE_IDEAS.sustainability).map((idea, idx) => (
                <div
                  key={idx}
                  onClick={() => handleApplyPresetIdea(idea)}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#06b6d4'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#f8fafc' }}>{idea.title}</strong>
                    <span className="badge badge-emerald">USP {idea.noveltyScore}%</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.4' }}>
                    {idea.problem.substring(0, 85)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Refine Current Problem Statement */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={20} color="#a78bfa" />
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Current Project Canvas</h3>
            </div>
            <span className="badge badge-cyan">Interactive Editor</span>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Project Title
            </label>
            <input
              type="text"
              className="input-field"
              value={projectState.title}
              onChange={(e) => setProjectState({ ...projectState, title: e.target.value })}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Problem Statement (What pain point are you solving?)
            </label>
            <textarea
              className="textarea-field"
              rows={3}
              value={projectState.problemStatement}
              onChange={(e) => setProjectState({ ...projectState, problemStatement: e.target.value })}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Solution & Secret Sauce (How does it work?)
            </label>
            <textarea
              className="textarea-field"
              rows={3}
              value={projectState.solution}
              onChange={(e) => setProjectState({ ...projectState, solution: e.target.value })}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Novelty & Key Differentiator (Why will judges pick this?)
            </label>
            <input
              type="text"
              className="input-field"
              value={projectState.novelty}
              onChange={(e) => setProjectState({ ...projectState, novelty: e.target.value })}
            />
          </div>

          {/* AI Sanity Check Scores */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            textAlign: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Novelty Score</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#34d399', marginTop: '2px' }}>92 / 100</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>24h Feasibility</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>88 / 100</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Judge Impact</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#a78bfa', marginTop: '2px' }}>95 / 100</div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <button
              onClick={onNext}
              className="btn btn-emerald"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              Confirm Idea & Proceed to Tech Blueprint
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
