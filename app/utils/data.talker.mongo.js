'use strict';
var  mongoose = require('mongoose');


module.exports = (function () {
    var config = {
        user: 'api',
        password: 'in3WA7Uqcc',
        server: 'lennon.mongohq.com',
        port: '10033',
        app: 'app31306351'
        },
    connect = function () {
        mongoose.connect('mongodb://' + config.user + ':' + config.password + '@' + config.server + ':' + config.port + '/' + config.app + '', function (err) {
            if (err) {
                console.log(err);
            }
        });
    };

    return {
        config: config,
        connect:connect
    };

}());