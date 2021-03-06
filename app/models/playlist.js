var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
    name: {type: String},
    created: {type: Date, default: Date.now},
    videoId: {type: [Number]},
    updated: {type: Date}
});

module.exports = mongoose.model('Playlist', PlaylistSchema);