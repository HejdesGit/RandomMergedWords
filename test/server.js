var should = require('should-http');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');

describe('Routing', function() {
    //var url = 'http://hejdes.herokuapp.com/api';
    var url = 'http://localhost:9000/api';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
        // In our tests we use the test db
        mongoose.connect('mongodb://hejde:johan@lennon.mongohq.com:10037/app31210075', function(err){
            console.log(err);
        });
        done();
    });
    it('should correctly update an existing account', function(done){
        var body = {
            videoID: 123
        };
        request(url)
            .put('/list/545a93f5a970a7470d8e1488')
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200) //Status code
            .end(function(err,res) {
                if (err) {
                    throw err;
                }
                // Should.js fluent syntax applied
                res.body.answer.should.have.property('_id');
                res.body.inserted.should.equal(123);
                res.body.answer.date.should.not.equal(null);
                done();
            });
    });

    // use describe to give a title to your test suite, in this case the tile is "Account"
    // and then specify a function in which we are going to declare all the tests
    // we want to run. Each test starts with the function it() and as a first argument
    // we have to provide a meaningful title for it, whereas as the second argument we
    // specify a function that takes a single parameter, "done", that we will use
    // to specify when our test is completed, and that's what makes easy
    // to perform async test!
    describe('Get all list items', function() {
        it('should return all lists', function(done) {

            request(url)
                .get('/list')

                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                     res.should.have.status(200);
                    res.body.should.not.equal(null);
                    done();
                });
        });

    });
});