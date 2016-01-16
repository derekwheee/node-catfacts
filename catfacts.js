var http = require('http');

var Catfacts = function (opts) {

    var opts = opts || {};

};

Catfacts.prototype.random = function (count, cb) {

    var options = {
        host: 'catfacts-api.appspot.com',
        path: '/api/facts'
    };

    if (!cb && typeof count === 'function') {
        cb = count;
        count = null
    }

    options.path = count ? options.path + '?number=' + count : options.path;

    http.request(options, function (res) {
        var str = '';

        res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function () {
            var fact = count ? JSON.parse(str).facts : JSON.parse(str).facts[0]

            cb(fact);
        });
    }).end();

};

module.exports = new Catfacts();
