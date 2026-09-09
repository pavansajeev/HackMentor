import React, { useState } from 'react';
import { Kanban, CheckSquare, Clock, Code2, Plus, Sparkles, ArrowRight, AlertTriangle, Copy, Check, Flame } from 'lucide-react';

export default function MvpKanban({ projectState, setProjectState, onNext }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [activeSnippetTab, setActiveSnippetTab] = useState('gemini');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'todo',
      priority: newTaskPriority,
      phase: 'Demo UI'
    };
    setProjectState(prev => ({
      ...prev,
      kanbanTasks: [...prev.kanbanTasks, newTask]
    }));
    setNewTaskTitle('');
  };

  const handleMoveTask = (id, newStatus) => {
    setProjectState(prev => ({
      ...prev,
      kanbanTasks: prev.kanbanTasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
    }));
  };

  const handleDeleteTask = (id) => {
    setProjectState(prev => ({
      ...prev,
      kanbanTasks: prev.kanbanTasks.filter(t => t.id !== id)
    }));
  };

  const projectTitle = projectState.title || "Hackathon AI App";
  const problemStr = projectState.problemStatement || "Analyze user input";

  const codeSnippets = {
    gemini: {
      title: `${projectTitle} AI Endpoint Integration (Node / Python)`,
      code: `// Express/Node.js Gemini API Integration for ${projectTitle}
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/predict", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = \`Context: Solving "\${${JSON.stringify(problemStr)}}". Input data: \${JSON.stringify(req.body.userData)}\`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ success: true, project: "${projectTitle}", analysis: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`
    },
    react: {
      title: `Live Demo State & API Hook for ${projectTitle}`,
      code: `import { useState } from 'react';

export function use${projectTitle.replace(/[^a-zA-Z0-9]/g, '')}Demo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runPrediction = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData })
      });
      const data = await res.json();
      setResult(data.analysis);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, runPrediction };
}`
    }
  };

  const handleCopyCode = (key) => {
    navigator.clipboard.writeText(codeSnippets[key].code);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const tasksByStatus = {
    todo: projectState.kanbanTasks.filter(t => t.status === 'todo'),
    'in-progress': projectState.kanbanTasks.filter(t => t.status === 'in-progress'),
    done: projectState.kanbanTasks.filter(t => t.status === 'done')
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Banner */}
      <div className="glass-card glow-emerald" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#34d399',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <Kanban size={28} />
          </div>
          <div>
            <span className="badge badge-emerald">Stage 3 of 6</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>MVP Development & Live Kanban Board</h2>
          </div>
        </div>
        <p style={{ color: '#94a3b8', maxWidth: '750px', fontSize: '1rem', lineHeight: '1.6' }}>
          Avoid the #1 hackathon trap: building invisible backend features instead of demo-ready user flows. Focus 100% on the core loop that will be shown during your live 2-minute pitch.
        </p>
      </div>

      {/* Demo Focus Golden Rules */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Flame size={24} color="#f43f5e" />
          <div>
            <strong style={{ fontSize: '0.92rem', color: '#f8fafc' }}>Must-Have Demo Flow</strong>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Core user click → AI calculation → Visual result</p>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <AlertTriangle size={24} color="#f59e0b" />
          <div>
            <strong style={{ fontSize: '0.92rem', color: '#f8fafc' }}>Cut from MVP Scope</strong>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>User Auth login/signup, payment gateways, complex settings</p>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Code2 size={24} color="#38bdf8" />
          <div>
            <strong style={{ fontSize: '0.92rem', color: '#f8fafc' }}>Fallback Pre-seeded Data</strong>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Always have offline fallback JSON if live WiFi drops</p>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Enter new MVP task (e.g. Build carbon prediction UI widget)"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ flex: 1, minWidth: '240px' }}
        />
        <select
          className="select-field"
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
          style={{ width: '140px' }}
        >
          <option value="High">🔥 High Priority</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">💤 Low</option>
        </select>
        <button onClick={handleAddTask} className="btn btn-primary">
          <Plus size={18} />
          Add MVP Task
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Column 1: To Do */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} /> To Do ({tasksByStatus.todo.length})
            </h3>
            <span className="badge badge-amber">Sprint Backlog</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '200px' }}>
            {tasksByStatus.todo.map(task => (
              <div key={task.id} style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(30, 41, 59, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 500 }}>{task.title}</span>
                  <span className={`badge ${task.priority === 'High' ? 'badge-rose' : 'badge-cyan'}`}>{task.priority}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button onClick={() => handleMoveTask(task.id, 'in-progress')} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Start →
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)} className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#f43f5e' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={18} /> In Progress ({tasksByStatus['in-progress'].length})
            </h3>
            <span className="badge badge-cyan">Building Now</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '200px' }}>
            {tasksByStatus['in-progress'].map(task => (
              <div key={task.id} style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 500 }}>{task.title}</span>
                  <span className="badge badge-cyan">{task.priority}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button onClick={() => handleMoveTask(task.id, 'done')} className="btn btn-emerald" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    Complete ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Demo Ready */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckSquare size={18} /> Demo Ready ({tasksByStatus.done.length})
            </h3>
            <span className="badge badge-emerald">Verified</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '200px' }}>
            {tasksByStatus.done.map(task => (
              <div key={task.id} style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 500, textDecoration: 'line-through' }}>
                    {task.title}
                  </span>
                  <span className="badge badge-emerald">Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Starter Code Snippets Section */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code2 size={20} color="#a78bfa" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Instant Hackathon Starter Code Snippets</h3>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveSnippetTab('gemini')}
              className={`btn ${activeSnippetTab === 'gemini' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              Gemini API Snippet
            </button>
            <button
              onClick={() => setActiveSnippetTab('react')}
              className={`btn ${activeSnippetTab === 'react' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              React Demo Hook
            </button>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => handleCopyCode(activeSnippetTab)}
            className="btn btn-secondary"
            style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', fontSize: '0.78rem' }}
          >
            {copiedIndex === activeSnippetTab ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
            {copiedIndex === activeSnippetTab ? 'Copied!' : 'Copy Code'}
          </button>
          <pre className="code-box">
            <code>{codeSnippets[activeSnippetTab].code}</code>
          </pre>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
        <button
          onClick={onNext}
          className="btn btn-emerald"
          style={{ padding: '14px 28px', fontSize: '1rem' }}
        >
          Proceed to Pitch Deck & Teleprompter
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
