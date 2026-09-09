import React from 'react';
import type { ProjectBlueprint, TechStackConfig } from '../types/mentor';
import { TECH_OPTIONS } from '../data/mentorKnowledge';
import { Layers, Server, Layout, Database, Cpu, Cloud, Lock, ArrowRight, Code } from 'lucide-react';

interface ArchitectureViewerProps {
  blueprint: ProjectBlueprint;
  onUpdateTechStack: (stack: Partial<TechStackConfig>) => void;
}

export const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({
  blueprint,
  onUpdateTechStack
}) => {
  const { techStack, modules, databaseSchema, userFlowSteps } = blueprint;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Visual System Architecture Diagram Card */}
      <div className="glass-panel" style={{ padding: '16px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--cyan)' }}>
          <Layers size={18} /> Interactive System Architecture Map
        </h4>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px', alignItems: 'center', background: 'rgba(10, 15, 26, 0.8)',
          padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px border var(--border-color)'
        }}>
          {/* Frontend Box */}
          <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-sm)' }}>
            <Layout size={20} color="var(--primary-light)" style={{ marginBottom: '4px' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Frontend App</div>
            <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{techStack.frontend}</span>
          </div>

          <ArrowRight size={18} color="var(--text-dim)" style={{ justifySelf: 'center' }} />

          {/* Backend Box */}
          <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid var(--cyan)', borderRadius: 'var(--radius-sm)' }}>
            <Server size={20} color="var(--cyan)" style={{ marginBottom: '4px' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>REST / API Gateway</div>
            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{techStack.backend}</span>
          </div>

          <ArrowRight size={18} color="var(--text-dim)" style={{ justifySelf: 'center' }} />

          {/* AI Model Box */}
          <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid var(--purple)', borderRadius: 'var(--radius-sm)' }}>
            <Cpu size={20} color="var(--purple)" style={{ marginBottom: '4px' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>AI Intelligence Engine</div>
            <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{techStack.aiModel}</span>
          </div>

          <ArrowRight size={18} color="var(--text-dim)" style={{ justifySelf: 'center' }} />

          {/* Database & Cloud */}
          <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--emerald)', borderRadius: 'var(--radius-sm)' }}>
            <Database size={20} color="var(--emerald)" style={{ marginBottom: '4px' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Data & Hosting</div>
            <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{techStack.database}</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Customization Selector */}
      <div className="glass-panel" style={{ padding: '16px' }}>
        <h4 style={{ marginBottom: '14px', color: '#c7d2fe' }}>
          Recommended Hackathon Tech Stack & Alternatives
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          
          {/* Backend Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Server size={14} className="text-cyan" /> Backend Framework:
            </label>
            <select
              className="glass-input"
              style={{ width: '100%', marginTop: '4px' }}
              value={techStack.backend}
              onChange={(e) => onUpdateTechStack({ backend: e.target.value })}
            >
              {TECH_OPTIONS.backend.map(item => (
                <option key={item.name} value={item.name} style={{ background: '#0f172a' }}>
                  {item.name} ({item.bestFor})
                </option>
              ))}
            </select>
          </div>

          {/* Frontend Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layout size={14} className="text-cyan" /> Frontend Framework:
            </label>
            <select
              className="glass-input"
              style={{ width: '100%', marginTop: '4px' }}
              value={techStack.frontend}
              onChange={(e) => onUpdateTechStack({ frontend: e.target.value })}
            >
              {TECH_OPTIONS.frontend.map(item => (
                <option key={item.name} value={item.name} style={{ background: '#0f172a' }}>
                  {item.name} ({item.bestFor})
                </option>
              ))}
            </select>
          </div>

          {/* Database Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} className="text-cyan" /> Database Store:
            </label>
            <select
              className="glass-input"
              style={{ width: '100%', marginTop: '4px' }}
              value={techStack.database}
              onChange={(e) => onUpdateTechStack({ database: e.target.value })}
            >
              {TECH_OPTIONS.database.map(item => (
                <option key={item.name} value={item.name} style={{ background: '#0f172a' }}>
                  {item.name} ({item.bestFor})
                </option>
              ))}
            </select>
          </div>

          {/* AI Model Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Cpu size={14} className="text-cyan" /> AI Model / Engine:
            </label>
            <select
              className="glass-input"
              style={{ width: '100%', marginTop: '4px' }}
              value={techStack.aiModel}
              onChange={(e) => onUpdateTechStack({ aiModel: e.target.value })}
            >
              {TECH_OPTIONS.aiModel.map(item => (
                <option key={item.name} value={item.name} style={{ background: '#0f172a' }}>
                  {item.name} ({item.bestFor})
                </option>
              ))}
            </select>
          </div>

          {/* Cloud Hosting */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Cloud size={14} className="text-cyan" /> Cloud Hosting:
            </label>
            <select
              className="glass-input"
              style={{ width: '100%', marginTop: '4px' }}
              value={techStack.cloud}
              onChange={(e) => onUpdateTechStack({ cloud: e.target.value })}
            >
              {TECH_OPTIONS.cloud.map(item => (
                <option key={item.name} value={item.name} style={{ background: '#0f172a' }}>
                  {item.name} ({item.bestFor})
                </option>
              ))}
            </select>
          </div>

          {/* Authentication */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} className="text-cyan" /> Authentication Provider:
            </label>
            <select
              className="glass-input"
              style={{ width: '100%', marginTop: '4px' }}
              value={techStack.auth}
              onChange={(e) => onUpdateTechStack({ auth: e.target.value })}
            >
              {TECH_OPTIONS.auth.map(item => (
                <option key={item.name} value={item.name} style={{ background: '#0f172a' }}>
                  {item.name} ({item.bestFor})
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Modules & Database Schema & APIs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        
        {/* Module List */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#a5b4fc', marginBottom: '8px' }}>
            System Module Breakdown
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(modules.length > 0 ? modules : [
              "1. User Onboarding & Auth Module",
              "2. Core AI Prompt Orchestration Module",
              "3. Real-time Output Visualizer",
              "4. Export & Presentation Generator"
            ]).map((mod, i) => (
              <li key={i} style={{ fontSize: '0.8rem', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                {mod}
              </li>
            ))}
          </ul>
        </div>

        {/* Database Schema Pseudo-Code */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#67e8f9', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Code size={14} /> Database Schema Structure
          </h5>
          <pre style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#a7f3d0',
            background: 'rgba(10, 15, 26, 0.9)', padding: '10px', borderRadius: '4px',
            overflowX: 'auto', border: '1px solid var(--border-color)'
          }}>
{databaseSchema || `Users {
  id: String (PK),
  email: String,
  created_at: DateTime
}

Projects {
  id: String (PK),
  user_id: String (FK),
  title: String,
  domain: String,
  blueprint_data: JSON
}`}
          </pre>
        </div>

      </div>

      {/* User Flow Steps */}
      <div className="glass-panel" style={{ padding: '16px' }}>
        <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f472b6', marginBottom: '10px' }}>
          User Journey & Application Flow
        </h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          {(userFlowSteps.length > 0 ? userFlowSteps : [
            "User lands on Web App",
            "Selects Domain & inputs Problem",
            "AI Mentor checks Feasibility & Stack",
            "Exports Final Pitch & Code Blueprint"
          ]).map((step, idx) => (
            <React.Fragment key={idx}>
              <div style={{
                padding: '6px 12px', background: 'rgba(236, 72, 153, 0.12)',
                border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem', fontWeight: 500, color: '#fbcfe8'
              }}>
                {idx + 1}. {step}
              </div>
              {idx < (userFlowSteps.length || 4) - 1 && <ArrowRight size={14} color="var(--text-dim)" />}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};
