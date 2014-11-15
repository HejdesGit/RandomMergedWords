'use strict';

var Playlist = require('../models/playlist'),
    logService = require('winston'),
    randomWords = require('../words'),
    util = require('util');

module.exports = (function () {
    var getPlaylist = function (req, res) {
            Playlist.find(function (err, playlists) {
                if (err) {
                    resError(res, err, ' Playlist get failed: ');
                }
                res.json({playlist: playlists});
            });
        },
        postPlaylist = function (req, res) {
            var word = randomWords({exactly: 3, join: ''});
            var playlist = new Playlist({
                name: word
            });
            playlist.save(function (err) {
                if (err) {
                    resError(res, err, ' Playlist post failed: ');
                }
                res.json({playlist: playlist});
            });
        },
        getPlaylistByName = function (req, res) {
            req.checkParams('playlist_name', 'Invalid urlparam').notEmpty().isAlpha();
            validateErrors(req, res, 'validating playlist_name failed.');
            Playlist.find({'name': req.params.playlist_name}, function (err, playlist) {
                if (err) {
                    resError(res, err, ' /playlist/name/:playlist_name? get failed: ');
                }
                res.json({playlist: playlist});
            });
        },
        getPlaylistById = function (req, res) {
            req.checkParams('playlist_id', 'Invalid urlparam').notEmpty().isAlphanumeric();
            validateErrors(req, res, 'validating playlist_id failed.');
            Playlist.findById(req.params.playlist_id, function (err, playlist) {
                if (err) {
                    resError(res, err, ' /playlist/:playlist_id get failed: ');
                }
                res.json({playlist: playlist});
            });
        },
        updatePlaylist = function (req, res) {
            req.checkParams('playlist_id', 'Invalid urlparam for updatePlaylist').notEmpty().isAlphanumeric();
            req.checkBody('videoId', 'Invalid bodyparms for updatePlaylist').notEmpty().isInt();
            validateErrors(req, res, 'updating failed.');
            if (req.body.remove === 'true') {
                Playlist.update(
                    {_id: req.params.playlist_id},
                    {$pull: {videoId: req.body.videoId}}, function (err, result) {
                        if (err) {
                            resError(res, err, ' /playlist/:playlist_id put removed failed: ');
                        }
                    })
            } else {
                Playlist.update(
                    {_id: req.params.playlist_id},
                    {$push: {videoId: req.body.videoId}}, function (err, result) {
                        if (err) {
                            resError(res, err, ' /playlist/:playlist_id put add failed: ');
                        }
                    })
            }
            Playlist.findById(req.params.playlist_id, function (err, playlist) {
                if (err) {
                    resError(res, err, ' /playlist/:playlist_id removed failed: ');
                }
                res.json({playlist: playlist});
            });
        },
        deletePlaylist = function (req, res) {
            Playlist.remove({
                _id: req.params.playlist_id
            }, function (err) {
                if (err) {
                    resError(res, err, ' /playlist/:playlist_id put failed ');
                }
                res.json({message: 'Successfully deleted'});
            });
        },
        validateErrors = function (req, res, message) {
            var errors = req.validationErrors();
            if (errors) {
                resError(res, util.inspect(errors), message);
                return;
            }
        },
    //TODO: refactor move.
        resError = function (res, err, message) {
            logService.error(new Date() + ' | ' + message + ' |', {error: err});
            res.status(400).json({
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
