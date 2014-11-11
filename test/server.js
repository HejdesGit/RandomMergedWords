var should = require('should-http');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');


describe('Routing', function () {
    //var url = 'http://hejdes.herokuapp.com/api';
    var url = 'http://localhost:9001/api';
    var PlaylistId;
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function (done) {

        // In our tests we use the test db
        mongoose.connect('mongodb://localhost:27017/hejde', function (err) {
            console.log(err);
        });
        done();
    });


    it('should post a lists', function (done) {
        request(url)
            .post('/playlist')
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                // this is should.js syntax, very clear
                res.should.have.status(200);
                res.body.should.not.equal(null);
                PlaylistId = res.body.playlist._id;
                done();
            });
    });
    it('should return all lists', function (done) {

        request(url)
            .get('/playlist')

            // end handles the response
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                // this is should.js syntax, very clear
                res.should.have.status(200);
                res.body.should.not.equal(null);
                done();
            });
    });

    it('should correctly update(save) an existing account', function (done) {
        var body = {
            videoId: 333333
        };

        request(url)
            .put('/playlist/' + PlaylistId)
            .send(body)
            .expect(200) //Status code
            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                res.body.playlist.should.have.property('_id');
                res.body.playlist.videoId.should.containEql(body.videoId);
                res.body.playlist.created.should.not.equal(null);
                done();
            });
    });
    it('should correctly update(delete) an existing account', function (done) {
        var body = {
            videoId: 333333,
            remove: 'true'
        };
        request(url)
            .put('/playlist/' + PlaylistId)
            .send(body)
            .expect(200) //Status code
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                // Should.js fluent syntax applied
                res.body.playlist.should.have.property('_id');
                res.body.playlist.should.not.equal(null);
                done();
            });
    });

});