const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NumberSchema = new Schema({
 // placeholder for NumbersSchema
});

const Number = mongoose.model('Number', NumberSchema);

module.exports = Number;