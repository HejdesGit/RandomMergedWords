'use strict';
var Firebase = require('firebase');

module.exports = (function () {
    var config = {
        firebaseURL: 'https://flowpersonalization.firebaseio.com/'
    };

    function GetListName(ListName, callback) {
        if (ListName === "") {
            callback({error: true, answer: 'Du måste skriva in ett namn som vi ska söka efter'});
        }
        var postsRef = new Firebase(config.firebaseURL);
        postsRef.on('value', function (snapshot) {
            var names = snapshot.val();
            var answer = "Vi hittade tyvärr inte den listan";
            var error = true;
            for (var key in names) {
                if (ListName === names[key]) {
                    answer = key;
                    error = false;
                }
            }
            callback({error: error, hash: answer, listname: ListName});
        }, function (errorObject) {
            callback({error: true, answer: 'Läsningen gick snett: ' + errorObject.code});
        });
    }

    function CreateListName(ListName, callback) {
        var postsRef = new Firebase(config.firebaseURL);
        postsRef.push(ListName, function (error) {
            if (error) {
                callback({error: true, answer: "Listan kunde tyvärr inte sparas." + error});
            } else {
                callback({error: false, listname: ListName});
            }
        });
    }


    return {
        GetListName: GetListName,
        CreateListName: CreateListName,
        config: config
    };
}());