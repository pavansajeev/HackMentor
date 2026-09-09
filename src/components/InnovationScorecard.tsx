import React from 'react';
import type { ProjectBlueprint } from '../types/mentor';
import { ShieldCheck, Zap, AlertTriangle, Crosshair, Star, CheckCircle, TrendingUp } from 'lucide-react';

interface InnovationScorecardProps {
  blueprint: ProjectBlueprint;
}

export const InnovationScorecard: React.FC<InnovationScorecardProps> = ({ blueprint }) => {
  const { swot, innovationScore } = blueprint;

  const scoreMetrics = [
    { label: 'Innovation', val: innovationScore.innovation, color: '#6366f1', desc: 'Novelty & unique approach' },
    { label: 'Feasibility', val: innovationScore.feasibility, color: '#10b981', desc: 'Completable within hackathon duration' },
    { label: 'Scalability', val: innovationScore.scalability, color: '#06b6d4', desc: 'Post-hackathon growth potential' },
    { label: 'Social Impact', val: innovationScore.socialImpact, color: '#ec4899', desc: 'Real-world beneficiary value' },
    { label: 'Technical Complexity', val: innovationScore.technicalComplexity, color: '#a855f7', desc: 'Architectural sophistication' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Overall Score Banner */}
      <div className="glass-panel" style={{
        padding: '20px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid var(--border-glow)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Star size={20} color="#f59e0b" fill="#f59e0b" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Hackathon Innovation Score</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Evaluated by Mentor Coach Alex based on problem alignment, technical scope, and pitch presentation feasibility.
          </p>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(15, 23, 42, 0.8)', padding: '10px 20px',
          borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cyan)' }}>
            {innovationScore.overallScore.toFixed(1)}
          </span>
          <span style={{ fontSize: '1rem', color: 'var(--text-dim)', fontWeight: 600 }}>/ 10</span>
        </div>
      </div>

      {/* Score Breakdown Bar Cards */}
      <div className="glass-panel" style={{ padding: '16px' }}>
        <h4 style={{ marginBottom: '14px', color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={16} /> Detailed Criteria Breakdown
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {scoreMetrics.map((item) => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>{item.label} <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 400 }}>({item.desc})</span></span>
                <span style={{ fontWeight: 700, color: item.color }}>{item.val.toFixed(1)} / 10</span>
              </div>
              <div style={{ height: '8px', width: '100%', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${(item.val / 10) * 100}%`,
                  background: item.color, borderRadius: '4px',
                  transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Mentor Suggestions */}
        {innovationScore.mentorFeedback && innovationScore.mentorFeedback.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--cyan)', marginBottom: '6px' }}>
              💡 Mentor Optimization Suggestions:
            </div>
            <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {innovationScore.mentorFeedback.map((tip, idx) => (
                <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={12} color="var(--emerald)" /> {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* SWOT Analysis 4-Quadrant Matrix */}
      <div className="glass-panel" style={{ padding: '16px' }}>
        <h4 style={{ marginBottom: '14px', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Crosshair size={16} /> SWOT Analysis Matrix
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          
          {/* Strengths */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} /> Strengths (S)
            </h5>
            <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {(swot.strengths.length > 0 ? swot.strengths : [
                "Fast prototype iteration speed",
                "High practical relevance to target audience",
                "Lightweight API architecture"
              ]).map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
          </div>

          {/* Weaknesses */}
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={14} /> Weaknesses (W)
            </h5>
            <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {(swot.weaknesses.length > 0 ? swot.weaknesses : [
                "Limited 24-48h development time window",
                "Dependency on third-party AI tokens"
              ]).map((w, idx) => <li key={idx}>{w}</li>)}
            </ul>
          </div>

          {/* Opportunities */}
          <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Crosshair size={14} /> Opportunities (O)
            </h5>
            <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {(swot.opportunities.length > 0 ? swot.opportunities : [
                "High judge appeal in AI track",
                "Post-hackathon open source potential",
                "Integration with real APIs"
              ]).map((o, idx) => <li key={idx}>{o}</li>)}
            </ul>
          </div>

          {/* Threats */}
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} /> Threats (T)
            </h5>
            <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {(swot.threats.length > 0 ? swot.threats : [
                "Live demo internet network flakiness",
                "Competitor teams building similar ideas"
              ]).map((t, idx) => <li key={idx}>{t}</li>)}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};
