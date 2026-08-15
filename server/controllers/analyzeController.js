const extractText = require('../utils/pdfExtractor');
const analyzeWithAI = require('../utils/aiAnalyzer');
const Analysis = require('../models/Analysis');

// Upload resume and analyze
exports.uploadResume = async (req, res) => {
  try {
    // Check file upload
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    const filePath = req.file.path;
    const { jobDescription } = req.body;

    // Extract text from PDF
    const resumeText = await extractText(filePath);

    // Analyze with AI
    const aiResponse = await analyzeWithAI(resumeText, jobDescription);

    // Clean AI response and parse JSON
    const cleaned = aiResponse
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const analysis = JSON.parse(cleaned);

    // Save analysis to MongoDB
    const savedAnalysis = await Analysis.create({
      resumeText,
      jobDescription,
      atsScore: analysis.atsScore,
      matchedSkills: analysis.matchedSkills,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions
    });

    // Send response
    res.json({
      message: 'Resume analyzed successfully',
      analysis: savedAnalysis
    });

  } catch (error) {
    console.error('ANALYZE ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get analysis history
exports.getHistory = async (req, res) => {
  try {
    const history = await Analysis.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error('HISTORY ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
};