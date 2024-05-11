const express = require('express');
const mongoose = require('mongoose');

// Configuration de MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

// Schéma pour les messages Kafka
const MessageSchema = new mongoose.Schema({
  topic: String,
  partition: Number,
  offset: String,
  value: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);

const app = express();
const port = 3000;

// Route pour obtenir tous les messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur Express démarré sur le port ${port}`);
});