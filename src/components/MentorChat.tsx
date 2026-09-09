import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, StageId } from '../types/mentor';
import { STAGES_INFO, DOMAINS } from '../data/mentorKnowledge';
import { Send, Bot, User, Sparkles, ChevronRight, HelpCircle, AlertTriangle } from 'lucide-react';

interface MentorChatProps {
  messages: ChatMessage[];
  currentStage: StageId;
  onSendMessage: (text: string) => void;
  onAdvanceStage: () => void;
  canAdvance: boolean;
  isThinking?: boolean;
}

export const MentorChat: React.FC<MentorChatProps> = ({
  messages,
  currentStage,
  onSendMessage,
  onAdvanceStage,
  canAdvance,
  isThinking = false
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentStageInfo = STAGES_INFO.find(s => s.id === currentStage) || STAGES_INFO[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleQuickOptionClick = (option: string) => {
    onSendMessage(option);
  };

  return (
    <div className="glass-panel chat-container">
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--cyan) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
          }}>
            <Bot size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Coach Alex (Mentor AI)</h3>
              <span className="badge badge-indigo">Step {currentStage}: {currentStageInfo.title}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {currentStageInfo.description}
            </p>
          </div>
        </div>

        {canAdvance && currentStage < 5 && (
          <button 
            className="btn btn-cyan btn-sm"
            onClick={onAdvanceStage}
            style={{ animation: 'pulse 2s infinite' }}
          >
            Next Step <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Stage 1 Domain Quick Selection Grid Banner */}
      {currentStage === 1 && messages.length <= 2 && (
        <div style={{ padding: '12px 16px', background: 'rgba(99, 102, 241, 0.08)', borderBottom: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c7d2fe', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} className="text-cyan" /> Quick Select Your Hackathon Interest Domain:
          </p>
          <div className="domain-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
            {DOMAINS.map(d => (
              <div 
                key={d.name} 
                className="domain-card"
                onClick={() => handleQuickOptionClick(`I am interested in ${d.name}`)}
                style={{ padding: '8px', fontSize: '0.8rem', textAlign: 'center' }}
              >
                <div style={{ fontWeight: 600, color: d.badgeColor }}>{d.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message-bubble ${msg.sender === 'mentor' ? 'message-mentor' : 'message-user'}`}
          >
            <div className="message-sender-name">
              {msg.sender === 'mentor' ? (
                <> <Bot size={13} /> Mentor Coach Alex </>
              ) : (
                <> <User size={13} /> Hackathon Participant </>
              )}
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>
                {msg.timestamp}
              </span>
            </div>

            <div style={{ whiteSpace: 'pre-line' }}>
              {msg.text}
            </div>

            {/* Quick Option Pills */}
            {msg.options && msg.options.length > 0 && (
              <div className="quick-options" style={{ marginTop: '12px' }}>
                {msg.options.map((opt, i) => (
                  <button 
                    key={i}
                    className="quick-option-btn"
                    onClick={() => handleQuickOptionClick(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="message-bubble message-mentor" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} className="text-cyan" style={{ animation: 'spin 1.5s linear infinite' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Mentor is thinking and formulating guidance...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Guidance Rule Reminder Footer */}
      <div style={{
        padding: '6px 16px', background: 'rgba(15, 23, 42, 0.95)',
        borderTop: '1px solid var(--border-color)', fontSize: '0.75rem',
        color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertTriangle size={12} color="#eab308" /> Mentor Rule: Asks questions & guides architecture (No raw project code).
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <HelpCircle size={12} /> Step {currentStage} of 5
        </span>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="chat-input-area">
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="glass-input"
            style={{ flex: 1 }}
            placeholder={`Ask Mentor Alex a question or respond for Step ${currentStage}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isThinking}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!inputText.trim() || isThinking}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
