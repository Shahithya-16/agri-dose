require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./src/config/db').init(); // creates data/agridose.json on first run

const authRoutes = require('./src/routes/authRoutes');
const dosageRoutes = require('./src/routes/dosageRoutes');
const diseaseRoutes = require('./src/routes/diseaseRoutes');
const historyRoutes = require('./src/routes/historyRoutes');
const assistantRoutes = require('./src/routes/assistantRoutes');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AgriDose backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/dosage', dosageRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/assistant', assistantRoutes);

// Fallback error handler (e.g. multer file-type errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ ok: false, error: err.message || 'Something went wrong.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
