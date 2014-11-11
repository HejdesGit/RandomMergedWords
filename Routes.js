'use strict';

var playlistHandler = require('./app/handlers/playlist');

function setup(router) {
    router.route('/playlist')
        // create a playlist (accessed at POST http://domain:port/playlist)
        .post(function (req, res) {
            playlistHandler.postPlaylist(req, res);
        })
        // get all the playlist (accessed at GET http://domain:port/playlist)
        .get(function (req, res) {
            playlistHandler.getPlaylist(req, res);
        });

// on routes that end in /playlist/name/:playlist_name
// ----------------------------------------------------
    router.route('/playlist/name/:playlist_name')
        // get the playlist with that name
        .get(function (req, res) {
            playlistHandler.getPlaylistName(req, res);
        });

// on routes that end in /playlist/:playlist_id
// ----------------------------------------------------
    router.route('/playlist/:playlist_id')
        // get the playlist with that id
        .get(function (req, res) {
            playlistHandler.getPlaylistId(req, res);
        })
        // update the playlist with this id
        .put(function (req, res) {
            playlistHandler.updatePlaylist(req, res);
        })
        // delete the playlist with this id
        .delete(function (req, res) {
            playlistHandler.deletePlaylist(req, res);
        });
}

exports.setup = setup;