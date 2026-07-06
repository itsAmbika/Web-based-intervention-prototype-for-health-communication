const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    diseaseId: { type: String, ref: 'Disease', required: true },
    stage: {
      type: String,
      required: true,
      enum: ['Diagnosis', 'Treatment', 'Survivorship', 'Palliative'],
    },
    categoryId: { type: String, ref: 'Category', required: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, // display order within category
  },
  { timestamps: true }
);

questionSchema.index({ diseaseId: 1, stage: 1 });
questionSchema.index({ diseaseId: 1, stage: 1, categoryId: 1 });
questionSchema.index({ active: 1 });

module.exports = mongoose.model('Question', questionSchema);
