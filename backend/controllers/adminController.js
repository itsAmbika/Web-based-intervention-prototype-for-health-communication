const { z } = require('zod');
const Question = require('../models/Question');
const User = require('../models/User');
const Consultation = require('../models/Consultation');

const questionCreateSchema = z.object({
  text: z.string().min(5, 'Question text too short'),
  diseaseId: z.string().min(1, 'diseaseId is required'),
  stage: z.enum(['Diagnosis', 'Treatment', 'Survivorship', 'Palliative']),
  categoryId: z.string().min(1, 'categoryId is required'),
  active: z.boolean().optional().default(true),
  order: z.number().optional().default(0),
});

const questionUpdateSchema = questionCreateSchema.partial();

/**
 * GET /api/admin/questions
 */
const listQuestions = async (req, res, next) => {
  try {
    const { disease, stage, category, active } = req.query;
    const filter = {};
    if (disease) filter.diseaseId = disease;
    if (stage) filter.stage = stage;
    if (category) filter.categoryId = category;
    if (active !== undefined) filter.active = active === 'true';

    const questions = await Question.find(filter).sort({ diseaseId: 1, stage: 1, categoryId: 1, order: 1 });
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/questions/:id
 */
const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/questions
 */
const createQuestion = async (req, res, next) => {
  try {
    const data = questionCreateSchema.parse(req.body);
    const question = await Question.create(data);
    res.status(201).json(question);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/questions/:id
 */
const updateQuestion = async (req, res, next) => {
  try {
    const data = questionUpdateSchema.parse(req.body);
    const question = await Question.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/questions/:id  (soft delete — set active:false)
 */
const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/users
 */
const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash -googleId').sort({ createdAt: -1 }).lean();

    // Add consultation counts
    const counts = await Consultation.aggregate([
      { $group: { _id: '$userId', count: { $sum: 1 } } },
    ]);
    const countMap = {};
    counts.forEach((c) => (countMap[c._id.toString()] = c.count));

    const result = users.map((u) => ({
      ...u,
      consultationCount: countMap[u._id.toString()] || 0,
    }));

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/users/:id  (toggle active/role)
 */
const updateUser = async (req, res, next) => {
  try {
    const { active, role } = req.body;
    const updateData = {};
    if (typeof active === 'boolean') updateData.active = active;
    if (role && ['patient', 'admin'].includes(role)) updateData.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select(
      '-passwordHash -googleId'
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/stats
 */
const getStats = async (req, res, next) => {
  try {
    const [userCount, consultationCount, questionCount] = await Promise.all([
      User.countDocuments({ role: 'patient' }),
      Consultation.countDocuments(),
      Question.countDocuments({ active: true }),
    ]);
    res.json({ userCount, consultationCount, questionCount });
  } catch (err) {
    next(err);
  }
};

module.exports = { listQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion, listUsers, updateUser, getStats };
