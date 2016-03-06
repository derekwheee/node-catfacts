#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _ini = require('ini');

var _ini2 = _interopRequireDefault(_ini);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _phonebook = require('../../phonebook.json');

var _phonebook2 = _interopRequireDefault(_phonebook);

var _setup = require('../lib/setup.js');

var _setup2 = _interopRequireDefault(_setup);

var _catfacts = require('../catfacts.js');

var _catfacts2 = _interopRequireDefault(_catfacts);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let catfacts = new _catfacts2.default();

var config;
var twilio;

var phonebook = {
    read: function () {
        for (var person in _phonebook2.default) {
            if (_phonebook2.default.hasOwnProperty(person)) {
                log(_chalk2.default.cyan(person));
                log(_phonebook2.default[person] + '\n');
            }
        }
    },
    add: function () {
        _inquirer2.default.prompt([{
            type: "input",
            name: "name",
            message: "Name"
        }, {
            type: "input",
            name: "number",
            message: "Phone Number"
        }], function (answers) {
            _phonebook2.default[answers.name] = answers.number;
            _fs2.default.writeFile('./phonebook.json', JSON.stringify(_phonebook2.default, null, 2), function (err) {
                if (err) throw err;
                log(_chalk2.default.green('Phonebook stored'));
            });
        });
    }
};

try {
    config = _ini2.default.parse(_fs2.default.readFileSync('./.env', 'utf-8'));
} catch (err) {}

_commander2.default.version(_package2.default.version);

_commander2.default.command('random').alias('r').description('Get random cat fact').option('-t, --text <number>', 'Send cat fact via SMS').action(function (opts) {

    if (opts.text && !config) {
        log(_chalk2.default.red('Config not found. Run `catfacts setup`'));
        return;
    }

    catfacts.random(function (fact) {

        log(_chalk2.default.inverse(fact));

        if (opts.text) {
            sendText(opts.text, fact);
        }
    });
});

_commander2.default.command('setup').alias('s').description('Set some things up').option('-r,--read', 'Read current setup config').action(function (opts) {
    if (opts.read) {
        console.log(config);
    } else {
        _inquirer2.default.prompt(_setup2.default, createEnv);
    }
});

_commander2.default.command('phonebook <cmd>').alias('p').description('Perform actions on the phonebook').action(function (cmd, opts) {
    phonebook[cmd](opts);
});

_commander2.default.parse(process.argv);

function log(text) {
    console.log(text);
}

function sendText(number, message) {
    twilio = twilio || require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
    log(_chalk2.default.green('Sending cat fact to ') + number);

    if (number in _phonebook2.default) {
        number = _phonebook2.default[number];
    }

    twilio.messages.create({
        to: number,
        from: config.TWILIO_FROM,
        body: message
    }, function (err, message) {
        if (err) {
            log(_chalk2.default.red(err));
        } else {
            log(_chalk2.default.green('Cat fact sent'));
        }
    });
}

function createEnv(opts) {

    var newConfig = {
        TWILIO_ACCOUNT_SID: opts.twilio_account_sid,
        TWILIO_AUTH_TOKEN: opts.twilio_auth_token,
        TWILIO_FROM: opts.twilio_from
    };

    _fs2.default.readFile('./.env', function (err, data) {
        if (err) {
            log(_chalk2.default.green('Storing configuration...'));

            _fs2.default.writeFile('./.env', _ini2.default.encode(newConfig), function (err) {
                if (err) throw err;
                log(_chalk2.default.green('Configuration stored'));

                config = newConfig;
            });
        } else {
            console.log(data);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,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Q0FBVyxTQUFYLENBQXZCLEVBQThDLFVBQVUsR0FBVixFQUFlO0FBQ3pELG9CQUFJLEdBQUosRUFBUyxNQUFNLEdBQU4sQ0FBVDtBQUNBLG9CQUFJLGdCQUFNLEtBQU4sQ0FBWSxzQkFBWixDQUFKLEVBRnlEOztBQUl6RCx5QkFBUyxTQUFULENBSnlEO2FBQWYsQ0FBOUMsQ0FISztTQUFULE1BVU87QUFDSCxvQkFBUSxHQUFSLENBQVksSUFBWixFQURHO1NBVlA7S0FEa0IsQ0FBdEIsQ0FSc0I7Q0FBMUIiLCJmaWxlIjoiYmluL2NsaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgcHJvZ3JhbSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IGlucXVpcmVyIGZyb20gJ2lucXVpcmVyJztcbmltcG9ydCBpbmkgZnJvbSAnaW5pJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwanNvbiBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IGJvb2sgZnJvbSAnLi4vLi4vcGhvbmVib29rLmpzb24nO1xuaW1wb3J0IHNldHVwUXVlc3Rpb25zIGZyb20gJy4uL2xpYi9zZXR1cC5qcyc7XG5pbXBvcnQgQ2F0ZmFjdHMgZnJvbSAnLi4vY2F0ZmFjdHMuanMnO1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcblxubGV0IGNhdGZhY3RzID0gbmV3IENhdGZhY3RzKCk7XG5cbnZhciBjb25maWc7XG52YXIgdHdpbGlvO1xuXG52YXIgcGhvbmVib29rID0ge1xuICAgIHJlYWQgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIHBlcnNvbiBpbiBib29rKSB7XG4gICAgICAgICAgICBpZiggYm9vay5oYXNPd25Qcm9wZXJ0eShwZXJzb24pICkge1xuICAgICAgICAgICAgICAgIGxvZyhjaGFsay5jeWFuKHBlcnNvbikpO1xuICAgICAgICAgICAgICAgIGxvZyhib29rW3BlcnNvbl0gKyAnXFxuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFkZCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5xdWlyZXIucHJvbXB0KFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJOYW1lXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJQaG9uZSBOdW1iZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSwgZnVuY3Rpb24gKGFuc3dlcnMpIHtcbiAgICAgICAgICAgIGJvb2tbYW5zd2Vycy5uYW1lXSA9IGFuc3dlcnMubnVtYmVyO1xuICAgICAgICAgICAgZnMud3JpdGVGaWxlKCcuL3Bob25lYm9vay5qc29uJywgSlNPTi5zdHJpbmdpZnkoYm9vaywgbnVsbCwgMiksIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgbG9nKGNoYWxrLmdyZWVuKCdQaG9uZWJvb2sgc3RvcmVkJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbnRyeSB7XG4gICAgY29uZmlnID0gaW5pLnBhcnNlKGZzLnJlYWRGaWxlU3luYygnLi8uZW52JywgJ3V0Zi04JykpXG59IGNhdGNoIChlcnIpIHsgfVxuXG5wcm9ncmFtXG4gICAgLnZlcnNpb24ocGpzb24udmVyc2lvbilcblxucHJvZ3JhbVxuICAgIC5jb21tYW5kKCdyYW5kb20nKVxuICAgIC5hbGlhcygncicpXG4gICAgLmRlc2NyaXB0aW9uKCdHZXQgcmFuZG9tIGNhdCBmYWN0JylcbiAgICAub3B0aW9uKCctdCwgLS10ZXh0IDxudW1iZXI+JywgJ1NlbmQgY2F0IGZhY3QgdmlhIFNNUycpXG4gICAgLmFjdGlvbihmdW5jdGlvbiAob3B0cykge1xuXG4gICAgICAgIGlmIChvcHRzLnRleHQgJiYgIWNvbmZpZykge1xuICAgICAgICAgICAgbG9nKGNoYWxrLnJlZCgnQ29uZmlnIG5vdCBmb3VuZC4gUnVuIGBjYXRmYWN0cyBzZXR1cGAnKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYXRmYWN0cy5yYW5kb20oZnVuY3Rpb24gKGZhY3QpIHtcblxuICAgICAgICAgICAgbG9nKGNoYWxrLmludmVyc2UoZmFjdCkpO1xuXG4gICAgICAgICAgICBpZiAob3B0cy50ZXh0KSB7XG4gICAgICAgICAgICAgICAgc2VuZFRleHQob3B0cy50ZXh0LCBmYWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbnByb2dyYW1cbiAgICAuY29tbWFuZCgnc2V0dXAnKVxuICAgIC5hbGlhcygncycpXG4gICAgLmRlc2NyaXB0aW9uKCdTZXQgc29tZSB0aGluZ3MgdXAnKVxuICAgIC5vcHRpb24oJy1yLC0tcmVhZCcsICdSZWFkIGN1cnJlbnQgc2V0dXAgY29uZmlnJylcbiAgICAuYWN0aW9uKGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgIGlmIChvcHRzLnJlYWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnF1aXJlci5wcm9tcHQoc2V0dXBRdWVzdGlvbnMsIGNyZWF0ZUVudik7XG4gICAgICAgIH1cbiAgICB9KTtcblxucHJvZ3JhbVxuICAgIC5jb21tYW5kKCdwaG9uZWJvb2sgPGNtZD4nKVxuICAgIC5hbGlhcygncCcpXG4gICAgLmRlc2NyaXB0aW9uKCdQZXJmb3JtIGFjdGlvbnMgb24gdGhlIHBob25lYm9vaycpXG4gICAgLmFjdGlvbihmdW5jdGlvbiAoY21kLCBvcHRzKSB7XG4gICAgICAgIHBob25lYm9va1tjbWRdKG9wdHMpO1xuICAgIH0pO1xuXG5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmZ1bmN0aW9uIGxvZyAodGV4dCkge1xuICAgIGNvbnNvbGUubG9nKHRleHQpO1xufVxuXG5mdW5jdGlvbiBzZW5kVGV4dCAobnVtYmVyLCBtZXNzYWdlKSB7XG4gICAgdHdpbGlvID0gdHdpbGlvIHx8IHJlcXVpcmUoJ3R3aWxpbycpKGNvbmZpZy5UV0lMSU9fQUNDT1VOVF9TSUQsIGNvbmZpZy5UV0lMSU9fQVVUSF9UT0tFTik7XG4gICAgbG9nKGNoYWxrLmdyZWVuKCdTZW5kaW5nIGNhdCBmYWN0IHRvICcpICsgbnVtYmVyKTtcblxuICAgIGlmIChudW1iZXIgaW4gYm9vaykge1xuICAgICAgICBudW1iZXIgPSBib29rW251bWJlcl07XG4gICAgfVxuXG4gICAgdHdpbGlvLm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICAgIHRvOiBudW1iZXIsXG4gICAgICAgIGZyb206IGNvbmZpZy5UV0lMSU9fRlJPTSxcbiAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICB9LCBmdW5jdGlvbihlcnIsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgbG9nKGNoYWxrLnJlZChlcnIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZyhjaGFsay5ncmVlbignQ2F0IGZhY3Qgc2VudCcpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnYgKG9wdHMpIHtcblxuICAgIHZhciBuZXdDb25maWcgPSB7XG4gICAgICAgIFRXSUxJT19BQ0NPVU5UX1NJRCA6IG9wdHMudHdpbGlvX2FjY291bnRfc2lkLFxuICAgICAgICBUV0lMSU9fQVVUSF9UT0tFTiA6IG9wdHMudHdpbGlvX2F1dGhfdG9rZW4sXG4gICAgICAgIFRXSUxJT19GUk9NIDogb3B0cy50d2lsaW9fZnJvbVxuICAgIH07XG5cbiAgICBmcy5yZWFkRmlsZSgnLi8uZW52JywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBsb2coY2hhbGsuZ3JlZW4oJ1N0b3JpbmcgY29uZmlndXJhdGlvbi4uLicpKTtcblxuICAgICAgICAgICAgZnMud3JpdGVGaWxlKCcuLy5lbnYnLCBpbmkuZW5jb2RlKG5ld0NvbmZpZyksIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgbG9nKGNoYWxrLmdyZWVuKCdDb25maWd1cmF0aW9uIHN0b3JlZCcpKTtcblxuICAgICAgICAgICAgICAgIGNvbmZpZyA9IG5ld0NvbmZpZztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
