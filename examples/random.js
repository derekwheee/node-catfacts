var chalk = require('chalk');
var Catfacts = require('../dist/catfacts');
var catfacts = new Catfacts();

catfacts.random(5, function (facts) {
    facts.forEach(function (fact) {
        console.log(chalk.inverse(fact));
    });
});
