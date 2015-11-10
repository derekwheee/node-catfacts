#!/usr/bin/env node

var program = require('commander');
var inquirer = require('inquirer');
var ini = require('ini')
var fs = require('fs');
var pjson = require('../package.json');
var setupQuestions = require('../lib/setup.js');
var Catfacts = require('../catfacts.js');
var chalk = require('chalk');

var catfacts = new Catfacts();
var config;
var twilio;

try {
    config = ini.parse(fs.readFileSync('./.env', 'utf-8'))
} catch (err) { }

program
    .version(pjson.version)

program
    .command('random')
    .alias('r')
    .description('Get random cat fact')
    .option('-t, --text <number>', 'Send cat fact via SMS')
    .action(function (opts) {

        if (opts.text && !config) {
            log(chalk.red('Config not found. Run `catfacts setup`'));
            return;
        }

        catfacts.random(function (res) {
            var str = '';
            var fact;

            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                var fact = JSON.parse(str).facts[0]

                log(chalk.inverse(fact));

                if (opts.text) {
                    sendText(opts.text, fact);
                }
            });
        });
    });

program
    .command('setup')
    .alias('s')
    .description('Set some things up')
    .action(function () {
        inquirer.prompt(setupQuestions, createEnv);
    });

program.parse(process.argv);

function log (text) {
    console.log(text);
}

function sendText (number, message) {
    twilio = twilio || require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
    log(chalk.green('Sending cat fact to ') + number);

    twilio.messages.create({
        to: number,
        from: config.TWILIO_FROM,
        body: message,
    }, function(err, message) {
        if (err) {
            log(chalk.red(err));
        } else {
            log(chalk.green('Cat fact sent'));
        }
    });
}

function createEnv (opts) {

    var newConfig = {
        TWILIO_ACCOUNT_SID : opts.twilio_account_sid,
        TWILIO_AUTH_TOKEN : opts.twilio_auth_token,
        TWILIO_FROM : opts.twilio_from
    };

    fs.readFile('./.env', function (err, data) {
        if (err) {
            log(chalk.green('Storing configutaration...'));

            fs.writeFile('./.env', ini.encode(newConfig), function (err) {
                if (err) throw err;
                log(chalk.green('Configutaration stored'));

                config = newConfig;
            });

        } else {
            console.log(data);
        }
    });

}
