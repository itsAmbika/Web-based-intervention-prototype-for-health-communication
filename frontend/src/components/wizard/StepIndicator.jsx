import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { number: 1, label: 'Disease' },
  { number: 2, label: 'Stage' },
  { number: 3, label: 'Questions' },
  { number: 4, label: 'Priority' },
  { number: 5, label: 'Custom' },
  { number: 6, label: 'Review' },
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-between relative max-w-3xl mx-auto px-4">
        {/* Progress Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 z-0">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : isActive
                    ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/30 scale-110'
                    : 'bg-surface-800 border-white/10 text-gray-500'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-colors duration-300 hidden sm:block ${
                  isActive ? 'text-primary-400 font-bold' : isCompleted ? 'text-emerald-400' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
