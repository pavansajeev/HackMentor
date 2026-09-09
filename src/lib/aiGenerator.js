// Smart generator for synthesizing a complete Hackathon Project Suite from user input

export function generateProjectFromPrompt(userTopic, trackName = 'Generative AI', hackathonName = 'Global Hackathon 2026', teamName = 'Team HackPilots') {
  const topic = userTopic.trim() || 'AI Smart Assistant';
  
  const cleanTitle = topic.charAt(0).toUpperCase() + topic.slice(1);
  const title = cleanTitle.toLowerCase().includes('ai') || cleanTitle.toLowerCase().includes('app') ? cleanTitle : `${cleanTitle} AI Engine`;

  const problemStatement = `Target users in ${topic} experience critical manual overhead, high error rates, slow response times, and lack real-time predictive intelligence.`;
  const solution = `An automated AI-powered copilot designed specifically for ${topic}. It streamlines data ingestion, automates decision workflows in real-time, and delivers actionable insights instantly.`;
  const novelty = `Proprietary contextual lightweight AI pipeline trained specifically for ${topic} with sub-200ms latency and verifiable audit logs.`;
  const targetAudience = `Enterprise operational teams, specialized domain experts, and high-growth digital businesses in ${topic}.`;

  // Tailor tech stack to topic
  let techStack = ["React 18", "Node.js / Express", "FastAPI AI Engine", "PostgreSQL", "Google Gemini API"];
  if (topic.toLowerCase().includes('vision') || topic.toLowerCase().includes('scan') || topic.toLowerCase().includes('image') || topic.toLowerCase().includes('health')) {
    techStack = ["React 18 + Vite", "Python OpenCV / PyTorch", "FastAPI", "Google Gemini 1.5 Flash Vision", "Supabase DB"];
  } else if (topic.toLowerCase().includes('finance') || topic.toLowerCase().includes('fraud') || topic.toLowerCase().includes('crypto')) {
    techStack = ["Next.js 14", "Go Fiber Backend", "PostgreSQL + Prisma", "Redis Cache", "OpenAI GPT-4o"];
  } else if (topic.toLowerCase().includes('green') || topic.toLowerCase().includes('carbon') || topic.toLowerCase().includes('energy')) {
    techStack = ["React 18", "Node.js / Express", "Google Gemini API", "TimescaleDB", "Tailwind CSS"];
  }

  const architectureNodes = [
    { id: 'fe', name: `${techStack[0]} Interface`, category: 'Frontend', status: 'ready' },
    { id: 'be', name: `${techStack[1]} REST Gateway`, category: 'Backend', status: 'ready' },
    { id: 'ai', name: `${techStack[4]} Processing Core`, category: 'AI/ML', status: 'ready' },
    { id: 'db', name: `${techStack[3]} Storage`, category: 'Database', status: 'ready' }
  ];

  const kanbanTasks = [
    { id: '1', title: `Setup ${techStack[4]} API integration endpoint`, status: 'done', priority: 'High', phase: 'Core MVP' },
    { id: '2', title: `Build interactive demo UI dashboard for ${title}`, status: 'in-progress', priority: 'High', phase: 'Demo UI' },
    { id: '3', title: `Prepare pre-seeded offline sample dataset for ${topic}`, status: 'todo', priority: 'Medium', phase: 'Data' },
    { id: '4', title: 'Export PDF / Markdown summary report widget', status: 'todo', priority: 'Low', phase: 'Bonus' }
  ];

  const slides = [
    { id: 1, title: 'The Problem Hook', content: `Users dealing with ${topic} suffer daily from manual bottlenecks, leading to non-compliance, high costs, and poor decision turnaround.` },
    { id: 2, title: `Our Solution: ${title}`, content: solution },
    { id: 3, title: 'Secret Sauce & Novelty', content: novelty },
    { id: 4, title: 'Technical Architecture', content: `Built using ${techStack.join(', ')}. Engineered for sub-200ms latency and high scalability.` },
    { id: 5, title: 'Feasibility & ROI Impact', content: `Cuts operational delay by 75% and saves end-users hours of manual labor per week.` },
    { id: 6, title: 'Market Opportunity', content: `Addressing a rapidly growing enterprise market with immediate monetization potential.` },
    { id: 7, title: 'Team & Hackathon Roadmap', content: `Built by ${teamName} for ${hackathonName}. Next step: live pilot deployment.` }
  ];

  const elevatorScript = `🚀 [0:00 - 0:20 HOOK]\n"Did you know target users in ${topic} face constant delays because ${problemStatement}?\n\n💡 [0:20 - 0:50 SOLUTION & DEMO]\nMeet ${title}! ${solution} In our live demo today, you will see how easy it is to solve this problem.\n\n⚙️ [0:50 - 1:15 ARCHITECTURE]\nOur secret sauce is ${novelty}, powered by ${techStack.slice(0, 3).join(', ')}.\n\n🏆 [1:15 - 1:30 CLOSING]\nWe cut operational delay by 75%. ${teamName} is ready to launch ${title}!"`;

  return {
    title,
    hackathonName,
    teamName,
    track: trackName,
    problemStatement,
    solution,
    novelty,
    targetAudience,
    techStack,
    architectureNodes,
    kanbanTasks,
    slides,
    elevatorScript,
    judgeScores: {
      techScore: 90,
      businessScore: 92,
      pitchScore: 94,
      qnaFeedback: []
    }
  };
}
