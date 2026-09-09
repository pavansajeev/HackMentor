import React, { useState } from 'react';
import type { ProjectBlueprint, TechStackConfig } from '../types/mentor';
import { ArchitectureViewer } from './ArchitectureViewer';
import { InnovationScorecard } from './InnovationScorecard';
import { PitchWorkshop } from './PitchWorkshop';
import { 
  FileText, Layers, ShieldCheck, Award, Crosshair, Users, 
  Target, CheckSquare, AlertOctagon 
} from 'lucide-react';

interface ProjectCanvasProps {
  blueprint: ProjectBlueprint;
  onUpdateBlueprint: (updated: Partial<ProjectBlueprint>) => void;
}

export const ProjectCanvas: React.FC<ProjectCanvasProps> = ({
  blueprint,
  onUpdateBlueprint
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'feasibility' | 'pitch' | 'scorecard' | 'team'>('overview');

  const tabs = [
    { id: 'overview', label: '1. Problem Brief', icon: Target },
    { id: 'architecture', label: '2. Tech Stack & Architecture', icon: Layers },
    { id: 'feasibility', label: '3. Feasibility & MVP', icon: ShieldCheck },
    { id: 'pitch', label: '4. Pitch & Judge Q&A', icon: Award },
    { id: 'scorecard', label: '5. SWOT & Scorecard', icon: Crosshair },
    { id: 'team', label: '6. Team Roles', icon: Users }
  ] as const;

  const handleTechStackChange = (stackUpdate: Partial<TechStackConfig>) => {
    onUpdateBlueprint({
      techStack: {
        ...blueprint.techStack,
        ...stackUpdate
      }
    });
  };

  return (
    <div className="glass-panel canvas-container">
      {/* Navigation Tabs Header */}
      <div className="canvas-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`canvas-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Canvas Scrollable Content Area */}
      <div className="canvas-body">
        
        {/* Tab 1: Overview & Problem Brief */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={16} /> Hackathon Problem Brief
                </h4>
                {blueprint.domain && <span className="badge badge-cyan">{blueprint.domain}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Project Title:</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{blueprint.projectTitle || 'Untitled Hackathon Idea'}</div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Problem Origin:</div>
                  <div style={{ fontWeight: 600 }}>{blueprint.problemSource || 'Self-created'}</div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Audience:</div>
                  <div style={{ fontWeight: 600 }}>{blueprint.targetUser || 'Students & domain users'}</div>
                </div>
              </div>
            </div>

            {/* Problem Reasoning Breakdown */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <h4 style={{ marginBottom: '12px', color: '#c7d2fe' }}>Step 2 Problem Reasoning Matrix</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '10px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 600 }}>Core Problem Statement:</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '2px' }}>
                    {blueprint.problemStatement || 'Answer Stage 1 questions in the mentor chat to generate.'}
                  </p>
                </div>

                <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '10px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 600 }}>Root Cause:</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '2px' }}>
                    {blueprint.rootCause || 'Disconnected tools and high manual effort.'}
                  </p>
                </div>

                <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '10px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#f472b6', fontWeight: 600 }}>Unique Value Proposition (UVP):</span>
                  <p style={{ fontSize: '0.85rem', color: '#fbcfe8', fontWeight: 600, marginTop: '2px', fontStyle: 'italic' }}>
                    "{blueprint.uvp || 'An intelligent lightweight system delivering instant automated guidance.'}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture */}
        {activeTab === 'architecture' && (
          <ArchitectureViewer 
            blueprint={blueprint} 
            onUpdateTechStack={handleTechStackChange} 
          />
        )}

        {/* Tab 3: Feasibility & MVP */}
        {activeTab === 'feasibility' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '16px' }}>
              <h4 style={{ color: 'var(--emerald)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={18} /> Hackathon Time Constraint & MVP Sorter
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                
                {/* Essential Features */}
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckSquare size={14} /> Essential Features (Must-Have for Demo)
                  </h5>
                  <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {(blueprint.essentialFeatures.length > 0 ? blueprint.essentialFeatures : [
                      "Core user interaction flow",
                      "AI processing & response display",
                      "Clean responsive interface",
                      "Working data persistence"
                    ]).map((feat, idx) => <li key={idx}>{feat}</li>)}
                  </ul>
                </div>

                {/* Optional Features */}
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertOctagon size={14} /> Optional / Post-Hackathon (Nice-to-Have)
                  </h5>
                  <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {(blueprint.optionalFeatures.length > 0 ? blueprint.optionalFeatures : [
                      "Complex analytics dashboard",
                      "Multi-language voice input",
                      "Social media sharing connectors"
                    ]).map((opt, idx) => <li key={idx}>{opt}</li>)}
                  </ul>
                </div>

              </div>
            </div>

            {/* MVP Checklist */}
            <div className="glass-panel" style={{ padding: '16px' }}>
              <h4 style={{ color: '#c7d2fe', marginBottom: '12px' }}>MVP Readiness Checklist</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(blueprint.mvpChecklist.length > 0 ? blueprint.mvpChecklist : [
                  "✅ End-to-end user story tested",
                  "✅ Zero critical runtime console bugs",
                  "✅ Responsive on 1080p presentation display",
                  "✅ Backup video / screenshots recorded"
                ]).map((item, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '4px', fontSize: '0.85rem' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Pitch Deck Workshop */}
        {activeTab === 'pitch' && (
          <PitchWorkshop blueprint={blueprint} />
        )}

        {/* Tab 5: SWOT & Scorecard */}
        {activeTab === 'scorecard' && (
          <InnovationScorecard blueprint={blueprint} />
        )}

        {/* Tab 6: Team Guidance */}
        {activeTab === 'team' && (
          <div className="glass-panel" style={{ padding: '16px' }}>
            <h4 style={{ color: 'var(--purple)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={18} /> Recommended Team Role Allocations
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {blueprint.teamRoles.map((role, idx) => (
                <div key={idx} style={{
                  background: 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border-color)',
                  padding: '12px', borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--cyan)', fontSize: '0.9rem', marginBottom: '4px' }}>
                    {role.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '6px' }}>
                    Skills: {role.recommendedSkills.join(', ')}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>Key Deliverables:</strong>
                    <ul style={{ paddingLeft: '16px', marginTop: '2px' }}>
                      {role.keyDeliverables.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
