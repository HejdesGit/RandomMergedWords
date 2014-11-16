'use strict';

var Words = require('../../words2.json'),
    Wordlist = require('../models/wordlist');

module.exports = (function () {
    var getAllRandomWords = function () {
            var wordList1Length = Words.wordList1.length;
            var wordList2Length = Words.wordList2.length;
            var wordList3Length = Words.wordList3.length;
            for (var wordList1Index = 0; wordList1Index < wordList1Length; wordList1Index++) {
                for (var wordList2Index = 0; wordList2Index < wordList2Length; wordList2Index++) {
                    for (var wordList3Index = 0; wordList3Index < wordList3Length; wordList3Index++) {
                        var word1 = Words.wordList1[wordList1Index];
                        var word2 = Words.wordList2[wordList2Index];
                        var word3 = Words.wordList3[wordList3Index];
                        findInDatabase(word1 + word2 + word3);
                    }
                }
            }
        },
        findInDatabase = function (word) {
            Wordlist.findOne({'name': word}, function (err, wordlist) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (wordlist === null) {
                        saveInDatabase(word);
                    }
                }
            })
        },
        saveInDatabase = function (word) {
            var wordlist = new Wordlist({
                name: word
            });
            wordlist.save(function (err) {
                if (err) {
                    console.log(err);
                }else{
                    console.log(word + " added to database");
                }
            });
        };
    return {
        getAllRandomWords: getAllRandomWords
    };
}());
