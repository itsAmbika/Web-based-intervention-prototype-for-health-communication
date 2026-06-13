const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true },
  demographics: {
    name: { type: String },
    gender: { type: String },
    age: { type: Number },
    languageKnown: { type: String },
    educationBackground: { type: String },
    occupationBackground: { type: String },
    primaryFamilyCaregiver: { type: String },
    relationshipWithPrimaryCaregiver: { type: String }
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

module.exports = mongoose.model('Patient', patientSchema);
