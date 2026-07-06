import React from 'react';
import { Star, FileText, Download, Save, AlertCircle, HelpCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const ReviewStep = ({
  selectedDisease,
  selectedStage,
  selectedQuestions,
  topQuestions,
  customQuestions,
  onSave,
  saving,
}) => {
  // Group non-top questions by category
  const groupedQuestions = {};
  const priorityQuestions = [];

  selectedQuestions.forEach((q) => {
    const isTop = topQuestions.includes(q._id);
    if (isTop) {
      priorityQuestions.push(q);
    } else {
      if (!groupedQuestions[q.categoryName]) {
        groupedQuestions[q.categoryName] = [];
      }
      groupedQuestions[q.categoryName].push(q);
    }
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl font-black text-white">Review & Save Consultation</h2>
        <p className="text-gray-400 text-sm">
          Review your finalized question list. Click "Save Consultation" to save the session to your history. You can download the PDF anytime afterwards.
        </p>
      </div>

      {/* Main Document Preview Sheet */}
      <div className="glass p-6 sm:p-10 border border-white/10 relative overflow-hidden bg-surface-850/80 shadow-2xl">
        {/* Subtle page lines style */}
        <div className="absolute left-0 top-0 right-0 h-2 bg-gradient-to-r from-primary-500 to-accent-500" />

        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Consultation Preparation Sheet</h1>
            <div className="flex flex-wrap gap-2 items-center mt-3">
              <Badge variant="primary" className="text-xs py-1">
                🎗️ {selectedDisease?.name}
              </Badge>
              <Badge variant="warning" className="text-xs py-1">
                📅 {selectedStage}
              </Badge>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Generated Date</span>
            <span className="text-sm font-semibold text-white">
              {new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Top Priority Questions */}
        {priorityQuestions.length > 0 && (
          <div className="mb-8 p-5 bg-amber-500/5 border border-amber-500/25 rounded-2xl">
            <h3 className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider mb-4">
              <Star className="w-5 h-5 fill-amber-400" /> Top Priority Questions (Max 3)
            </h3>
            <ol className="space-y-3">
              {priorityQuestions.map((q, idx) => (
                <li key={q._id} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-white font-semibold leading-relaxed">{q.text}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Categorized Questions */}
        <div className="space-y-6">
          {Object.entries(groupedQuestions).map(([catName, qs]) => (
            <div key={catName} className="space-y-3">
              <h4 className="text-xs font-black uppercase text-primary-400 tracking-wider border-b border-white/5 pb-1">
                {catName}
              </h4>
              <ul className="space-y-2">
                {qs.map((q) => (
                  <li key={q._id} className="flex gap-2.5 items-start text-sm text-gray-300 leading-relaxed">
                    <span className="text-primary-500 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500" />
                    <p className="font-medium">{q.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Custom Questions */}
          {customQuestions.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black uppercase text-accent-400 tracking-wider border-b border-white/5 pb-1">
                Custom Questions
              </h4>
              <ul className="space-y-2">
                {customQuestions.map((q, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-sm text-gray-300 leading-relaxed">
                    <HelpCircle className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                    <p className="font-medium">{q}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedQuestions.length === 0 && customQuestions.length === 0 && (
            <div className="text-center py-10 space-y-3 text-gray-500">
              <AlertCircle className="w-10 h-10 mx-auto text-gray-600" />
              <p>No questions selected. Please go back to select questions.</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 max-w-4xl mx-auto">
        <Button onClick={onSave} loading={saving} className="btn-lg flex items-center justify-center gap-2">
          <Save className="w-5 h-5" /> Save Consultation
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
