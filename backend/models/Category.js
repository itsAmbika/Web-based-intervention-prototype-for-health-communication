const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // e.g. "cat_diagnosis"
    name: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    icon: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
