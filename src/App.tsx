import { useState, useEffect } from 'react';
import type { ProjectBlueprint, StageId, ChatMessage } from './types/mentor';
import { INITIAL_BLUEPRINT, generateGeminiMentorResponse, generateOfflineMentorResponse } from './services/mentorEngine';
import { Header } from './components/Header';
import { StageTracker } from './components/StageTracker';
import { MentorChat } from './components/MentorChat';
import { ProjectCanvas } from './components/ProjectCanvas';
import { ExportModal } from './components/ExportModal';
import confetti from 'canvas-confetti';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'mentor',
    text: `👋 Welcome to **Hackathon Mentor AI**! I'm Coach Alex, your personal hackathon guide.\n\nOver the course of your hackathon, I'll guide you step-by-step through:\n1. **Problem Selection & Definition**\n2. **Problem Reasoning & Validation**\n3. **Solution Design & Tech Stack**\n4. **Feasibility & MVP Slicing**\n5. **Pitch Prep & Judge Q&A Defense**\n\n*(Note: I won't write actual project code for you, but I will help you think, reason, architect, and prepare a winning pitch!)*\n\nLet's start with **Step 1**: What domain is your hackathon team interested in? (e.g. Healthcare, Education, Agriculture, Finance, AI, Cybersecurity, etc.)`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    options: ['Healthcare', 'Education', 'Agriculture', 'Finance', 'Environment', 'AI', 'Cybersecurity', 'Others'],
    stageId: 1,
    isQuestion: true
  }
];

export function App() {
  const [blueprint, setBlueprint] = useState<ProjectBlueprint>(() => {
    const saved = localStorage.getItem('hackathon_blueprint');
    return saved ? JSON.parse(saved) : INITIAL_BLUEPRINT;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('hackathon_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });

  const [currentStage, setCurrentStage] = useState<StageId>(blueprint.currentStage || 1);
  const [completedStages, setCompletedStages] = useState<StageId[]>(blueprint.completedStages || []);
  const [canAdvance, setCanAdvance] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('hackathon_blueprint', JSON.stringify(blueprint));
  }, [blueprint]);

  useEffect(() => {
    localStorage.setItem('hackathon_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (apiKey) localStorage.setItem('gemini_api_key', apiKey);
    else localStorage.removeItem('gemini_api_key');
  }, [apiKey]);

  const triggerStageCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stageId: currentStage
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      let result;
      if (apiKey) {
        result = await generateGeminiMentorResponse({
          userMessage: text,
          blueprint,
          stageId: currentStage,
          apiKey
        });
      } else {
        // Small delay for natural mentor interaction
        await new Promise(r => setTimeout(r, 600));
        result = generateOfflineMentorResponse(text, blueprint, currentStage);
      }

      setMessages(prev => [...prev, result.mentorMessage]);

      if (Object.keys(result.updatedBlueprint).length > 0) {
        setBlueprint(prev => ({
          ...prev,
          ...result.updatedBlueprint
        }));
      }

      if (result.canAdvanceStage) {
        setCanAdvance(true);
      }
    } catch (err) {
      console.error('Error generating mentor response:', err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleAdvanceStage = () => {
    if (currentStage >= 5) return;

    const nextStage = (currentStage + 1) as StageId;
    const updatedCompleted = Array.from(new Set([...completedStages, currentStage]));

    setCompletedStages(updatedCompleted);
    setCurrentStage(nextStage);
    setCanAdvance(false);
    triggerStageCelebration();

    setBlueprint(prev => ({
      ...prev,
      currentStage: nextStage,
      completedStages: updatedCompleted
    }));

    // System transition message
    const transitionMsg: ChatMessage = {
      id: `sys-${Date.now()}`,
      sender: 'mentor',
      text: `🎉 **Welcome to Step ${nextStage}!**\n\nAwesome work completing Step ${currentStage}. Let's focus on the objectives for Step ${nextStage}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stageId: nextStage
    };

    setMessages(prev => [...prev, transitionMsg]);

    // Automatically trigger initial mentor prompt for next stage
    setTimeout(() => {
      const offlineNext = generateOfflineMentorResponse('continue to next step', blueprint, nextStage);
      setMessages(prev => [...prev, offlineNext.mentorMessage]);
      if (Object.keys(offlineNext.updatedBlueprint).length > 0) {
        setBlueprint(prev => ({ ...prev, ...offlineNext.updatedBlueprint }));
      }
    }, 400);
  };

  const handleSelectStage = (stageId: StageId) => {
    setCurrentStage(stageId);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your hackathon project blueprint?')) {
      localStorage.removeItem('hackathon_blueprint');
      localStorage.removeItem('hackathon_messages');
      setBlueprint(INITIAL_BLUEPRINT);
      setMessages(INITIAL_MESSAGES);
      setCurrentStage(1);
      setCompletedStages([]);
      setCanAdvance(false);
    }
  };

  const handleUpdateBlueprint = (updated: Partial<ProjectBlueprint>) => {
    setBlueprint(prev => ({ ...prev, ...updated }));
  };

  return (
    <div className="app-container">
      <Header
        apiKey={apiKey}
        onSaveApiKey={setApiKey}
        onOpenExport={() => setShowExportModal(true)}
        onResetBlueprint={handleReset}
      />

      <StageTracker
        currentStage={currentStage}
        completedStages={completedStages}
        onSelectStage={handleSelectStage}
      />

      <main className="app-main">
        {/* Left Column: Interactive Chat Interface */}
        <MentorChat
          messages={messages.filter(m => m.stageId === currentStage || m.stageId === 1)}
          currentStage={currentStage}
          onSendMessage={handleSendMessage}
          onAdvanceStage={handleAdvanceStage}
          canAdvance={canAdvance}
          isThinking={isThinking}
        />

        {/* Right Column: Live Project Blueprint Canvas */}
        <ProjectCanvas
          blueprint={blueprint}
          onUpdateBlueprint={handleUpdateBlueprint}
        />
      </main>

      {showExportModal && (
        <ExportModal
          blueprint={blueprint}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}

export default App;
