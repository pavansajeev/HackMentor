import React, { useState } from 'react';
import { Bot, Key, Download, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  onOpenExport: () => void;
  onResetBlueprint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  apiKey,
  onSaveApiKey,
  onOpenExport,
  onResetBlueprint
}) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSave = () => {
    onSaveApiKey(inputKey);
    setShowKeyModal(false);
  };

  return (
    <header className="header-bar">
      <div className="header-brand">
        <div className="header-logo-icon">
          <Bot size={22} />
        </div>
        <div>
          <h1 className="header-title">
            Hackathon Mentor AI <span className="badge badge-cyan"><Sparkles size={12} /> Live Guide</span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Stage-by-Stage Personal Hackathon Coach & Architect
          </p>
        </div>
      </div>

      <div className="header-actions">
        <button 
          className={`btn btn-outline btn-sm ${apiKey ? 'badge-cyan' : ''}`}
          onClick={() => setShowKeyModal(true)}
          title="Configure Optional Gemini API Key"
        >
          <Key size={14} />
          {apiKey ? 'API Key Set' : 'Add Gemini API Key'}
        </button>

        <button 
          className="btn btn-primary btn-sm"
          onClick={onOpenExport}
        >
          <Download size={14} />
          Export Brief
        </button>

        <button
          className="btn btn-outline btn-sm"
          onClick={onResetBlueprint}
          title="Reset Hackathon Blueprint"
        >
          <RefreshCw size={14} />
          Reset
        </button>
      </div>

      {showKeyModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass-panel" style={{ width: '420px', padding: '24px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Key size={18} className="text-cyan" /> Gemini API Key (Optional)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              By default, Hackathon Mentor AI works instantly offline using its intelligent local hackathon matrix engine. Provide your Google Gemini API key to enable live custom AI streaming!
            </p>
            <input 
              type="password"
              className="glass-input"
              style={{ width: '100%', marginBottom: '16px' }}
              placeholder="AIzaSy..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-outline btn-sm" onClick={() => setShowKeyModal(false)}>
                Cancel
              </button>
              <button className="btn btn-cyan btn-sm" onClick={handleSave}>
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
