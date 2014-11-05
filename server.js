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

var mongoose = require('mongoose');
mongoose.connect('mongodb://hejde:johan@lennon.mongohq.com:10037/app31210075');
var List = require('./app/models/list');

var port = process.env.PORT || 9000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// on routes that end in /listname
// ----------------------------------------------------
router.route('/list')

    // create a listname (accessed at POST http://localhost:8080/listname)
    .post(function(req, res) {

        var list = new List();		// create a new instance of the ListName model
        list.name = req.body.name;  // set the list name (comes from the request)

        list.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'List created: ' + list._id });
        });


    })

    // get all the list (accessed at GET http://localhost:9000/api/list)
    .get(function(req, res) {
        List.find(function(err, list) {
            if (err)
                res.send(err);

            res.json(list);
        });
    });

router.route('/list/:list_id')
// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
.put(function(req, res) {

        // use our bear model to find the bear we want
        List.findById(req.params.list_id, function(err, list) {

        if (err)
            res.send(err);

            var resi = req.body.videoID.split(" ");

            for (var i in resi) {
                var videoID = resi[i];
                list.videoID.push(videoID);
            }

            // save the bear
            list.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'List updated with ' + req.body.videoID });
        });

    });
});

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