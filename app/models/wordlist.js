var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordlistSchema = new Schema({
    name: {type: String},
    taken: {type: Boolean, default: false},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Wordlist', WordlistSchema);