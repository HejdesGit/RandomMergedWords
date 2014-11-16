'use strict';

var wordlist = require('./app/handlers/wordlist'),
    DB = require('./app/utils/data.talker.mongo.js');

DB.connect();

wordlist.getAllRandomWords();