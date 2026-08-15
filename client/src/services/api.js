import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const analyzeResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);

  const response = await api.post('/analyze/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/analyze/history');
  return response.data;
};

export default api;