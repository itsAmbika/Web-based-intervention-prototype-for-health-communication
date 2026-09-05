const Patient = require('../models/Patient');
const Question = require('../models/Question');
const generateId = require('../utils/generateId');

/**
 * Register a new patient.
 * POST /api/patient/register
 */
async function registerPatient(req, res) {
  try {
    const { demographics } = req.body;

    if (!demographics || !demographics.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const patientId = await generateId('patient');

    const patient = new Patient({
      ...req.body,
      patientId
    });

    await patient.save();

    return res.status(201).json({ success: true, patientId });
  } catch (err) {
    console.error('registerPatient error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get all active questions for patients.
 * GET /api/questions/patient
 */
async function getPatientQuestions(req, res) {
  try {
    const questions = await Question.find(
      { isActive: true, targetAudience: { $in: ['patient', 'both'] } },
      '_id questionText category'
    );

    return res.status(200).json(questions);
  } catch (err) {
    console.error('getPatientQuestions error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { registerPatient, getPatientQuestions };
