import http from 'http';

class Catfacts {

    constructor(opts) {
        this.opts = opts || {};
    }

    random(count, cb) {

        let options = {
            host: 'catfacts-api.appspot.com',
            path: '/api/facts'
        };

        if (!cb && typeof count === 'function') {
            cb = count;
            count = null
        }

        options.path = count ? options.path + '?number=' + count : options.path;

        http.request(options, function (res) {
            let str = '';

            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let fact = count ? JSON.parse(str).facts : JSON.parse(str).facts[0]

                cb(fact);
            });
        }).end();

    }

}

module.exports = Catfacts;
