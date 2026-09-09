import type { ProjectBlueprint, StageId, ChatMessage, PitchDeck, JudgeQA } from '../types/mentor';

export const INITIAL_BLUEPRINT: ProjectBlueprint = {
  projectTitle: '',
  domain: '',
  problemSource: '',
  targetUser: '',
  whyProblemExists: '',
  isRealWorld: true,
  beneficiaries: '',
  existingSolutions: '',
  limitations: '',
  
  problemStatement: '',
  rootCause: '',
  expectedOutcome: '',
  uvp: '',
  
  techStack: {
    backend: 'Node.js (Express)',
    frontend: 'React (Vite)',
    database: 'MongoDB',
    aiModel: 'Gemini API',
    cloud: 'Vercel',
    auth: 'Firebase Auth'
  },
  architectureOverview: '',
  modules: [],
  databaseSchema: '',
  apiSuggestions: [],
  userFlowSteps: [],
  
  hackathonDurationHours: 24,
  essentialFeatures: [],
  optionalFeatures: [],
  risks: [],
  assumptions: [],
  mvpChecklist: [],

  pitchScript: {
    openingHook: '',
    problem: '',
    solution: '',
    whyExistingFails: '',
    keyFeatures: '',
    techUsed: '',
    marketPotential: '',
    futureScope: '',
    closingStatement: ''
  },
  elevatorPitch: '',
  judgeQA: [],

  swot: {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  },
  innovationScore: {
    innovation: 7,
    feasibility: 8,
    scalability: 7,
    socialImpact: 8,
    technicalComplexity: 7,
    overallScore: 7.4,
    mentorFeedback: ['Solid practical idea for a hackathon timeframe!']
  },
  teamRoles: [
    { title: 'Backend Lead', keyDeliverables: ['REST API endpoints', 'Database ORM'], recommendedSkills: ['Node.js / Express'] },
    { title: 'Frontend Lead', keyDeliverables: ['UI Layout', 'State flow'], recommendedSkills: ['React / Vite'] },
    { title: 'AI Specialist', keyDeliverables: ['Prompt engineering', 'API integration'], recommendedSkills: ['Gemini / OpenAI'] },
    { title: 'Pitch Lead', keyDeliverables: ['Slide deck', 'Judge Q&A prep'], recommendedSkills: ['Storytelling'] }
  ],

  currentStage: 1,
  completedStages: []
};

// System prompt enforcing Mentor Persona & Rules
export const MENTOR_SYSTEM_INSTRUCTION = `
You are an experienced, encouraging, and sharp Hackathon Mentor AI.
Your goal is to guide students step-by-step from problem selection to final pitch.

STRICT RULES:
1. NEVER generate project code (no JavaScript, Python, C++, HTML, or full code files).
2. Explain technical concepts in simple, accessible language.
3. Guide users by asking thoughtful, step-by-step questions instead of dumping solutions.
4. Do not advance to the next step until the current stage criteria are answered.
5. Keep answers practical, hackathon-friendly, and encourage MVPs over overly complex feature sets.
6. Maintain an inspiring, supportive, mentor-like tone.
`;

export interface GenerateMentorResponseParams {
  userMessage: string;
  blueprint: ProjectBlueprint;
  stageId: StageId;
  apiKey?: string;
}

export interface MentorEngineResult {
  mentorMessage: ChatMessage;
  updatedBlueprint: Partial<ProjectBlueprint>;
  canAdvanceStage?: boolean;
}

/**
 * Offline Mentor Heuristic Engine that guarantees instant, intelligent responses
 * without requiring external network tokens, while maintaining the mentor persona.
 */
export function generateOfflineMentorResponse(
  userText: string,
  blueprint: ProjectBlueprint,
  stageId: StageId
): MentorEngineResult {
  const textLower = userText.toLowerCase();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let replyText = '';
  const options: string[] = [];
  const updatedBlueprint: Partial<ProjectBlueprint> = {};
  let canAdvance = false;

  switch (stageId) {
    case 1: {
      // Step 1: Problem Selection & Definition
      if (!blueprint.domain && (
        textLower.includes('health') || textLower.includes('edu') || textLower.includes('agri') || 
        textLower.includes('fin') || textLower.includes('env') || textLower.includes('ai') || 
        textLower.includes('cyber') || textLower.includes('other')
      )) {
        let domain: any = 'AI';
        if (textLower.includes('health')) domain = 'Healthcare';
        else if (textLower.includes('edu')) domain = 'Education';
        else if (textLower.includes('agri')) domain = 'Agriculture';
        else if (textLower.includes('fin')) domain = 'Finance';
        else if (textLower.includes('env')) domain = 'Environment';
        else if (textLower.includes('cyber')) domain = 'Cybersecurity';
        else if (textLower.includes('other')) domain = 'Others';

        updatedBlueprint.domain = domain;
        replyText = `Awesome choice! **${domain}** is a high-impact domain for hackathons. 🎯\n\nIs your problem statement **Given by Organizers** or **Self-created**?`;
        options.push('Given by Organizers', 'Self-created');
      } else if (!blueprint.problemSource && (textLower.includes('given') || textLower.includes('organizer') || textLower.includes('self'))) {
        const source = textLower.includes('given') || textLower.includes('organizer') ? 'Organizers' : 'Self-created';
        updatedBlueprint.problemSource = source;

        replyText = source === 'Self-created'
          ? `Great! Building your own idea gives you total creative freedom. 🚀\n\nLet's unpack your problem:\n1. **Who faces this problem?** (Target Users)\n2. **Why does this problem exist?**\n3. **What existing solutions fail to do?**`
          : `Got it! Working on an organizer problem statement gives clear benchmark targets. 🎯\n\nBriefly describe:\n1. **Who faces this problem?**\n2. **Why does this problem exist?**\n3. **What existing solutions fail to do?**`;
      } else {
        // Extract target user and problem essence
        updatedBlueprint.targetUser = blueprint.targetUser || userText.slice(0, 100);
        updatedBlueprint.problemStatement = userText;
        updatedBlueprint.whyProblemExists = "Lack of accessible automated tools and fragmented workflows.";
        updatedBlueprint.existingSolutions = "Manual processes and legacy apps.";
        updatedBlueprint.limitations = "Slow response times, high cost, and poor user UX.";

        replyText = `💡 **Stage 1 Problem Summary**:\n- **Domain**: ${updatedBlueprint.domain || blueprint.domain || 'Technology'}\n- **Source**: ${updatedBlueprint.problemSource || blueprint.problemSource || 'Self-created'}\n- **Target Audience**: Students, professionals, and domain users\n- **Core Pain Point**: ${userText.slice(0, 120)}...\n\nDoes this capture your problem statement accurately? If so, let's move to **Step 2: Problem Reasoning & Validation**!`;
        options.push('Proceed to Step 2 Reasoning', 'Refine Problem Statement');
        canAdvance = true;
      }
      break;
    }

    case 2: {
      // Step 2: Problem Reasoning & Validation
      updatedBlueprint.rootCause = "Root Cause: Disconnect between user needs and available slow tools.";
      updatedBlueprint.expectedOutcome = "Outcome: 10x faster execution, automated insights, and reduced friction.";
      updatedBlueprint.uvp = `Unique Value Proposition: An intuitive AI assistant tailored for ${blueprint.domain || 'domain'} workflows without setup overhead.`;
      
      // Update SWOT & Innovation Scores dynamically
      updatedBlueprint.swot = {
        strengths: ["Fast MVP scope", "High user relevance", "Modern lightweight tech stack"],
        weaknesses: ["Short hackathon timeline", "Relies on API connectivity"],
        opportunities: ["High judge appeal", "Scalable to broader audience post-hackathon"],
        threats: ["Rate limits during live presentation", "Scope creep"]
      };

      updatedBlueprint.innovationScore = {
        innovation: 8.5,
        feasibility: 9.0,
        scalability: 8.0,
        socialImpact: 8.5,
        technicalComplexity: 7.5,
        overallScore: 8.3,
        mentorFeedback: [
          "Strong validation framing!",
          "High feasibility score for 24-48h execution.",
          "Keep the UVP front and center during your pitch."
        ]
      };

      replyText = `🔍 **Step 2: Problem Reasoning Analysis**:\n\n` +
        `• **Root Cause**: ${updatedBlueprint.rootCause}\n` +
        `• **Expected Outcome**: ${updatedBlueprint.expectedOutcome}\n` +
        `• **Unique Value Proposition (UVP)**: *"${updatedBlueprint.uvp}"*\n\n` +
        `Awesome reasoning! Now let's tackle **Step 3: Solution Architecture Design**. Ready to structure your backend, frontend, database, and AI components?`;

      options.push('Proceed to Step 3 Architecture', 'Adjust Reasoning');
      canAdvance = true;
      break;
    }

    case 3: {
      // Step 3: Solution Design
      const currentStack = blueprint.techStack;
      updatedBlueprint.architectureOverview = `Client-Server Architecture: Responsive Web Frontend communicating via REST/JSON APIs to a lightweight Backend Service, with AI processing handled via Gemini/OpenAI API endpoints and real-time database persistence.`;
      updatedBlueprint.modules = [
        "1. Auth & User Onboarding Module",
        "2. Core AI Mentor Engine / Data Processing Service",
        "3. Live Dashboard & Interactive Canvas Component",
        "4. Export & Presentation Generator"
      ];
      updatedBlueprint.databaseSchema = `Users {\n  id: String,\n  email: String,\n  created_at: Timestamp\n}\n\nProjects {\n  id: String,\n  user_id: String,\n  title: String,\n  domain: String,\n  blueprint_json: Text\n}`;
      updatedBlueprint.apiSuggestions = [
        "POST /api/analyze-problem -> Evaluates user inputs",
        "POST /api/generate-architecture -> Returns stack & module mapping",
        "GET /api/project-summary -> Retrieves compiled project deliverables"
      ];
      updatedBlueprint.userFlowSteps = [
        "User selects Domain & inputs Problem Statement",
        "AI Mentor guides through Reasoning & Architecture choices",
        "Feasibility check filters MVP scope",
        "Final Pitch Deck & Deliverables exported for judges"
      ];

      replyText = `🛠️ **Step 3: Solution Architecture Generated!**\n\n` +
        `• **Recommended Stack**: Frontend: **${currentStack.frontend}** | Backend: **${currentStack.backend}** | Database: **${currentStack.database}** | AI: **${currentStack.aiModel}**\n` +
        `• **Architecture**: Modular Client-Server decoupled setup for maximum build speed.\n` +
        `• **Modules**: Auth, AI Orchestrator, Live Canvas, & Deliverable Exporter.\n\n` +
        `*(Check out the live System Architecture tab in your Project Canvas to customize components!)*\n\nReady for **Step 4: Feasibility Check & MVP Scope**?`;

      options.push('Proceed to Step 4 Feasibility', 'Customize Tech Stack');
      canAdvance = true;
      break;
    }

    case 4: {
      // Step 4: Feasibility & MVP Check
      updatedBlueprint.essentialFeatures = [
        "Interactive Problem & Goal Input",
        "Real-time Architecture & Stack Recommender",
        "Pitch Script & Judge Q&A Generator",
        "Exportable Deliverable Document"
      ];
      updatedBlueprint.optionalFeatures = [
        "Social sharing link",
        "Multi-language mentor voice",
        "Custom PDF theme styling"
      ];
      updatedBlueprint.risks = [
        "Time crunch during integration (Mitigation: use mockup fallback data)",
        "API latency spike (Mitigation: async loading states with skeleton loaders)"
      ];
      updatedBlueprint.assumptions = [
        "Judges value clear problem framing and MVP execution over raw code volume.",
        "Stable internet connection during demo presentation."
      ];
      updatedBlueprint.mvpChecklist = [
        "✅ Clean landing & setup flow",
        "✅ Working core feature demonstration",
        "✅ Zero breaking console errors",
        "✅ Polished UI visual styling",
        "✅ Practiced pitch narrative"
      ];

      replyText = `⏱️ **Step 4: Feasibility & MVP Checklist Ready**:\n\n` +
        `For a hackathon build, focus 90% of your effort on **Essential Features**:\n` +
        `1. ${updatedBlueprint.essentialFeatures.slice(0, 3).join('\n2. ')}\n\n` +
        `⚠️ **Key Risk**: Scope creep! Postpone optional polish until your core user flow is bulletproof.\n\n` +
        `Ready to prepare your winning pitch in **Step 5**?`;

      options.push('Proceed to Step 5 Pitch Prep', 'Refine MVP Checklist');
      canAdvance = true;
      break;
    }

    case 5: {
      // Step 5: Pitch Preparation
      const pitchScript: PitchDeck = {
        openingHook: `Imagine solving a problem that impacts millions of users every single day—without adding friction or complexity.`,
        problem: `Currently, users in the ${blueprint.domain || 'target'} domain suffer from fragmented tools and inefficient manual steps: ${blueprint.problemStatement || 'high complexity and lack of guidance'}.`,
        solution: `Introducing ${blueprint.projectTitle || 'Our Hackathon Project'}: an AI-powered mentor system that delivers instant clarity and architectural guidance.`,
        whyExistingFails: `Existing platforms are either too generic or demand steep learning curves, leaving teams stuck in analysis paralysis.`,
        keyFeatures: `1. Interactive guided reasoning\n2. Instant MVP tech stack architecting\n3. Judge defense & pitch generator`,
        techUsed: `Built with ${blueprint.techStack.frontend}, ${blueprint.techStack.backend}, and powered by ${blueprint.techStack.aiModel}.`,
        marketPotential: `Huge adoption potential across hackathon participants, student developers, and innovation labs.`,
        futureScope: `Post-hackathon: adding collaborative team sync, RAG document search, and enterprise innovation metrics.`,
        closingStatement: `We are building the future of guided innovation. Thank you, and we welcome your questions!`
      };

      const judgeQA: JudgeQA[] = [
        {
          question: "Why this problem?",
          recommendedAnswer: `We selected ${blueprint.domain || 'this problem'} because it represents a clear, urgent pain point where modern AI can eliminate hours of trial and error.`,
          proTip: "Focus on user impact and validated urgency."
        },
        {
          question: "Why your tech stack approach?",
          recommendedAnswer: `We combined ${blueprint.techStack.frontend} for instant UI responsiveness with ${blueprint.techStack.aiModel} for structured reasoning to ensure maximum speed within hackathon constraints.`,
          proTip: "Highlight development velocity and modularity."
        },
        {
          question: "What makes your project unique?",
          recommendedAnswer: `Unlike static documentation tools, our AI mentor acts interactively—asking probing questions and helping teams think through root causes instead of just giving copy-paste code.`,
          proTip: "Emphasize your Unique Value Proposition (UVP)."
        }
      ];

      updatedBlueprint.pitchScript = pitchScript;
      updatedBlueprint.elevatorPitch = `"${pitchScript.openingHook} ${pitchScript.solution} Built with ${blueprint.techStack.frontend} and ${blueprint.techStack.aiModel}, it transforms complex ideas into presentation-ready hackathon MVPs in record time."`;
      updatedBlueprint.judgeQA = judgeQA;
      updatedBlueprint.completedStages = [1, 2, 3, 4, 5];

      replyText = `🏆 **CONGRATULATIONS! Your Hackathon Project Blueprint is Complete!** 🎉\n\n` +
        `• **3-5 Min Pitch Script**: Prepared & formatted in your Pitch Deck tab.\n` +
        `• **30-Sec Elevator Pitch**: Ready for quick elevator introductions.\n` +
        `• **Judge Defense Bank**: Top 3 critical questions with key talking points ready.\n` +
        `• **Deliverables Brief**: You can now export your complete project brief as Markdown or Print PDF!\n\n` +
        `Best of luck presenting to the judges! You've got this! 🚀`;

      options.push('Export Complete Deliverables (Markdown)', 'Review Pitch Deck', 'Review Innovation Score');
      canAdvance = true;
      break;
    }
  }

  return {
    mentorMessage: {
      id: `msg-${Date.now()}`,
      sender: 'mentor',
      text: replyText,
      timestamp,
      options: options.length > 0 ? options : undefined,
      stageId,
      isQuestion: true
    },
    updatedBlueprint,
    canAdvanceStage: canAdvance
  };
}

/**
 * Live Gemini API Stream Integration (optional when user enters their API key)
 */
export async function generateGeminiMentorResponse(
  params: GenerateMentorResponseParams
): Promise<MentorEngineResult> {
  const { userMessage, blueprint, stageId, apiKey } = params;

  if (!apiKey) {
    return generateOfflineMentorResponse(userMessage, blueprint, stageId);
  }

  try {
    const prompt = `
System Context:
${MENTOR_SYSTEM_INSTRUCTION}

Current Hackathon Stage: Stage ${stageId}
Project Blueprint Context: ${JSON.stringify({
      domain: blueprint.domain,
      problemSource: blueprint.problemSource,
      targetUser: blueprint.targetUser,
      problemStatement: blueprint.problemStatement,
      techStack: blueprint.techStack
    })}

User Student Input: "${userMessage}"

Respond as the Hackathon Mentor AI following Stage ${stageId} objectives.
REMINDER: DO NOT GENERATE CODE. Ask guiding questions, evaluate answers, and suggest hackathon strategy.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!replyText) {
      return generateOfflineMentorResponse(userMessage, blueprint, stageId);
    }

    const offlineResult = generateOfflineMentorResponse(userMessage, blueprint, stageId);
    
    return {
      mentorMessage: {
        id: `msg-gemini-${Date.now()}`,
        sender: 'mentor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: offlineResult.mentorMessage.options,
        stageId,
        isQuestion: true
      },
      updatedBlueprint: offlineResult.updatedBlueprint,
      canAdvanceStage: offlineResult.canAdvanceStage
    };
  } catch (err) {
    console.warn('Gemini API call failed, falling back to offline mentor engine:', err);
    return generateOfflineMentorResponse(userMessage, blueprint, stageId);
  }
}
