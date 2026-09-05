const express = require('express');
const router = express.Router();
const { registerPatient, getPatientQuestions } = require('../controllers/patientController');

// POST /api/patient/register
router.post('/patient/register', registerPatient);

// GET /api/questions/patient
router.get('/questions/patient', getPatientQuestions);

module.exports = router;
