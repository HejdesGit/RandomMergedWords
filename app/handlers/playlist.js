 'use strict';

 var Playlist = require('../models/playlist'),
     logService = require('winston'),
     randomWords = require('../words');

module.exports = (function () {
    var getPlaylist = function(req, res) {
            Playlist.find(function (err, playlists) {
                if (err) {
                    resError(res, err, ' Playlist get failed: ');
                    res.json(400, {
                        error: err.message
                    });
                }

                res.json({playlist: playlists});
            });
    },
        postPlaylist = function(req, res) {
            var word = randomWords({exactly: 3, join: ''});
            var playlist = new Playlist({
                name: word
            });
            playlist.save(function (err) {
                if (err) {
                    resError(res, err, ' Playlist post failed: ');
                    res.json(400, {
                        error: err.message
                    });
                }
                res.json({playlist: playlist});
            });
        },
        getPlaylistName = function(req, res) {
            Playlist.find({ 'name': req.params.playlist_name }, function (err, playlist) {
                if (err) {
                    resError(res, err, ' /playlist/name/:playlist_name? get failed: ');
                    res.json(400, {
                        error: err
                    });
                }
                res.json({playlist:playlist});
            });
        },
        getPlaylistId = function(req, res) {
            Playlist.findById(req.params.playlist_id, function (err, playlist) {
                if (err) {
                    resError(res, err, ' /playlist/:playlist_id get failed: ');
                }
                res.json({playlist: playlist});
            });
        },
        updatePlaylist= function(req, res) {
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
    deletePlaylist= function(req, res) {
        Playlist.remove({
            _id: req.params.playlist_id
        }, function (err) {
            if (err)
            {
                resError(res, err, ' /playlist/:playlist_id put failed ');
            }
            res.json({message: 'Successfully deleted'});
        });
    },
        resError= function(res, error , message) {
            logService.error(new Date().getTime() + message, {error: error});
            res.json(400, {
                error: err
            });
        } ;
    return {
        getPlaylist:getPlaylist,
        postPlaylist:postPlaylist,
        getPlaylistName: getPlaylistName,
        getPlaylistId:getPlaylistId,
        updatePlaylist:updatePlaylist,
        deletePlaylist:deletePlaylist
    };
}());
