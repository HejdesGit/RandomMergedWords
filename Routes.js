'use strict';

var playlistHandler = require('./app/handlers/playlist');

module.exports = (function () {
    var setup = function (router) {
// on routes that end in /playlist
// ----------------------------------------------------
        router.route('/playlist')
            // create a playlist
            .post(function (req, res) {
                playlistHandler.postPlaylist(req, res);
            })
            // get all the playlist
            .get(function (req, res) {
                playlistHandler.getPlaylist(req, res);
            });

// on routes that end in /playlist/:playlist_name
// ----------------------------------------------------
        router.route('/playlist/name/:playlist_name')
            // get the playlist with that name
            .get(function (req, res) {
                playlistHandler.getPlaylistByName(req, res);
            });

// on routes that end in /playlist/:playlist_id
// ----------------------------------------------------
        router.route('/playlist/:playlist_id')
            // get the playlist with that id
            .get(function (req, res) {
                playlistHandler.getPlaylistById(req, res);
            })
            // update the playlist with this id
            .put(function (req, res) {
                playlistHandler.updatePlaylist(req, res);
            })
            // delete the playlist with this id
            .delete(function (req, res) {
                playlistHandler.deletePlaylist(req, res);
            });
    };
    return {setup: setup};
}());