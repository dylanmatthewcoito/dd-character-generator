const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    strength: {},
    dexterity: {},
    constitution: {},
    intelegence: {},
    wisdom: {},
    charisma: {}
})

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;