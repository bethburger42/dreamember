var mongoose = require('mongoose');

var SymbolSchema = mongoose.Schema({
    term: String,
    meaning: String
});

SymbolSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      term: ret.term,
      meaning: ret.meaning
    };
    return returnJson;
  }
});

module.exports = mongoose.model('Symbol', SymbolSchema);