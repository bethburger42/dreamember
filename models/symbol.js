var mongoose = require('mongoose');

var SymbolSchema = mongoose.Schema({
    term: String,
    meaning: String
});

module.exports = mongoose.model('Symbol', SymbolSchema);