var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlaylistSchema   = new Schema({
    name: String,
    created: { type: Date, default: Date.now },
    videoId:   [Number]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);