'use strict';

var Playlist = require('./app/models/playlist'),
    //logService = require('winston'),
    randomWords = require('./app/words');

function setup(router) {
    router.route('/playlist')

        // create a playlist (accessed at POST http://domain:port/playlist)
        .post(function (req, res) {
            var word = randomWords({exactly: 3, join: ''});

            var playlist = new Playlist({
                name: word
            });
            playlist.save(function (err) {
                if (err) {
                    console.log(err);
                    //logService.logger.error(new Date().getTime() + ' Playlist post failed: ', {error: err});
                    res.json(400, {
                        error: err.message
                    });
                }
                res.json({playlist: playlist});
            });
        })

        // get all the playlist (accessed at GET http://domain:port/playlist)
        .get(function (req, res) {
            Playlist.find(function (err, playlists) {
                if (err) {
                    console.log(err);
                    //logService.logger.error(new Date().getTime() + ' Playlist get failed: ', {error: err});
                    res.json(400, {
                        error: err.message
                    });
                }

                res.json({playlist: playlists});
            });
        });

// on routes that end in /playlist/name/:playlist_name
// ----------------------------------------------------
    router.route('/playlist/name/:playlist_name?')

        // get the playlist with that name
        .get(function (req, res) {
            Playlist.findOne({'name': req.params.playlist_name}, function (err, playlist) {
                if (err) {
                    console.log(err);
                    //logService.logger.error(new Date().getTime() + ' playlist/name get failed: ', {error: err});
                    res.json(400, {
                        error: err.message
                    });
                }
                res.json({playlist: playlist});
            })
        });


// on routes that end in /playlist/:playlist_id
// ----------------------------------------------------
    router.route('/playlist/:playlist_id')

        // get the playlist with that id
        .get(function (req, res) {
            Playlist.findById(req.params.playlist_id, function (err, playlist) {
                if (err) {
                    console.log(err);
                    //logService.logger.error(new Date().getTime() + ' /playlist/:playlist_id get failed: ', {error: err});
                }
                res.json({playlist: playlist});
            });
        })

        // update the playlist with this id
        .put(function (req, res) {
            Playlist.findById(req.params.playlist_id, function (err, playlist) {
                if (err) {
                    console.log(err);
                    //logService.logger.error(new Date().getTime() + ' /playlist/:playlist_id put failed: ', {error: err});
                }
                if (req.body.remove === 'true') {
                    collection.update(
                        { _id: req.params.playlist_id },
                        { $pull: { videoId: req.body.videoId } }
                    );
                } else {
                    playlist.videoId.push(req.body.videoId);
                }
                playlist.save(function (err) {
                    if (err) {
                        console.log(err);
                        //logService.logger.error(err + new Date().getTime());
                    }
                    res.json({playlist: playlist});
                });

            });
        })

        // delete the playlist with this id
        .delete(function (req, res) {
            Playlist.remove({
                _id: req.params.playlist_id
            }, function (err, playlist) {
                if (err)
                    res.send(err);

                res.json({message: 'Successfully deleted'});
            });
        });

// on routes that end in /getlistnames
// ----------------------------------------------------
    router.route('/getlistname/:name?')
        .get(function (req, res) {
            if (typeof req.params.name === 'undefined') {
                res.json({error: true, answer: "Du måste skriva in ett list namn"});
            } else {
                dataTalker.GetListName(req.params.name, function (answer) {
                    res.json(answer);
                });
            }
        });
}

exports.setup = setup;