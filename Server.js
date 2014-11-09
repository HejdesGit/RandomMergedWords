//TODO: Refactor
//TODO: Break out routes
//TODO: Generate unique word
//TODO: Config.js port, host.

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    DB = require('./app/data.talker.mongo'),
    swaggy = require("swaggy"),
    mongoose = require('mongoose'),
    logService = require('winston'),
    Playlist = require('./app/models/playlist'),
    routes = require('./Routes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Using cross origin resource sharing
app.use(cors());

var port = process.env.PORT || 9001; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// connect to our database
mongoose.connect('mongodb://' + DB.config.user + ':' + DB.config.password + '@' + DB.config.server + ':' + DB.config.port + '/' + DB.config.app + '', function (err) {
    if (err) {
        logService.logger.error(new Date().getTime() + ' Database error: ', {error: err});
    }
});



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

routes.setup(router);

swaggy(app, function (err) {
    if (err) {
        logService.logger.error(new Date().getTime() + ' /api swaggy failed : ', {error: err});
        return console.log(err);
    }
    app.listen(port);
    console.log('Magic happens on port ' + port);
    console.log("REST API available at http://localhost:3001/api/docs");
});