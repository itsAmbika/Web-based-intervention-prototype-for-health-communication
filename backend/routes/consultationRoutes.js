const express = require('express');
const router = express.Router();
const { create, list, getOne, downloadPdf } = require('../controllers/consultationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', create);
router.get('/', list);
router.get('/:id', getOne);
router.get('/:id/pdf', downloadPdf);

module.exports = router;
