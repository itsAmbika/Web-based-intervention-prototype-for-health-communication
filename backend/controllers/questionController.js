const Question = require('../models/Question');
const Disease = require('../models/Disease');
const Category = require('../models/Category');

/**
 * GET /api/diseases
 * Returns all active diseases
 */
const getDiseases = async (req, res, next) => {
  try {
    const diseases = await Disease.find({ active: true }).sort({ name: 1 });
    res.json(diseases);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/categories
 * Returns all categories ordered by their order field
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/questions?disease=BR&stage=Diagnosis
 * Returns active questions for a specific disease+stage, grouped by category
 */
const getQuestions = async (req, res, next) => {
  try {
    const { disease, stage } = req.query;

    if (!disease || !stage) {
      return res.status(400).json({ error: 'disease and stage query params are required' });
    }

    const validStages = ['Diagnosis', 'Treatment', 'Survivorship', 'Palliative'];
    if (!validStages.includes(stage)) {
      return res.status(400).json({ error: `stage must be one of: ${validStages.join(', ')}` });
    }

    const questions = await Question.find({ diseaseId: disease, stage, active: true })
      .sort({ categoryId: 1, order: 1 })
      .lean();

    // Fetch categories to attach names
    const categories = await Category.find().sort({ order: 1 }).lean();
    const categoryMap = {};
    categories.forEach((c) => (categoryMap[c._id] = c));

    // Group questions by category
    const grouped = {};
    questions.forEach((q) => {
      const cat = categoryMap[q.categoryId];
      if (!cat) return;
      if (!grouped[q.categoryId]) {
        grouped[q.categoryId] = {
          categoryId: cat._id,
          categoryName: cat.name,
          order: cat.order,
          questions: [],
        };
      }
      grouped[q.categoryId].questions.push({
        _id: q._id,
        text: q.text,
        categoryId: q.categoryId,
      });
    });

    const result = Object.values(grouped).sort((a, b) => a.order - b.order);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getDiseases, getCategories, getQuestions };
