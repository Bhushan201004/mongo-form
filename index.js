const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Lead schema
const leadSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  workType: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Lead = mongoose.model('Lead', leadSchema);

// POST /lead
app.post('/lead', async (req, res) => {
  try {
    const { name, mobile, address, workType, message } = req.body;
    if (!name || !mobile || !address || !workType)
      return res.status(400).json({ error: 'कृपया सर्व आवश्यक माहिती भरा' });

    const lead = new Lead({ name, mobile, address, workType, message });
    await lead.save();
    res.status(201).json({ success: true, message: 'धन्यवाद 🙏 आम्ही 1-2 दिवसात call करू!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /leads
app.get('/leads', async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

// Fallback: serve index.html for any route that doesn't match /lead or /leads
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
