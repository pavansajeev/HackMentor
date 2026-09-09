import React, { useState } from 'react';
import { Sparkles, X, RotateCcw, Rocket, CheckCircle2 } from 'lucide-react';
import { generateProjectFromPrompt } from '../lib/aiGenerator';

export default function QuickSetupModal({ isOpen, onClose, projectState, setProjectState, onGenerated }) {
  const [topicPrompt, setTopicPrompt] = useState('');
  const [hackathonName, setHackathonName] = useState(projectState.hackathonName || 'TCS Global Innovate Hackathon 2026');
  const [teamName, setTeamName] = useState(projectState.teamName || 'Team HackPilots');
  const [selectedTrack, setSelectedTrack] = useState(projectState.track || 'Generative AI & Enterprise LLMs');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  if (!isOpen) return null;

  const handleSynthesize = (e) => {
    e.preventDefault();
    setIsSynthesizing(true);

    setTimeout(() => {
      const generatedSuite = generateProjectFromPrompt(
        topicPrompt || projectState.title || 'AI Smart Assistant',
        selectedTrack,
        hackathonName,
        teamName
      );

      setProjectState(prev => ({
        ...prev,
        ...generatedSuite
      }));

      setIsSynthesizing(false);
      if (onGenerated) onGenerated();
      onClose();
    }, 800);
  };

  const handleResetDemo = () => {
    localStorage.removeItem('hackpilot_project');
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(3, 7, 18, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="animate-fade-in glass-card glow-purple" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '32px',
        borderRadius: '24px',
        border: '1px solid rgba(245, 214, 46, 0.3)',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: '#F5D62E',
            color: '#000',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem'
          }}>
            ⚡
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', margin: 0, color: '#ffffff' }}>Custom User Input & Setup</h2>
            <span style={{ fontSize: '0.8rem', color: '#F5D62E' }}>Type any topic to customize all 6 stages dynamically</span>
          </div>
        </div>

        <form onSubmit={handleSynthesize} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Your Custom Idea / Topic Prompt:
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. AI skin cancer scanner for rural telemedicine"
              value={topicPrompt}
              onChange={(e) => setTopicPrompt(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                Hackathon Event Name:
              </label>
              <input
                type="text"
                className="input-field"
                value={hackathonName}
                onChange={(e) => setHackathonName(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                Team Name:
              </label>
              <input
                type="text"
                className="input-field"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
              Select Hackathon Track:
            </label>
            <select
              className="select-field"
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
            >
              <option value="Generative AI & Enterprise LLMs">Generative AI & Enterprise LLMs</option>
              <option value="Sustainability & Green Tech">Sustainability & Green Tech</option>
              <option value="Healthcare & MedTech Diagnostics">Healthcare & MedTech Diagnostics</option>
              <option value="FinTech & DeFi Infrastructure">FinTech & DeFi Infrastructure</option>
              <option value="Smart Mobility & Logistics">Smart Mobility & Logistics</option>
              <option value="Cybersecurity & Fraud Prevention">Cybersecurity & Fraud Prevention</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <button
              type="submit"
              disabled={isSynthesizing}
              className="btn glow-purple"
              style={{
                background: '#F5D62E',
                color: '#000000',
                fontWeight: 800,
                padding: '14px',
                fontSize: '0.98rem',
                borderRadius: '12px',
                width: '100%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isSynthesizing ? (
                <>Synthesizing Custom Hackathon Suite...</>
              ) : (
                <>
                  <Sparkles size={18} />
                  ⚡ Synthesize Entire Hackathon Suite
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResetDemo}
              className="btn btn-ghost"
              style={{ fontSize: '0.82rem', color: '#94a3b8' }}
            >
              <RotateCcw size={14} /> Reset to Default Demo Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
