var mongoose = require('mongoose');

var DreamSchema = mongoose.Schema({
    user_id: {type: String, ref: 'User'},
    date: { type: Date, default: Date.now },
    theme: String,
    content: String
});

module.exports = mongoose.model('Dream', DreamSchema);