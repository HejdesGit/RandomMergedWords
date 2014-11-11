//TODO: Refactor
//TODO: Break out routes
//TODO: Generate unique word

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    DB = require('./app/data.talker.mongo'),
    swaggy = require("swaggy"),
    winston = require('winston'),
//logService = require('./app/logging'),
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

var myCustomLevels = {
    colors: {
        info: 'yellow',
        error: 'red'
    }
};

winston.addColors(myCustomLevels.colors);


if (app.settings.env === 'test') {
    //TODO: break out.
    //NODE_ENV=test node server.js
    var mongoose = require('mongoose'),
        configDebug = require('./test/config-debug');
    mongoose.connect(configDebug.mongodb, function (err) {
        winston.error(new Date().getTime() + 'mongoose connect error', {error: err});
    });
} else {
    //Connect to database.
    DB.connect();
}

winston.error("testing error");
winston.info("testing info");

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
routes.setup(router);


swaggy(app, function (err) {
    if (err) {
        winston.error(new Date().getTime() + ' /api swaggy failed : ', {error: err});
        return console.log(err);
    }
    app.listen(port);
    winston.info('Magic happens on port ' + port);
});