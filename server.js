// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'),		// call express
app = express(), 				// define our app using express
bodyParser = require('body-parser'),
randomWords = require('./app/words'),
cors = require('cors'),
dataTalker = require('./app/data.talker'),
swaggy = require("swaggy");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 9000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// on routes that end in /word
// ----------------------------------------------------
router.route('/word')
    .get(function (req, res) {
        var word = randomWords({ exactly: 3, join: '' });
        dataTalker.CreateListName(word, function(answer) {
            res.json(answer);
        });
    });

// on routes that end in /getlistnames
// ----------------------------------------------------
router.route('/getlistname/:name?')
    .get(function (req, res) {
        if(typeof req.params.name === 'undefined'){
            res.json({error:true, answer: "Du måste skriva in ett list namn"});
        }else{
        dataTalker.GetListName(req.params.name, function(answer) {
            res.json(answer);
        });
        }
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

swaggy(app, function (err) {
    if (err) {
        return console.log(err);
    }
    app.listen(port);
    console.log('Magic happens on port ' + port);
    console.log("REST API available at http://localhost:3001/api/docs");
});