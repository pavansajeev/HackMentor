import React, { useState } from 'react';
import type { ProjectBlueprint } from '../types/mentor';
import { Mic, HelpCircle, Copy, Check, MessageSquare, Flame } from 'lucide-react';

interface PitchWorkshopProps {
  blueprint: ProjectBlueprint;
}

export const PitchWorkshop: React.FC<PitchWorkshopProps> = ({ blueprint }) => {
  const { pitchScript, elevatorPitch, judgeQA } = blueprint;
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const pitchSections = [
    { title: '1. Opening Hook (0-15s)', key: 'openingHook', val: pitchScript.openingHook || "Imagine solving a problem that impacts millions of users every single day..." },
    { title: '2. Problem Statement (15-45s)', key: 'problem', val: pitchScript.problem || `Currently, users face heavy friction in the ${blueprint.domain || 'target'} domain...` },
    { title: '3. Solution Overview (45s-1m30s)', key: 'solution', val: pitchScript.solution || `Introducing ${blueprint.projectTitle || 'our app'}: an intuitive solution...` },
    { title: '4. Why Existing Solutions Fail (1m30s-2m)', key: 'whyExistingFails', val: pitchScript.whyExistingFails || "Legacy alternatives are clunky, slow, and expensive." },
    { title: '5. Key Features & MVP Demo (2m-3m)', key: 'keyFeatures', val: pitchScript.keyFeatures || "1. Real-time reasoning\n2. Stack architecture\n3. Export brief" },
    { title: '6. Technology Used (3m-3m30s)', key: 'techUsed', val: pitchScript.techUsed || `Built with ${blueprint.techStack.frontend}, ${blueprint.techStack.backend}, and ${blueprint.techStack.aiModel}.` },
    { title: '7. Market Potential & Future Scope (3m30s-4m30s)', key: 'marketPotential', val: pitchScript.marketPotential || "Scalable to millions of hackathon participants worldwide." },
    { title: '8. Closing Statement (4m30s-5m)', key: 'closingStatement', val: pitchScript.closingStatement || "We are building the future of hackathon mentorship. Thank you!" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 30-Second Elevator Pitch Card */}
      <div className="glass-panel" style={{
        padding: '16px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid var(--cyan-glow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={18} /> 30-Second Elevator Pitch
          </h4>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => handleCopy(elevatorPitch || pitchSections[0].val, 'Elevator Pitch')}
          >
            {copiedSection === 'Elevator Pitch' ? <Check size={14} color="var(--emerald)" /> : <Copy size={14} />}
            {copiedSection === 'Elevator Pitch' ? 'Copied!' : 'Copy Pitch'}
          </button>
        </div>
        <p style={{
          fontSize: '0.9rem', fontStyle: 'italic', color: '#e0f2fe',
          background: 'rgba(10, 15, 26, 0.6)', padding: '12px', borderRadius: 'var(--radius-sm)',
          borderLeft: '3px solid var(--cyan)'
        }}>
          {elevatorPitch || `"${pitchSections[0].val} ${pitchSections[2].val} Built with ${blueprint.techStack.frontend} and ${blueprint.techStack.aiModel}."`}
        </p>
      </div>

      {/* 3-5 Minute Pitch Script Breakdown */}
      <div className="glass-panel" style={{ padding: '16px' }}>
        <h4 style={{ marginBottom: '14px', color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Mic size={16} /> 3–5 Minute Presentation Pitch Script
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pitchSections.map((sec) => (
            <div key={sec.key} style={{
              background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)', padding: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-light)' }}>
                  {sec.title}
                </span>
                <button 
                  className="btn btn-outline btn-sm"
                  style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                  onClick={() => handleCopy(sec.val, sec.title)}
                >
                  {copiedSection === sec.title ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
                {sec.val}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Judge Defense Q&A Simulator */}
      <div className="glass-panel" style={{ padding: '16px' }}>
        <h4 style={{ marginBottom: '14px', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <HelpCircle size={16} /> Likely Judge Q&A Defense Bank
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(judgeQA.length > 0 ? judgeQA : [
            {
              question: "Why this problem?",
              recommendedAnswer: `We selected ${blueprint.domain || 'this problem'} because target users currently waste significant time manually performing repetitive tasks.`,
              proTip: "Highlight real user impact & validated urgency."
            },
            {
              question: "Why your tech stack approach?",
              recommendedAnswer: `We leveraged ${blueprint.techStack.frontend} alongside ${blueprint.techStack.aiModel} to ensure zero UI lag while maintaining AI reasoning speed.`,
              proTip: "Demonstrate developer velocity & modularity."
            },
            {
              question: "What makes your project unique?",
              recommendedAnswer: `Unlike static options, our AI system interactively adapts based on continuous user context without manual code overhead.`,
              proTip: "Focus on your Unique Value Proposition (UVP)."
            }
          ]).map((qa, idx) => (
            <div key={idx} style={{
              background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: 'var(--radius-sm)', padding: '12px'
            }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={14} /> Q{idx + 1}: "{qa.question}"
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '8px', paddingLeft: '20px' }}>
                <strong>Recommended Answer:</strong> {qa.recommendedAnswer}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#fcd34d', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                💡 <strong>Mentor Defense Tip:</strong> {qa.proTip}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
