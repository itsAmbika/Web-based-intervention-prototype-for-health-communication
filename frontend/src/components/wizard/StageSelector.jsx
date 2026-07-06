import React from 'react';
import Card from '../ui/Card';
import { Eye, ShieldAlert, Sparkles, Heart } from 'lucide-react';

const stages = [
  {
    id: 'Diagnosis',
    name: 'Diagnosis & Staging',
    desc: 'Understand diagnosis accuracy, confirm tumor staging, and inquire about necessary tests or second opinions.',
    icon: Eye,
    color: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
  },
  {
    id: 'Treatment',
    name: 'Treatment Options',
    desc: 'Discuss chemotherapy, radiation, surgery options, expected schedules, and clinical trial eligibility.',
    icon: ShieldAlert,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    id: 'Survivorship',
    name: 'Survivorship & Follow-up',
    desc: 'Manage recovery, follow-up scan schedules, emotional coping, side effect control, and lifestyle habits.',
    icon: Sparkles,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    id: 'Palliative',
    name: 'Palliative & Comfort Care',
    desc: 'Explore symptom management, long-term pain relief, advanced planning, and maximizing quality of life.',
    icon: Heart,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
  },
];

const StageSelector = ({ selectedStage, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl font-black text-white">Select Current Stage</h2>
        <p className="text-gray-400 text-sm">
          Select the stage that best represents your current journey to customize the question categories shown.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isSelected = selectedStage === stage.id;

          return (
            <Card
              key={stage.id}
              onClick={() => onSelect(stage.id)}
              hover
              className={`flex gap-4 p-6 items-start border text-left transition-all duration-300 ${
                isSelected
                  ? 'border-primary-500 bg-primary-600/10 shadow-lg shadow-primary-500/10'
                  : 'border-white/5 bg-surface-800'
              }`}
            >
              <div className={`p-3 rounded-xl flex-shrink-0 ${stage.bgColor} ${stage.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">{stage.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{stage.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StageSelector;
