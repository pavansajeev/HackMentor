import React, { useState } from 'react';
import { UserCheck, ShieldAlert, Award, MessageSquare, Send, Sparkles, RefreshCw, CheckCircle2, ArrowRight, Star } from 'lucide-react';

const JUDGE_PERSONAS = [
  {
    id: 'dr_tech',
    name: 'Dr. Tech (Senior Systems Architect)',
    icon: '👨‍💻',
    color: '#06b6d4',
    badge: 'Technical Judge',
    bio: 'Scrutinizes backend latency, database scalability, AI model accuracy, and edge-case security risks.'
  },
  {
    id: 'venture_vik',
    name: 'Venture Vik (Managing Director, VC Fund)',
    icon: '💼',
    color: '#10b981',
    badge: 'Business Judge',
    bio: 'Pushes on business viability, customer acquisition strategy, unit economics, and competitive moat.'
  },
  {
    id: 'design_dave',
    name: 'Design Dave (VP of Product & UX)',
    icon: '🎨',
    color: '#8b5cf6',
    badge: 'UX / Product Judge',
    bio: 'Evaluates user friction, interface clarity, accessibility, and the magic moment of your demo.'
  }
];

const SAMPLE_QUESTIONS = {
  dr_tech: [
    "How does your AI carbon prediction engine handle third-party API rate limits during high-traffic fleet dispatch?",
    "If your database connection drops during live judging, what fallback offline mechanism is implemented in your architecture?",
    "What is your inference latency when running route optimization across 1,000 simultaneous vehicles?"
  ],
  venture_vik: [
    "Who is your initial paying customer persona, and what is your estimated ROI payback period for logistics fleets?",
    "Existing supply chain software like SAP and Salesforce have sustainability plugins. What is your defensible USP against them?",
    "How do you plan to monetize this post-hackathon — subscription SaaS, usage-per-transit, or enterprise licensing?"
  ],
  design_dave: [
    "What is the single most critical 'magic moment' the user sees within their first 10 seconds on your web app?",
    "How accessible is your dashboard for field logistics managers operating on low-bandwidth mobile devices?"
  ]
};

export default function JudgeSimulator({ projectState, setProjectState, onNext }) {
  const [selectedJudge, setSelectedJudge] = useState('dr_tech');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const title = projectState.title || "Your Hackathon Project";
  const track = projectState.track || "AI & Software";
  const stack = projectState.techStack?.join(', ') || "React & Node.js";

  const dynamicQuestions = {
    dr_tech: [
      `How does ${title} handle API rate limits and backend latency when scaling across high concurrent user traffic?`,
      `Your stack uses ${stack}. If a core database connection or external model endpoint fails during live judging, what fallback mechanism is active?`,
      `What performance optimizations have you implemented to keep response latency under 200ms for ${title}?`
    ],
    venture_vik: [
      `Who is the primary paying customer persona for ${title}, and what is your estimated payback period?`,
      `Established enterprise competitors already exist in ${track}. What is ${title}'s secret sauce / USP that prevents easy copying?`,
      `How do you plan to scale and monetize ${title} after winning this hackathon?`
    ],
    design_dave: [
      `What is the single most critical 'magic moment' a judge will see in ${title} within the first 10 seconds of your demo?`,
      `How accessible and friction-free is your onboarding flow for non-technical users testing ${title}?`
    ]
  };

  const judge = JUDGE_PERSONAS.find(j => j.id === selectedJudge);
  const questions = dynamicQuestions[selectedJudge] || dynamicQuestions.dr_tech;
  const currentQuestion = questions[questionIndex % questions.length];

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const textLower = userAnswer.toLowerCase();
      let score = 82;
      let strengths = "Good initial outline of your team's approach.";
      let gaps = "Try to include specific metrics, technical fallback mechanisms, or ROI timeline to sound bulletproof.";

      if (textLower.includes('cache') || textLower.includes('fallback') || textLower.includes('offline') || textLower.includes('latency') || textLower.includes('rate limit')) {
        score += 8;
        strengths += " Strong technical depth mentioning resilience and latency optimization.";
      }
      if (textLower.includes('roi') || textLower.includes('customer') || textLower.includes('cost') || textLower.includes('revenue') || textLower.includes('market')) {
        score += 7;
        strengths += " Excellent business awareness highlighting financial ROI and customer value.";
      }
      if (userAnswer.length > 120) {
        score += 5;
      }
      
      score = Math.min(98, score);
      const idealModel = `For "${currentQuestion}", an ideal pitch response for ${title} links high-performance architecture (${stack}) directly to clear user impact.`;

      const res = {
        question: currentQuestion,
        answer: userAnswer,
        score,
        judgeName: judge.name,
        strengths,
        gaps,
        idealModel
      };

      setEvaluationResult(res);
      setIsAnalyzing(false);

      // Update project judge score in state
      setProjectState(prev => ({
        ...prev,
        judgeScores: {
          ...prev.judgeScores,
          qnaFeedback: [...(prev.judgeScores?.qnaFeedback || []), res]
        }
      }));
    }, 1200);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Banner */}
      <div className="glass-card glow-rose" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'rgba(244, 63, 94, 0.2)',
            color: '#fb7185',
            border: '1px solid rgba(244, 63, 94, 0.3)'
          }}>
            <UserCheck size={28} />
          </div>
          <div>
            <span className="badge badge-rose">Stage 5 of 6</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>AI Judge Simulator & Q&A Battle Ground</h2>
          </div>
        </div>
        <p style={{ color: '#94a3b8', maxWidth: '750px', fontSize: '1rem', lineHeight: '1.6' }}>
          Test your team's answers against tough AI judge personas before stepping on stage. Practice handling challenging technical, business, and product questions under pressure.
        </p>
      </div>

      {/* Select Judge Persona */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {JUDGE_PERSONAS.map((j) => (
          <div
            key={j.id}
            onClick={() => {
              setSelectedJudge(j.id);
              setEvaluationResult(null);
              setUserAnswer('');
            }}
            style={{
              padding: '20px',
              borderRadius: '14px',
              background: selectedJudge === j.id ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.6)',
              border: selectedJudge === j.id ? `2px solid ${j.color}` : '1px solid rgba(255, 255, 255, 0.08)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: selectedJudge === j.id ? `0 0 20px -5px ${j.color}` : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.8rem' }}>{j.icon}</span>
              <span className="badge badge-purple" style={{ borderColor: j.color, color: j.color }}>{j.badge}</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 6px', color: '#f8fafc' }}>{j.name}</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>{j.bio}</p>
          </div>
        ))}
      </div>

      {/* Q&A Battle Card */}
      <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={20} color={judge.color} />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Judge Question from {judge.name}</h3>
          </div>
          <button
            onClick={() => {
              setQuestionIndex(prev => prev + 1);
              setEvaluationResult(null);
              setUserAnswer('');
            }}
            className="btn btn-ghost"
            style={{ fontSize: '0.82rem', color: '#a78bfa' }}
          >
            <RefreshCw size={14} /> Next Question
          </button>
        </div>

        {/* Question Box */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderLeft: `4px solid ${judge.color}`,
          padding: '20px',
          borderRadius: '0 12px 12px 0',
          fontSize: '1.1rem',
          fontWeight: 500,
          color: '#f8fafc',
          lineHeight: '1.6'
        }}>
          "{currentQuestion}"
        </div>

        {/* Answer Input */}
        <div>
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
            Your Team's Response (Type or speak your answer)
          </label>
          <textarea
            className="textarea-field"
            rows={4}
            placeholder="e.g. We utilize a multi-tier local LRU cache in Node.js combined with fallback mock payloads so that even if the external API rate-limits..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </div>

        <button
          onClick={handleEvaluateAnswer}
          disabled={isAnalyzing || !userAnswer.trim()}
          className="btn btn-cyan glow-cyan"
          style={{ padding: '14px', fontSize: '1rem' }}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              {judge.name} is evaluating your answer...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Submit Response for AI Judge Feedback
            </>
          )}
        </button>

        {/* Feedback Scorecard Result */}
        {evaluationResult && (
          <div className="animate-fade-in" style={{
            background: 'rgba(7, 10, 20, 0.95)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={22} color="#34d399" />
                <h4 style={{ fontSize: '1.1rem', margin: 0, color: '#f8fafc' }}>Judge Evaluation & Score</h4>
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#34d399',
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '4px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                {evaluationResult.score} / 100
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <strong style={{ fontSize: '0.85rem', color: '#34d399', textTransform: 'uppercase' }}>What you said well</strong>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '4px' }}>{evaluationResult.strengths}</p>
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <strong style={{ fontSize: '0.85rem', color: '#fbbf24', textTransform: 'uppercase' }}>Key Judge Feedback / Gaps</strong>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '4px' }}>{evaluationResult.gaps}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
          <button
            onClick={onNext}
            className="btn btn-emerald"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            Complete Practice & View Final Scorecard
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
