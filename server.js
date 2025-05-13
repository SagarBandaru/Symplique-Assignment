
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Message = require('./models/Message');

dotenv.config();

const app = express();
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI);


mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});



app.post('/api/save-message', async (req, res) => {
  const { date, time, message } = req.body;

  if (!date || !time || !message) {
    return res.status(400).json({ error: 'date, time, and message are required' });
  }

  try {
    const newMessage = new Message({ date, time, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
