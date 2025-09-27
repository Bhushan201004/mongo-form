const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // load .env

const app = express();

// Parse JSON bodies
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Lead schema
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  workType: { 
    type: String, 
    enum: ['Home', 'Shop', 'Industrial', 'Sign Board', 'Building Paint'], 
    required: true 
  },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// POST /lead
app.post('/lead', async (req, res) => {
  try {
    const { name, mobile, address, workType, message } = req.body;
    if (!name || !mobile || !address || !workType) {
      return res.status(400).json({ error: 'कृपया सर्व आवश्यक माहिती भरा' });
    }

    const lead = new Lead({ name, mobile, address, workType, message });
    await lead.save();
    res.status(201).json({ 
      success: true, 
      message: 'धन्यवाद 🙏 आम्ही 1-2 दिवसात call करू!' 
    });
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

// For all other routes, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server (Render uses PORT env variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
