import React, { useState, useEffect } from 'react';
import { useQuestions } from '../../api/useQuestions';
import { SkeletonQuestionList } from '../ui/Skeleton';
import Badge from '../ui/Badge';
import { Check, ClipboardList } from 'lucide-react';

const CategoryTabs = ({ diseaseId, stage, selectedQuestions, onToggleQuestion }) => {
  const { data: groupedCategories, isLoading, error } = useQuestions(diseaseId, stage);
  const [activeTab, setActiveTab] = useState('');

  // Automatically select the first tab when data loads
  useEffect(() => {
    if (groupedCategories && groupedCategories.length > 0 && !activeTab) {
      setActiveTab(groupedCategories[0].categoryId);
    }
  }, [groupedCategories, activeTab]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white">Choose Questions</h2>
          <p className="text-gray-400 text-sm">Loading questions for this stage...</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <SkeletonQuestionList count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load questions. Please check parameters and try again.
      </div>
    );
  }

  if (!groupedCategories || groupedCategories.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No questions found for this cancer type and stage.
      </div>
    );
  }

  const currentCategory = groupedCategories.find((c) => c.categoryId === activeTab) || groupedCategories[0];

  // Helper to count how many questions are selected in a category
  const getSelectedCountForCategory = (catId) => {
    return selectedQuestions.filter((q) => q.categoryId === catId).length;
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl font-black text-white">Choose Questions</h2>
        <p className="text-gray-400 text-sm">
          Select the questions you want to ask your doctor. You can select multiple questions across different categories.
        </p>
      </div>

      {/* Selected summary */}
      <div className="flex items-center justify-between p-4 glass max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary-400" />
          <span className="text-sm text-gray-300">Total Selected Questions:</span>
        </div>
        <Badge variant={selectedQuestions.length > 0 ? 'primary' : 'default'} className="text-sm font-bold px-3 py-1">
          {selectedQuestions.length} selected
        </Badge>
      </div>

      {/* Responsive layout: Tabs on left/top, Questions on right/bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Tab Buttons */}
        <div className="lg:col-span-1 flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 border-b lg:border-b-0 border-white/5">
          {groupedCategories.map((category) => {
            const isTabActive = category.categoryId === activeTab;
            const selectedCount = getSelectedCountForCategory(category.categoryId);

            return (
              <button
                key={category.categoryId}
                onClick={() => setActiveTab(category.categoryId)}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all flex-shrink-0 lg:flex-shrink ${
                  isTabActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-surface-850 hover:bg-surface-800 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="truncate">{category.categoryName}</span>
                {selectedCount > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isTabActive ? 'bg-white text-primary-600' : 'bg-primary-600/20 text-primary-300'
                    }`}
                  >
                    {selectedCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Question Selector List */}
        <div className="lg:col-span-3 space-y-3">
          {currentCategory && (
            <>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 lg:hidden">
                {currentCategory.categoryName}
              </h3>
              <div className="space-y-3">
                {currentCategory.questions.map((question) => {
                  const isChecked = selectedQuestions.some((q) => q._id === question._id);

                  return (
                    <div
                      key={question._id}
                      onClick={() => onToggleQuestion({
                        _id: question._id,
                        text: question.text,
                        categoryId: currentCategory.categoryId,
                        categoryName: currentCategory.categoryName
                      })}
                      className={`flex gap-4 p-4 rounded-xl items-start border cursor-pointer transition-all duration-200 select-none ${
                        isChecked
                          ? 'border-primary-500 bg-primary-600/5 shadow-md shadow-primary-500/5'
                          : 'border-white/5 bg-surface-800/80 hover:bg-surface-800'
                      }`}
                    >
                      {/* Checkbox box */}
                      <div
                        className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border mt-0.5 transition-colors ${
                          isChecked ? 'bg-primary-600 border-primary-500 text-white' : 'border-white/20'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <p className="text-sm text-gray-200 leading-relaxed font-medium">
                        {question.text}
                      </p>
                    </div>
                  );
                })}

                {currentCategory.questions.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No questions available in this category.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
