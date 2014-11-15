//TODO: Mock

var should = require('should-http'),
    assert = require('assert'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    configDebug = require('../Config-debug'),
    nock = require('nock');

var url = configDebug.api.local,
    PlaylistId,
    PlaylistName,
    testVideoId = 1;

describe('/playlist - the routes of /playlist', function () {
    it('.post - should post a lists', function (done) {
        request(url)
            .post('/playlist')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                res.should.have.status(200);
                res.body.should.not.equal(null);
                PlaylistId = res.body.playlist._id;
                PlaylistName = res.body.playlist.name;
                done();
            });
    });
    it('.get - should return all lists', function (done) {
        request(url)
            .get('/playlist')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                res.should.have.status(200);
                res.body.should.not.equal(null);
                done();
            });
    });
});

describe('/playlist/:playlist_id', function () {
    it('.get - should return the correct playlist by ID', function (done) {
        request(url)
            .get('/playlist/' + PlaylistId)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                res.body.playlist.should.have.property('_id');
                res.body.playlist.created.should.not.equal(null);
                done();
            });
    });
    it('.put - should correctly update(add) an existing playlist videoId', function (done) {
        var body = {
            videoId: testVideoId
        };

        request(url)
            .put('/playlist/' + PlaylistId)
            .send(body)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                res.body.playlist.should.have.property('_id');
                res.body.playlist.videoId.should.containEql(body.videoId);
                res.body.playlist.created.should.not.equal(null);
                done();
            });
    });
    it('.put - should correctly update(delete) an existing playlist videoId', function (done) {
        var body = {
            videoId: 1,
            remove: 'true'
        };
        request(url)
            .put('/playlist/' + PlaylistId)
            .send(body)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                res.body.playlist.should.have.property('_id');
                res.body.playlist.should.not.equal(null);
                done();
            });
    });

    it('.put.status(400) - should correctly send 400 when updating with wrong data type', function (done) {
        var body = {
            videoId: "Wrong type of videoId"
        };
        request(url)
            .put('/playlist/' + PlaylistId)
            .send(body)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                res.should.have.status(400);
                done();
            });
    });
});


describe('/playlist/name/:playlist_name', function () {
    it('.get - should correctly update(delete) an existing playlist videoId', function (done) {
        request(url)
            .get('/playlist/name/' + PlaylistName)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                res.body.playlist.should.not.equal(null);
                res.body.playlist.name.should.containEql(PlaylistName);
                done();
            });
    });
    it('.get.status(400) - should correctly send 400 when getting none alpha name', function (done) {
        var noneAlpha = '123';
        request(url)
            .get('/playlist/name/' + noneAlpha)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                res.should.have.status(400);
                done();
            });
    });
});
