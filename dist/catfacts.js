'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            count = null;
        }

        options.path = count ? options.path + '?number=' + count : options.path;

        _http2.default.request(options, function (res) {
            let str = '';

            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let fact = count ? JSON.parse(str).facts : JSON.parse(str).facts[0];

                cb(fact);
            });
        }).end();
    }

}

module.exports = Catfacts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGZhY3RzLmVzNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLE1BQU0sUUFBTixDQUFlOztBQUVYLGdCQUFZLElBQVosRUFBa0I7QUFDZCxhQUFLLElBQUwsR0FBWSxRQUFRLEVBQVIsQ0FERTtLQUFsQjs7QUFJQSxXQUFPLEtBQVAsRUFBYyxFQUFkLEVBQWtCOztBQUVkLFlBQUksVUFBVTtBQUNWLGtCQUFNLDBCQUFOO0FBQ0Esa0JBQU0sWUFBTjtTQUZBLENBRlU7O0FBT2QsWUFBSSxDQUFDLEVBQUQsSUFBTyxPQUFPLEtBQVAsS0FBaUIsVUFBakIsRUFBNkI7QUFDcEMsaUJBQUssS0FBTCxDQURvQztBQUVwQyxvQkFBUSxJQUFSLENBRm9DO1NBQXhDOztBQUtBLGdCQUFRLElBQVIsR0FBZSxRQUFRLFFBQVEsSUFBUixHQUFlLFVBQWYsR0FBNEIsS0FBNUIsR0FBb0MsUUFBUSxJQUFSLENBWjdDOztBQWNkLHVCQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFVBQVUsR0FBVixFQUFlO0FBQ2pDLGdCQUFJLE1BQU0sRUFBTixDQUQ2Qjs7QUFHakMsZ0JBQUksRUFBSixDQUFPLE1BQVAsRUFBZSxVQUFVLEtBQVYsRUFBaUI7QUFDNUIsdUJBQU8sS0FBUCxDQUQ0QjthQUFqQixDQUFmLENBSGlDOztBQU9qQyxnQkFBSSxFQUFKLENBQU8sS0FBUCxFQUFjLFlBQVk7QUFDdEIsb0JBQUksT0FBTyxRQUFRLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsS0FBaEIsR0FBd0IsS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixLQUFoQixDQUFzQixDQUF0QixDQUFoQyxDQURXOztBQUd0QixtQkFBRyxJQUFILEVBSHNCO2FBQVosQ0FBZCxDQVBpQztTQUFmLENBQXRCLENBWUcsR0FaSCxHQWRjO0tBQWxCOztDQU5KOztBQXNDQSxPQUFPLE9BQVAsR0FBaUIsUUFBakIiLCJmaWxlIjoiY2F0ZmFjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHR0cCBmcm9tICdodHRwJztcblxuY2xhc3MgQ2F0ZmFjdHMge1xuXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIH1cblxuICAgIHJhbmRvbShjb3VudCwgY2IpIHtcblxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhvc3Q6ICdjYXRmYWN0cy1hcGkuYXBwc3BvdC5jb20nLFxuICAgICAgICAgICAgcGF0aDogJy9hcGkvZmFjdHMnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCFjYiAmJiB0eXBlb2YgY291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNiID0gY291bnQ7XG4gICAgICAgICAgICBjb3VudCA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMucGF0aCA9IGNvdW50ID8gb3B0aW9ucy5wYXRoICsgJz9udW1iZXI9JyArIGNvdW50IDogb3B0aW9ucy5wYXRoO1xuXG4gICAgICAgIGh0dHAucmVxdWVzdChvcHRpb25zLCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBsZXQgc3RyID0gJyc7XG5cbiAgICAgICAgICAgIHJlcy5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICAgICAgICAgIHN0ciArPSBjaHVuaztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXMub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmFjdCA9IGNvdW50ID8gSlNPTi5wYXJzZShzdHIpLmZhY3RzIDogSlNPTi5wYXJzZShzdHIpLmZhY3RzWzBdXG5cbiAgICAgICAgICAgICAgICBjYihmYWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5lbmQoKTtcblxuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhdGZhY3RzO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
