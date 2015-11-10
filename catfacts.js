var http = require('http');

var Catfacts = function (opts) {

    var opts = opts || {};

};

Catfacts.prototype.random = function (cb) {

    var options = {
        host: 'catfacts-api.appspot.com',
        path: '/api/facts'
    };

    http.request(options, cb).end();

};

module.exports = Catfacts;
