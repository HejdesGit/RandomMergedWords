'use strict';

var playlistHandler = require('./app/handlers/playlist');

module.exports = (function () {
    var setup = function (router) {
// on routes that end in /playlist
// ----------------------------------------------------
        router.route('/playlist')
            // create a playlist
            .post(function (request, response) {
                playlistHandler.postPlaylist(request, response);
            })
            // get all the playlist
            .get(function (request, response) {
                playlistHandler.getPlaylist(request, response);
            });

// on routes that end in /playlist/:playlist_id
// ----------------------------------------------------
        router.route('/playlist/:playlist_id')
            // get the playlist with that id
            .get(function (request, response) {
                playlistHandler.getPlaylistById(request, response);
            })
            // update the playlist with this id
            .put(function (request, response) {
                playlistHandler.updatePlaylist(request, response);
            })
            // delete the playlist with this id
            .delete(function (request, response) {
                playlistHandler.deletePlaylist(request, response);
            });

// on routes that end in /playlist/:playlist_name
// ----------------------------------------------------
        router.route('/playlist/name/:playlist_name')
            // get the playlist with that name
            .get(function (request, response) {
                playlistHandler.getPlaylistByName(request, response);
            });
    };
    return {setup: setup};
}());