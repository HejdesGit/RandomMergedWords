'use strict';

var Playlist = require('../models/playlist'),
    logService = require('winston'),
    randomWords = require('../words'),
    util = require('util');

module.exports = (function () {
    var getPlaylist = function (request, response) {
            Playlist.find(function (err, playlists) {
                if (err) {
                    responseError(response, err, ' Playlist get failed: ');
                }
                else {
                    response.json({playlist: playlists});
                }
            });
        },
        postPlaylist = function (request, response) {
            var word = randomWords({exactly: 3, join: ''});
            var playlist = new Playlist({
                name: word
            });
            playlist.save(function (err) {
                if (err) {
                    responseError(response, err, ' Playlist post failed: ');
                }
                else {
                    response.json({playlist: playlist});
                }
            });
        },
        getPlaylistByName = function (request, respons) {
            request.checkParams('playlist_name', 'Invalid urlparam').notEmpty().isAlpha();
            var errors = request.validationErrors();
            if (errors) {
                responseError(respons, util.inspect(errors), 'validating playlist_name failed.');
            }
            else {
                Playlist.findOne({'name': request.params.playlist_name}, function (err, playlist) {
                    if (err) {
                        responseError(respons, err, ' /playlist/name/:playlist_name? get failed: ');
                    }
                    else {
                        respons.json({playlist: playlist});
                    }
                });
            }
        },
        getPlaylistById = function (request, response) {
            request.checkParams('playlist_id', 'Invalid urlparam').notEmpty().isAlphanumeric();
            var errors = request.validationErrors();
            if (errors) {
                responseError(response, util.inspect(errors), 'validating playlist_id failed.');
            }
            else {
                Playlist.findById(request.params.playlist_id, function (err, playlist) {
                    if (err) {
                        responseError(response, err, ' /playlist/:playlist_id get failed: ');
                    }
                    else {
                        response.json({playlist: playlist});
                    }
                });
            }
        },
        updatePlaylist = function (request, response) {
            request.checkParams('playlist_id', 'Invalid urlparam for updatePlaylist').notEmpty().isAlphanumeric();
            request.checkBody('videoId', 'Invalid bodyparms for updatePlaylist').notEmpty().isInt();
            var errors = request.validationErrors();
            if (errors) {
                responseError(response, util.inspect(errors), 'updating failed.');
            }
            else {
                if (request.body.remove === 'true') {
                    Playlist.update(
                        {_id: request.params.playlist_id},
                        {$pull: {videoId: request.body.videoId}}, function (err, result) {
                            if (err) {
                                responseError(response, err, ' /playlist/:playlist_id put removed failed: ');
                                //TODO: fix.
                                return;
                            }
                        })
                } else {
                    Playlist.update(
                        {_id: request.params.playlist_id},
                        {$push: {videoId: request.body.videoId}}, function (err, result) {
                            if (err) {
                                responseError(response, err, ' /playlist/:playlist_id put add failed: ');
                                //TODO: fix. responseError should end response.
                                return;
                            }
                        })
                }
                Playlist.findById(request.params.playlist_id, function (err, playlist) {
                    if (err) {
                        responseError(response, err, ' /playlist/:playlist_id removed failed: ');
                    } else {
                        response.json({playlist: playlist});
                    }
                });
            }
        },
        deletePlaylist = function (request, response) {
            Playlist.remove({
                _id: request.params.playlist_id
            }, function (err) {
                if (err) {
                    responseError(response, err, ' /playlist/:playlist_id put failed ');
                } else {
                    response.json({message: 'Successfully deleted'});
                }
            });
        },
        validateErrors = function (request, response, message) {
            var errors = request.validationErrors();
            if (errors) {
                responseError(response, util.inspect(errors), message);
            }
        },
    //TODO: refactor move.
        responseError = function (response, err, message) {
            logService.error(new Date() + ' | ' + message + ' |', {error: err});
            response.status(400).json({
                error: err
            });
        };
    return {
        getPlaylist: getPlaylist,
        postPlaylist: postPlaylist,
        getPlaylistByName: getPlaylistByName,
        getPlaylistById: getPlaylistById,
        updatePlaylist: updatePlaylist,
        deletePlaylist: deletePlaylist
    };
}());
