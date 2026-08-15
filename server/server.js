const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/analyze", analyzeRoutes);
app.get('/', (req, res) => {
  res.send('AI Resume Analyzer API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));