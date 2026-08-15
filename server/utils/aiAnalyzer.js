const axios = require('axios');

async function analyzeWithAI(resumeText, jobDescription) {
  const prompt = `
You are an ATS resume analyzer.

Return ONLY valid JSON. Do not use markdown, do not use triple backticks.

Format:
{
  "atsScore": number,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "suggestions": ["suggestion1", "suggestion2"]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.1
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = analyzeWithAI;