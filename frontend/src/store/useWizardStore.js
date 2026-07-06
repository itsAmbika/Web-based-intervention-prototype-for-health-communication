import { create } from 'zustand';

export const useWizardStore = create((set, get) => ({
  // State
  step: 1,
  selectedDisease: null, // { _id, name, icon, color }
  selectedStage: null,   // string: 'Diagnosis' | 'Treatment' | 'Survivorship' | 'Palliative'
  selectedQuestions: [], // [{ _id, text, categoryId, categoryName }]
  topQuestions: [],      // [questionId strings] — max 3
  customQuestions: [],   // [string]

  // Step navigation
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 6) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),

  // Disease & Stage
  setDisease: (disease) => set({ selectedDisease: disease, selectedStage: null, selectedQuestions: [], topQuestions: [] }),
  setStage: (stage) => set({ selectedStage: stage, selectedQuestions: [], topQuestions: [] }),

  // Questions
  toggleQuestion: (question) => {
    const { selectedQuestions, topQuestions } = get();
    const exists = selectedQuestions.find((q) => q._id === question._id);
    if (exists) {
      // Remove from selected and top
      set({
        selectedQuestions: selectedQuestions.filter((q) => q._id !== question._id),
        topQuestions: topQuestions.filter((id) => id !== question._id),
      });
    } else {
      set({ selectedQuestions: [...selectedQuestions, question] });
    }
  },

  isQuestionSelected: (id) => get().selectedQuestions.some((q) => q._id === id),

  // Top questions (max 3)
  toggleTop: (questionId) => {
    const { topQuestions } = get();
    if (topQuestions.includes(questionId)) {
      set({ topQuestions: topQuestions.filter((id) => id !== questionId) });
    } else {
      if (topQuestions.length >= 3) return false; // enforce limit
      set({ topQuestions: [...topQuestions, questionId] });
    }
    return true;
  },

  isTop: (questionId) => get().topQuestions.includes(questionId),

  // Custom questions
  addCustom: (text) => {
    if (!text || !text.trim()) return;
    set((s) => ({ customQuestions: [...s.customQuestions, text.trim()] }));
  },
  removeCustom: (index) => {
    set((s) => ({ customQuestions: s.customQuestions.filter((_, i) => i !== index) }));
  },
  updateCustom: (index, text) => {
    set((s) => {
      const updated = [...s.customQuestions];
      updated[index] = text;
      return { customQuestions: updated };
    });
  },

  // Reset entire wizard
  reset: () => set({
    step: 1,
    selectedDisease: null,
    selectedStage: null,
    selectedQuestions: [],
    topQuestions: [],
    customQuestions: [],
  }),
}));
