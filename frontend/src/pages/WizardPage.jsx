import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../store/useWizardStore';
import { useCreateConsultation } from '../api/useConsultations';
import PageWrapper from '../components/layout/PageWrapper';
import StepIndicator from '../components/wizard/StepIndicator';
import DiseaseSelector from '../components/wizard/DiseaseSelector';
import StageSelector from '../components/wizard/StageSelector';
import CategoryTabs from '../components/wizard/CategoryTabs';
import TopQuestionsSelector from '../components/wizard/TopQuestionsSelector';
import CustomQuestionsForm from '../components/wizard/CustomQuestionsForm';
import ReviewStep from '../components/wizard/ReviewStep';
import Button from '../components/ui/Button';
import { ArrowLeft, ArrowRight, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';

const WizardPage = () => {
  const navigate = useNavigate();
  const { mutate: createConsultation, isPending: saving } = useCreateConsultation();

  // Wizard state from Zustand
  const {
    step,
    selectedDisease,
    selectedStage,
    selectedQuestions,
    topQuestions,
    customQuestions,
    setStep,
    nextStep,
    prevStep,
    setDisease,
    setStage,
    toggleQuestion,
    toggleTop,
    addCustom,
    removeCustom,
    updateCustom,
    reset,
  } = useWizardStore();

  const handleDiseaseSelect = (disease) => {
    setDisease(disease);
    nextStep();
  };

  const handleStageSelect = (stage) => {
    setStage(stage);
    nextStep();
  };

  const handleSaveConsultation = () => {
    if (selectedQuestions.length === 0) {
      toast.error('Please select at least one question to save.');
      return;
    }

    const payload = {
      diseaseId: selectedDisease._id,
      stage: selectedStage,
      selectedQuestions: selectedQuestions.map((q) => ({
        questionId: q._id,
        isTop: topQuestions.includes(q._id),
      })),
      customQuestions,
    };

    createConsultation(payload, {
      onSuccess: (data) => {
        toast.success('Consultation list saved successfully!');
        reset();
        navigate(`/consultations/${data.consultationId}`);
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || 'Failed to save consultation. Please try again.');
      },
    });
  };

  // Determine if "Next" button should be disabled for the current step
  const isNextDisabled = () => {
    if (step === 1 && !selectedDisease) return true;
    if (step === 2 && !selectedStage) return true;
    if (step === 3 && selectedQuestions.length === 0) return true;
    return false;
  };

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Step Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Create Consultation List</h1>
            <p className="text-gray-400 text-sm">Empowering patient doctor conversation</p>
          </div>
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={step} />

        {/* Wizard Step Render */}
        <div className="py-6 min-h-[400px]">
          {step === 1 && (
            <DiseaseSelector
              selectedDisease={selectedDisease}
              onSelect={handleDiseaseSelect}
            />
          )}

          {step === 2 && (
            <StageSelector
              selectedStage={selectedStage}
              onSelect={handleStageSelect}
            />
          )}

          {step === 3 && (
            <CategoryTabs
              diseaseId={selectedDisease?._id}
              stage={selectedStage}
              selectedQuestions={selectedQuestions}
              onToggleQuestion={toggleQuestion}
            />
          )}

          {step === 4 && (
            <TopQuestionsSelector
              selectedQuestions={selectedQuestions}
              topQuestions={topQuestions}
              onToggleTop={toggleTop}
            />
          )}

          {step === 5 && (
            <CustomQuestionsForm
              customQuestions={customQuestions}
              onAddCustom={addCustom}
              onRemoveCustom={removeCustom}
              onUpdateCustom={updateCustom}
            />
          )}

          {step === 6 && (
            <ReviewStep
              selectedDisease={selectedDisease}
              selectedStage={selectedStage}
              selectedQuestions={selectedQuestions}
              topQuestions={topQuestions}
              customQuestions={customQuestions}
              onSave={handleSaveConsultation}
              saving={saving}
            />
          )}
        </div>

        {/* Navigation Buttons (not rendered on step 1 & 2 since selection moves forward, or step 6 which has custom save footer) */}
        {step > 2 && step < 6 && (
          <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-6 max-w-4xl mx-auto">
            <Button variant="secondary" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Step {step} of 6
            </span>

            <Button onClick={nextStep} disabled={isNextDisabled()}>
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Special case: back button on step 2 */}
        {step === 2 && (
          <div className="flex justify-start border-t border-white/5 pt-6 mt-6 max-w-4xl mx-auto">
            <Button variant="secondary" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default WizardPage;
