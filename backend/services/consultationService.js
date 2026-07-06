const Consultation = require('../models/Consultation');
const Question = require('../models/Question');
const Disease = require('../models/Disease');
const Category = require('../models/Category');

/**
 * Create a new consultation (saves question snapshots)
 */
const createConsultation = async ({ userId, diseaseId, stage, selectedQuestions, customQuestions }) => {
  // Fetch disease name for snapshot
  const disease = await Disease.findById(diseaseId);
  if (!disease) {
    const err = new Error('Disease not found');
    err.status = 404;
    throw err;
  }

  // Fetch all referenced question docs
  const questionIds = selectedQuestions.map((q) => q.questionId);
  const questionDocs = await Question.find({ _id: { $in: questionIds } }).lean();
  const questionMap = {};
  questionDocs.forEach((q) => (questionMap[q._id.toString()] = q));

  // Fetch categories for snapshot names
  const categoryIds = [...new Set(questionDocs.map((q) => q.categoryId))];
  const categories = await Category.find({ _id: { $in: categoryIds } }).lean();
  const categoryMap = {};
  categories.forEach((c) => (categoryMap[c._id] = c));

  // Build immutable snapshot array
  const snapshotQuestions = selectedQuestions.map((sel, idx) => {
    const qDoc = questionMap[sel.questionId.toString()];
    if (!qDoc) throw new Error(`Question ${sel.questionId} not found`);
    const cat = categoryMap[qDoc.categoryId];
    return {
      questionId: qDoc._id,
      text: qDoc.text, // snapshot
      categoryId: qDoc.categoryId,
      categoryName: cat ? cat.name : qDoc.categoryId, // snapshot
      isTop: !!sel.isTop,
      order: idx,
    };
  });

  const consultation = new Consultation({
    userId,
    diseaseId,
    diseaseName: disease.name,
    stage,
    questions: snapshotQuestions,
    customQuestions: (customQuestions || []).filter((q) => q && q.trim()),
  });

  await consultation.save();
  return consultation;
};

/**
 * Get all consultations for a user (summary list)
 */
const getConsultations = async (userId) => {
  return Consultation.find({ userId })
    .sort({ createdAt: -1 })
    .select('_id diseaseId diseaseName stage createdAt questions customQuestions')
    .lean();
};

/**
 * Get a single consultation by ID (full detail)
 */
const getConsultation = async (consultationId, userId) => {
  const consultation = await Consultation.findOne({ _id: consultationId, userId }).lean();
  if (!consultation) {
    const err = new Error('Consultation not found');
    err.status = 404;
    throw err;
  }
  return consultation;
};

module.exports = { createConsultation, getConsultations, getConsultation };
