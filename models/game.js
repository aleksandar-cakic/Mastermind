const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  solution: {type: String, required: true},
  userWon: {type: Boolean}
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;