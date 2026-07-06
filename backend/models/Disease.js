const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // short code e.g. "BR"
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    icon: { type: String, default: '' }, // emoji or icon name
    color: { type: String, default: '#6366f1' }, // for UI card
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Disease', diseaseSchema);
