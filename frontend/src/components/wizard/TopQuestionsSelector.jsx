import React from 'react';
import { Star, AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import toast from 'react-hot-toast';

const TopQuestionsSelector = ({ selectedQuestions, topQuestions, onToggleTop }) => {
  const handleToggle = (id) => {
    const isCurrentlyTop = topQuestions.includes(id);
    if (!isCurrentlyTop && topQuestions.length >= 3) {
      toast.error('You can only select up to 3 top priority questions.');
      return;
    }
    onToggleTop(id);
  };

  if (!selectedQuestions || selectedQuestions.length === 0) {
    return (
      <div className="text-center py-16 space-y-4 max-w-md mx-auto">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Questions Selected</h2>
        <p className="text-gray-400 text-sm">
          You must select at least one question in the previous step to set priorities. Please go back and select questions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl font-black text-white">Prioritize Top Questions</h2>
        <p className="text-gray-400 text-sm">
          Choose up to <span className="text-amber-400 font-bold">3 questions</span> that are your highest priority. These will be highlighted first on your PDF so your doctor sees them first.
        </p>
      </div>

      {/* Selected Indicator */}
      <div className="flex items-center justify-between p-4 glass max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <Star className={`w-5 h-5 ${topQuestions.length > 0 ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}`} />
          <span className="text-sm text-gray-300">Priority Selection Limit:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-white">{topQuestions.length}</span>
          <span className="text-gray-500 text-sm">/</span>
          <span className="text-sm font-medium text-gray-400">3 Selected</span>
        </div>
      </div>

      {/* List of selected questions */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {selectedQuestions.map((question) => {
          const isStarred = topQuestions.includes(question._id);

          return (
            <div
              key={question._id}
              onClick={() => handleToggle(question._id)}
              className={`flex gap-4 p-4 rounded-xl items-center border cursor-pointer transition-all duration-200 select-none ${
                isStarred
                  ? 'border-amber-500/40 bg-amber-500/5 shadow-md shadow-amber-500/5'
                  : 'border-white/5 bg-surface-800/80 hover:bg-surface-800'
              }`}
            >
              {/* Star Indicator Button */}
              <button
                type="button"
                className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                  isStarred
                    ? 'text-amber-400 fill-amber-400 bg-amber-500/10'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
                aria-label={isStarred ? 'Unstar question' : 'Star question'}
              >
                <Star className="w-5 h-5" />
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 font-medium leading-relaxed">
                  {question.text}
                </p>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mt-1">
                  {question.categoryName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopQuestionsSelector;
