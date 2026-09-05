const Patient = require('../models/Patient');
const Caregiver = require('../models/Caregiver');
const Question = require('../models/Question');

/**
 * Get all registered patients (excludes _id and __v).
 * GET /api/admin/patients
 */
async function getAllPatients(req, res) {
  try {
    const patients = await Patient.find().select('-_id -__v');
    return res.status(200).json(patients);
  } catch (err) {
    console.error('getAllPatients error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get all registered caregivers (excludes _id and __v).
 * GET /api/admin/caregivers
 */
async function getAllCaregivers(req, res) {
  try {
    const caregivers = await Caregiver.find().select('-_id -__v');
    return res.status(200).json(caregivers);
  } catch (err) {
    console.error('getAllCaregivers error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get all questions regardless of isActive status.
 * GET /api/admin/questions
 */
async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (err) {
    console.error('getAllQuestions error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Add a new question.
 * POST /api/admin/questions
 */
async function addQuestion(req, res) {
  try {
    const question = new Question(req.body);
    await question.save();
    return res.status(201).json(question);
  } catch (err) {
    console.error('addQuestion error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Update an existing question's text, category, and targetAudience.
 * PUT /api/admin/questions/:id
 */
async function updateQuestion(req, res) {
  try {
    const { questionText, category, targetAudience } = req.body;

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { questionText, category, targetAudience },
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    return res.status(200).json(question);
  } catch (err) {
    console.error('updateQuestion error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Toggle the isActive boolean on a question.
 * PATCH /api/admin/questions/:id
 */
async function toggleQuestion(req, res) {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    question.isActive = !question.isActive;
    await question.save();

    return res.status(200).json(question);
  } catch (err) {
    console.error('toggleQuestion error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllPatients,
  getAllCaregivers,
  getAllQuestions,
  addQuestion,
  updateQuestion,
  toggleQuestion
};
