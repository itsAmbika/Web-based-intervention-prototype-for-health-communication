const Caregiver = require('../models/Caregiver');
const Question = require('../models/Question');
const generateId = require('../utils/generateId');

/**
 * Register a new caregiver.
 * POST /api/caregiver/register
 */
async function registerCaregiver(req, res) {
  try {
    const { demographics } = req.body;

    if (!demographics || !demographics.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const caregiverId = await generateId('caregiver');

    const caregiver = new Caregiver({
      ...req.body,
      caregiverId
    });

    await caregiver.save();

    return res.status(201).json({ success: true, caregiverId });
  } catch (err) {
    console.error('registerCaregiver error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get all active questions for caregivers.
 * GET /api/questions/caregiver
 */
async function getCaregiverQuestions(req, res) {
  try {
    const questions = await Question.find(
      { isActive: true, targetAudience: { $in: ['caregiver', 'both'] } },
      '_id questionText category'
    );

    return res.status(200).json(questions);
  } catch (err) {
    console.error('getCaregiverQuestions error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { registerCaregiver, getCaregiverQuestions };
