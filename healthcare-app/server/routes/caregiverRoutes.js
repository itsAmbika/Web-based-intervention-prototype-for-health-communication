const express = require('express');
const router = express.Router();
const { registerCaregiver, getCaregiverQuestions } = require('../controllers/caregiverController');

// POST /api/caregiver/register
router.post('/caregiver/register', registerCaregiver);

// GET /api/questions/caregiver
router.get('/questions/caregiver', getCaregiverQuestions);

module.exports = router;
