import React from 'react';
import { Award, Download, CheckCircle2, Sparkles, Rocket, FileText, ArrowUpRight, ShieldCheck, RefreshCw, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReadinessScorecard({ projectState, setProjectState, onSelectTab }) {

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.warn("Confetti error:", err);
    }
  };

  React.useEffect(() => {
    triggerConfetti();
  }, []);

  const safeState = projectState || {};
  const title = safeState.title || "My Hackathon Project";
  const hackathonName = safeState.hackathonName || "Global Hackathon 2026";
  const track = safeState.track || "Generative AI";
  const problemStatement = safeState.problemStatement || "Manual overhead and complexity.";
  const solution = safeState.solution || "AI automated copilot.";
  const novelty = safeState.novelty || "Low latency contextual pipeline.";
  const elevatorScript = safeState.elevatorScript || "";

  const kanbanTasks = safeState.kanbanTasks || [];
  const techStack = safeState.techStack || [];
  const slides = safeState.slides || [];
  const architectureNodes = safeState.architectureNodes || [];
  const qnaFeedback = safeState.judgeScores?.qnaFeedback || [];

  // Calculate readiness metrics
  const doneTasks = kanbanTasks.filter(t => t.status === 'done').length;
  const totalTasks = kanbanTasks.length || 1;
  const kanbanScore = Math.min(100, Math.round((doneTasks / totalTasks) * 100));

  const ideaScore = 94;
  const techScore = techStack.length >= 3 ? 92 : 75;
  const pitchScore = slides.length >= 5 ? 95 : 70;
  const qnaScore = qnaFeedback.length > 0 ? 94 : 70;

  const overallReadiness = Math.round((ideaScore * 0.2) + (techScore * 0.2) + (kanbanScore * 0.25) + (pitchScore * 0.2) + (qnaScore * 0.15));

  const handleExportPackage = () => {
    const markdownContent = `# 🚀 ${title} - Hackathon Package
**Hackathon:** ${hackathonName}
**Track:** ${track}
**Overall Readiness Score:** ${overallReadiness}%

---

## 1. Problem Statement & Novelty
- **Problem:** ${problemStatement}
- **Solution:** ${solution}
- **USP / Secret Sauce:** ${novelty}

---

## 2. Tech Architecture & Stack
- **Tech Stack:** ${techStack.join(', ')}
- **Architecture Nodes:**
${architectureNodes.map(n => `  - [${n.category}] ${n.name}`).join('\n')}

---

## 3. MVP Completed Demo Features
${kanbanTasks.map(t => `- [${t.status === 'done' ? 'x' : ' '}] ${t.title} (${t.priority} priority)`).join('\n')}

---

## 4. 7-Slide Pitch Deck Outline
${slides.map(s => `### Slide ${s.id}: ${s.title}\n${s.content}\n`).join('\n')}

---

## 5. 90-Second Elevator Pitch Script
${elevatorScript}

---

## 6. Judge Q&A Cheat Sheet
${qnaFeedback.map((q, idx) => `**Q${idx+1}:** ${q.question}\n**Answer:** ${q.answer}\n**Score:** ${q.score}/100\n`).join('\n')}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_')}_Hackathon_Package.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Banner */}
      <div className="glass-card glow-emerald" style={{ padding: '36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25), transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'inline-flex', padding: '12px 18px', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', marginBottom: '16px', fontWeight: 600, fontSize: '0.88rem' }}>
          🏆 HACKATHON SUBMISSION READINESS CONFIRMED
        </div>

        <h1 style={{ fontSize: '2.5rem', margin: '0 0 12px' }} className="gradient-text">
          {overallReadiness}% Hackathon Ready!
        </h1>
        <p style={{ color: '#cbd5e1', maxWidth: '650px', margin: '0 auto 24px', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Congratulations! Your team has formulated a validated problem thesis, configured a high-performance tech stack, scoped your MVP demo flow, built a 7-slide pitch deck, and completed AI judge rehearsal.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button onClick={handleExportPackage} className="btn btn-emerald glow-emerald" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            <Download size={18} />
            Export Complete Submission Package (.MD)
          </button>
          <button onClick={triggerConfetti} className="btn btn-secondary" style={{ padding: '14px 20px' }}>
            <Sparkles size={18} />
            Celebrate Victory 🎉
          </button>
        </div>
      </div>

      {/* Multi-Vector Metric Gauges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>1. Idea & Novelty</span>
            <span className="badge badge-emerald">{ideaScore}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${ideaScore}%`, background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
          </div>
          <button onClick={() => onSelectTab('problem')} className="btn btn-ghost" style={{ fontSize: '0.78rem', color: '#94a3b8', padding: 0, justifyContent: 'flex-start' }}>
            Refine Problem Thesis →
          </button>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>2. Tech Blueprint</span>
            <span className="badge badge-cyan">{techScore}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${techScore}%`, background: 'linear-gradient(90deg, #06b6d4, #38bdf8)' }} />
          </div>
          <button onClick={() => onSelectTab('blueprint')} className="btn btn-ghost" style={{ fontSize: '0.78rem', color: '#94a3b8', padding: 0, justifyContent: 'flex-start' }}>
            Adjust Stack Architecture →
          </button>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>3. MVP Demo Features</span>
            <span className="badge badge-amber">{kanbanScore}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${kanbanScore}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
          </div>
          <button onClick={() => onSelectTab('mvp')} className="btn btn-ghost" style={{ fontSize: '0.78rem', color: '#94a3b8', padding: 0, justifyContent: 'flex-start' }}>
            Update Live Kanban →
          </button>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>4. Pitch Deck & Script</span>
            <span className="badge badge-purple">{pitchScore}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pitchScore}%`, background: 'linear-gradient(90deg, #8b5cf6, #c084fc)' }} />
          </div>
          <button onClick={() => onSelectTab('pitch')} className="btn btn-ghost" style={{ fontSize: '0.78rem', color: '#94a3b8', padding: 0, justifyContent: 'flex-start' }}>
            Practice Teleprompter →
          </button>
        </div>
      </div>

      {/* Submission Checklist Summary */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.2rem', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} color="#34d399" />
          Final Pre-Submission Checklist
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} color="#34d399" />
            <span>Problem Hook formatted for 30s opener</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} color="#34d399" />
            <span>Live working demo flow tested</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} color="#34d399" />
            <span>Offline sample dataset fallback ready</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} color="#34d399" />
            <span>7 Slides exported and formatted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} color="#34d399" />
            <span>90-second speech timing practiced</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} color="#34d399" />
            <span>Technical judge questions rehearsed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
