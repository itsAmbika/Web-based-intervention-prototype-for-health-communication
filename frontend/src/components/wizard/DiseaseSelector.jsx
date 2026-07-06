import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useDiseases } from '../../api/useQuestions';
import { SkeletonDiseaseGrid } from '../ui/Skeleton';
import Card from '../ui/Card';

const DiseaseSelector = ({ selectedDisease, onSelect }) => {
  const { data: diseases, isLoading, error } = useDiseases();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white">Select Diagnosis</h2>
          <p className="text-gray-400 text-sm">Loading available cancer types...</p>
        </div>
        <SkeletonDiseaseGrid />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load diseases. Please try again.
      </div>
    );
  }

  const filteredDiseases = diseases?.filter((disease) =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl font-black text-white">Select Diagnosis</h2>
        <p className="text-gray-400 text-sm">
          Choose the type of cancer you or your loved one has been diagnosed with to filter relevant questions.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          className="input pl-10"
          placeholder="Search cancer types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid of Diseases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {filteredDiseases.map((disease) => {
          const isSelected = selectedDisease?._id === disease._id;
          return (
            <Card
              key={disease._id}
              onClick={() => onSelect(disease)}
              hover
              className={`flex flex-col items-center text-center p-6 border transition-all duration-300 ${
                isSelected
                  ? 'border-primary-500 bg-primary-600/10 shadow-lg shadow-primary-500/10 scale-102'
                  : 'border-white/5 bg-surface-800'
              }`}
            >
              <span
                className="text-4xl mb-4 p-3 rounded-2xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${disease.color}15` }}
              >
                {disease.icon || '🎗️'}
              </span>
              <h3 className="font-bold text-white mb-2 text-base">{disease.name}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">
                {disease.description || 'View pre-formulated questions for this condition.'}
              </p>
            </Card>
          );
        })}
        {filteredDiseases.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500">
            No cancer types found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseSelector;
