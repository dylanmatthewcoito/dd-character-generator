const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  charClass: { type: String, required: true },
  race: { type: String, required: true },
  backstory: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stat: {
    strength: {
        type: Number,
        required: true
    },
    dexterity: {
        type: Number,
        required: true
    },
    constitution: {
        type: Number,
        required: true
    },
    intelligence: {
        type: Number,
        required: true
    },
    wisdom: {
        type: Number,
        required: true
    },
    charisma: {
        type: Number,
        required: true
    }
},
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;