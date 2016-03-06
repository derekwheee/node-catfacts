#!/usr/bin/env node

import program from 'commander';
import inquirer from 'inquirer';
import ini from 'ini'
import fs from 'fs';
import pjson from '../../package.json';
import book from '../../phonebook.json';
import setupQuestions from '../lib/setup.js';
import Catfacts from '../catfacts.js';
import chalk from 'chalk';

let catfacts = new Catfacts();

var config;
var twilio;

var phonebook = {
    read : function () {
        for (var person in book) {
            if( book.hasOwnProperty(person) ) {
                log(chalk.cyan(person));
                log(book[person] + '\n');
            }
        }
    },
    add : function () {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Name"
            },
            {
                type: "input",
                name: "number",
                message: "Phone Number"
            },
        ], function (answers) {
            book[answers.name] = answers.number;
            fs.writeFile('./phonebook.json', JSON.stringify(book, null, 2), function (err) {
                if (err) throw err;
                log(chalk.green('Phonebook stored'));
            });
        });
    }
};

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

        catfacts.random(function (fact) {

            log(chalk.inverse(fact));

            if (opts.text) {
                sendText(opts.text, fact);
            }
        });
    });

program
    .command('setup')
    .alias('s')
    .description('Set some things up')
    .option('-r,--read', 'Read current setup config')
    .action(function (opts) {
        if (opts.read) {
            console.log(config);
        } else {
            inquirer.prompt(setupQuestions, createEnv);
        }
    });

program
    .command('phonebook <cmd>')
    .alias('p')
    .description('Perform actions on the phonebook')
    .action(function (cmd, opts) {
        phonebook[cmd](opts);
    });

program.parse(process.argv);

function log (text) {
    console.log(text);
}

function sendText (number, message) {
    twilio = twilio || require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
    log(chalk.green('Sending cat fact to ') + number);

    if (number in book) {
        number = book[number];
    }

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
            log(chalk.green('Storing configuration...'));

            fs.writeFile('./.env', ini.encode(newConfig), function (err) {
                if (err) throw err;
                log(chalk.green('Configuration stored'));

                config = newConfig;
            });

        } else {
            console.log(data);
        }
    });

}
