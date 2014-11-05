var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    videoID: [Number]
});

module.exports = mongoose.model('List', ListSchema);