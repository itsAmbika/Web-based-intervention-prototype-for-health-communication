const express = require('express');
const router = express.Router();
const { getDiseases, getCategories, getQuestions } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/diseases', protect, getDiseases);
router.get('/categories', protect, getCategories);
router.get('/questions', protect, getQuestions);

module.exports = router;
