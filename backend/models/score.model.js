const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  username: { type: String, required: true },
  game: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;