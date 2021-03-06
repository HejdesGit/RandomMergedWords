// BASE SETUP
// =============================================================================

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    cors = require('cors'),
    DB = require('./app/utils/data.talker.mongo.js'),
    swaggy = require("swaggy"),
    logService = require('winston'),
    routes = require('./Routes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator([]));
app.use(bodyParser.json());


//TODO: Setup right url for cors.
//Using cross origin resource sharing
app.use(cors());

var port = process.env.PORT || 9001; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

if (app.settings.env === 'test') {
    //npm run env-test
    var mongoose = require('mongoose'),
        configDebug = require('./Config-debug');
    mongoose.connect(configDebug.db.mongodb, function (err) {
        if (err) {
            logService.error(new Date() + ' mongoose connect error', {error: err});
        }
    });
} else {
    //Connect to database.
    DB.connect();
}

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
routes.setup(router);

swaggy(app, function (err) {
    if (err) {
        logService.error(new Date()+ ' /api swaggy failed : ', {error: err});
        return console.log(err);
    }
    app.listen(port);
    logService.info("Express server listening on port %d in %s mode", port, app.settings.env);
});