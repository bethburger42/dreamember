var mongoose = require('mongoose');

var DreamSchema = mongoose.Schema({
    user_id: {type: String, ref: 'User'},
    date: { type: Date, default: Date.now },
    theme: String,
    content: String
});

DreamSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      user_id: ret.user_id,
      date: ret.date,
      theme: ret.theme,
      content: ret.content
    };
    return returnJson;
  }
});

module.exports = mongoose.model('Dream', DreamSchema);