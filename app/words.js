'use strict';

var Words = require('../words.json');

module.exports = function words(options) {
    function word1() {
        return Words.wordList1[randInt(Words.wordList1.length)];
    }

    function word2() {
        return Words.wordList2[randInt(Words.wordList2.length)];
    }

    function word3() {
        return Words.wordList3[randInt(Words.wordList3.length)];
    }

    function randInt(lessThan) {
        return Math.floor(Math.random() * lessThan);
    }

    // No arguments = generate one word
    if (typeof(options) === 'undefined') {
        return word1();
    }

    // Just a number = return that many words
    if (typeof(options) === 'number') {
        options = {exactly: options};
    }

    // options supported: exactly, min, max, join

    if (options.exactly) {
        options.min = options.exactly;
        options.max = options.exactly;
    }
    var total = options.min + randInt(options.max + 1 - options.min);
    var results = [];
    var j = 1;
    for (var i = 0; (i < total); i++) {
        if (j === 1) {
            results.push(word1());
            j++;
        }
        else if (j === 2) {
            results.push(word2());
            j++;
        }
        else {
            results.push(word3());
            j = 1;
        }
    }
    if (options.join === '') {
        results = results.join('');
    } else if (options.join) {
        results = results.join(options.join);
    }
    return results;
};
