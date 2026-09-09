import React from 'react';
import type { StageId } from '../types/mentor';
import { STAGES_INFO } from '../data/mentorKnowledge';
import { Target, BrainCircuit, Layers, ShieldAlert, Award, Check } from 'lucide-react';

interface StageTrackerProps {
  currentStage: StageId;
  completedStages: StageId[];
  onSelectStage: (stageId: StageId) => void;
}

const getStageIcon = (iconName: string, size = 16) => {
  switch (iconName) {
    case 'Target': return <Target size={size} />;
    case 'BrainCircuit': return <BrainCircuit size={size} />;
    case 'Layers': return <Layers size={size} />;
    case 'ShieldAlert': return <ShieldAlert size={size} />;
    case 'Award': return <Award size={size} />;
    default: return <Target size={size} />;
  }
};

export const StageTracker: React.FC<StageTrackerProps> = ({
  currentStage,
  completedStages,
  onSelectStage
}) => {
  return (
    <div className="stage-stepper">
      {STAGES_INFO.map((stage) => {
        const isActive = currentStage === stage.id;
        const isCompleted = completedStages.includes(stage.id);

        return (
          <div
            key={stage.id}
            className={`stage-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            onClick={() => onSelectStage(stage.id)}
          >
            <div className="stage-number">
              {isCompleted ? <Check size={14} /> : getStageIcon(stage.iconName, 14)}
            </div>
            <div className="stage-label">
              <span className="stage-title">Step {stage.id}: {stage.title}</span>
              <span className="stage-subtitle">{stage.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
