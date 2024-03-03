const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  charClass: { type: String, required: true },
  race: { type: String, required: true },
  backstory: { type: String, required: true },
  image: { type: String, required: true },
  stat: { type: mongoose.Schema.Types.ObjectId, ref: 'Stat' },
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;