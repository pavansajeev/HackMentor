export type DomainCategory = 
  | 'Healthcare'
  | 'Education'
  | 'Agriculture'
  | 'Finance'
  | 'Environment'
  | 'AI'
  | 'Cybersecurity'
  | 'Others';

export type ProblemSource = 'Organizers' | 'Self-created';

export type StageId = 1 | 2 | 3 | 4 | 5;

export interface StageInfo {
  id: StageId;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'mentor' | 'user' | 'system';
  text: string;
  timestamp: string;
  options?: string[];
  stageId: StageId;
  isQuestion?: boolean;
}

export interface TechStackConfig {
  backend: string;
  frontend: string;
  database: string;
  aiModel: string;
  cloud: string;
  auth: string;
}

export interface PitchDeck {
  openingHook: string;
  problem: string;
  solution: string;
  whyExistingFails: string;
  keyFeatures: string;
  techUsed: string;
  marketPotential: string;
  futureScope: string;
  closingStatement: string;
}

export interface JudgeQA {
  question: string;
  recommendedAnswer: string;
  proTip: string;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface InnovationScore {
  innovation: number; // 1-10
  feasibility: number;
  scalability: number;
  socialImpact: number;
  technicalComplexity: number;
  overallScore: number;
  mentorFeedback: string[];
}

export interface TeamRole {
  title: string;
  assignedTo?: string;
  keyDeliverables: string[];
  recommendedSkills: string[];
}

export interface ProjectBlueprint {
  projectTitle: string;
  domain: DomainCategory | '';
  problemSource: ProblemSource | '';
  targetUser: string;
  whyProblemExists: string;
  isRealWorld: boolean;
  beneficiaries: string;
  existingSolutions: string;
  limitations: string;
  
  // Step 2 reasoning
  problemStatement: string;
  rootCause: string;
  expectedOutcome: string;
  uvp: string; // Unique Value Proposition
  
  // Step 3 Architecture
  techStack: TechStackConfig;
  architectureOverview: string;
  modules: string[];
  databaseSchema: string;
  apiSuggestions: string[];
  userFlowSteps: string[];
  
  // Step 4 Feasibility & MVP
  hackathonDurationHours: number;
  essentialFeatures: string[];
  optionalFeatures: string[];
  risks: string[];
  assumptions: string[];
  mvpChecklist: string[];

  // Step 5 Pitch
  pitchScript: PitchDeck;
  elevatorPitch: string;
  judgeQA: JudgeQA[];

  // Extra features
  swot: SWOTAnalysis;
  innovationScore: InnovationScore;
  teamRoles: TeamRole[];
  
  // Progress
  currentStage: StageId;
  completedStages: StageId[];
}
