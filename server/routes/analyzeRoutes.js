const express = require('express');
const router = express.Router();

const upload = require('../utils/upload');
const { uploadResume, getHistory } = require('../controllers/analyzeController');

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/history', getHistory);

module.exports = router;