const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  caregiverId: { type: String, unique: true },
  demographics: {
    name: { type: String },
    gender: { type: String },
    age: { type: Number },
    languageKnown: { type: String },
    educationBackground: { type: String },
    occupationBackground: { type: String },
    relationshipWithPatient: { type: String }
  },
  medicalInfo: {
    awareOfDiagnosis: { type: Boolean },
    timeSinceDiagnosis: { type: String },
    timeSinceTreatmentStarted: { type: String },
    treatmentType: { type: String },
    consultationType: { type: String }
  },
  selectedQuestions: [{ type: String }],
  customQuestion: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Caregiver', caregiverSchema);
