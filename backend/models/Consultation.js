const mongoose = require('mongoose');

// Snapshot of a single question at time of consultation creation
const selectedQuestionSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    text: { type: String, required: true }, // snapshot — immutable
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true }, // snapshot
    isTop: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const consultationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    diseaseId: { type: String, ref: 'Disease', required: true },
    diseaseName: { type: String, required: true }, // snapshot
    stage: {
      type: String,
      required: true,
      enum: ['Diagnosis', 'Treatment', 'Survivorship', 'Palliative'],
    },
    questions: [selectedQuestionSchema],
    customQuestions: [{ type: String }],
    pdfGeneratedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

consultationSchema.index({ userId: 1, createdAt: -1 }); // for timeline queries

module.exports = mongoose.model('Consultation', consultationSchema);
