const express = require('express');
const router = express.Router();
const {
  listQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion,
  listUsers, updateUser, getStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.use(protect, requireRole('admin'));

router.get('/stats', getStats);

router.get('/questions', listQuestions);
router.get('/questions/:id', getQuestion);
router.post('/questions', createQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

router.get('/users', listUsers);
router.patch('/users/:id', updateUser);

module.exports = router;
