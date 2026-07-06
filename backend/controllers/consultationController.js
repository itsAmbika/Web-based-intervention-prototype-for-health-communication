const { z } = require('zod');
const consultationService = require('../services/consultationService');
const { generateConsultationPdf } = require('../services/pdfService');
const Consultation = require('../models/Consultation');

const createSchema = z.object({
  diseaseId: z.string().min(1, 'diseaseId is required'),
  stage: z.enum(['Diagnosis', 'Treatment', 'Survivorship', 'Palliative']),
  selectedQuestions: z
    .array(
      z.object({
        questionId: z.string(),
        isTop: z.boolean().optional(),
      })
    )
    .min(1, 'Select at least one question'),
  customQuestions: z.array(z.string()).optional(),
});

/**
 * POST /api/consultations
 */
const create = async (req, res, next) => {
  try {
    const data = createSchema.parse(req.body);
    const topCount = (data.selectedQuestions || []).filter((q) => q.isTop).length;
    if (topCount > 3) {
      return res.status(400).json({ error: 'Maximum 3 top questions allowed' });
    }

    const consultation = await consultationService.createConsultation({
      userId: req.user.id,
      ...data,
    });

    res.status(201).json({
      consultationId: consultation._id,
      createdAt: consultation.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/consultations
 */
const list = async (req, res, next) => {
  try {
    const consultations = await consultationService.getConsultations(req.user.id);
    // Return summaries
    const summaries = consultations.map((c) => ({
      _id: c._id,
      diseaseId: c.diseaseId,
      diseaseName: c.diseaseName,
      stage: c.stage,
      createdAt: c.createdAt,
      questionCount: c.questions.length,
      topCount: c.questions.filter((q) => q.isTop).length,
      customCount: c.customQuestions.length,
    }));
    res.json(summaries);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/consultations/:id
 */
const getOne = async (req, res, next) => {
  try {
    const consultation = await consultationService.getConsultation(req.params.id, req.user.id);
    res.json(consultation);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/consultations/:id/pdf
 */
const downloadPdf = async (req, res, next) => {
  try {
    const consultation = await consultationService.getConsultation(req.params.id, req.user.id);
    const pdfBuffer = await generateConsultationPdf(consultation);

    const dateStr = new Date(consultation.createdAt).toISOString().slice(0, 10);
    const filename = `questions_${consultation.diseaseName.replace(/\s+/g, '_')}_${dateStr}.pdf`;

    // Update pdfGeneratedAt
    await Consultation.findByIdAndUpdate(req.params.id, { pdfGeneratedAt: new Date() });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, list, getOne, downloadPdf };
