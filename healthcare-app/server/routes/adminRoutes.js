const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getAllCaregivers,
  getAllQuestions,
  addQuestion,
  updateQuestion,
  toggleQuestion
} = require('../controllers/adminController');

// GET /api/admin/patients
router.get('/admin/patients', getAllPatients);

// GET /api/admin/caregivers
router.get('/admin/caregivers', getAllCaregivers);

// GET /api/admin/questions
router.get('/admin/questions', getAllQuestions);

// POST /api/admin/questions
router.post('/admin/questions', addQuestion);

// PUT /api/admin/questions/:id
router.put('/admin/questions/:id', updateQuestion);

// PATCH /api/admin/questions/:id
router.patch('/admin/questions/:id', toggleQuestion);

module.exports = router;
