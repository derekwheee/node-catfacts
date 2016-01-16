var chalk = require('chalk');
var Catfacts = require('../catfacts');

Catfacts.random(5, function (facts) {
    facts.forEach(function (fact) {
        console.log(chalk.inverse(fact));
    });
});
