import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, HelpCircle } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CustomQuestionsForm = ({ customQuestions, onAddCustom, onRemoveCustom, onUpdateCustom }) => {
  const [inputText, setInputText] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputText || !inputText.trim()) return;
    onAddCustom(inputText);
    setInputText('');
  };

  const startEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const handleSaveEdit = (index) => {
    if (!editText || !editText.trim()) return;
    onUpdateCustom(index, editText.trim());
    setEditingIndex(-1);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditText('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl font-black text-white">Add Custom Questions</h2>
        <p className="text-gray-400 text-sm">
          Have any unique doubts or specific queries that weren't in the list? Write them below to append them to your final print list.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAdd} className="glass p-5 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            className="input"
            placeholder="Type your question here (e.g. Can I travel during chemotherapy?)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={!inputText.trim()} className="sm:w-auto h-full flex-shrink-0">
          <Plus className="w-5 h-5" /> Add Question
        </Button>
      </form>

      {/* List of Custom Questions */}
      <div className="space-y-3">
        {customQuestions.map((q, index) => {
          const isEditing = editingIndex === index;

          return (
            <div key={index} className="glass p-4 flex items-center justify-between gap-4">
              <div className="flex-1 flex gap-3 items-start min-w-0">
                <HelpCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                {isEditing ? (
                  <input
                    type="text"
                    className="input py-1 text-sm bg-surface-700 w-full"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <p className="text-sm text-gray-200 font-medium leading-relaxed break-words w-full">
                    {q}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                      aria-label="Save changes"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                      aria-label="Cancel edit"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(index, q)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      aria-label="Edit question"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveCustom(index)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                      aria-label="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {customQuestions.length === 0 && (
          <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-gray-500">
            No custom questions added yet. You can skip this step if you don't have any.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomQuestionsForm;
