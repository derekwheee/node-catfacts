# catfacts

Catfacts is a command line tool for retrieving and sending cat facts.

> While many cats enjoy milk, it will give some cats diarrhea.

*Sending cat facts via SMS requires a Twilio account*

## Installation

Install catfacts as a global module via npm

```bash
npm install catfacts -g
```

## Usage

You can get help with the CLI at any time by running `catfacts -h`.

#### `catfacts setup|s`

Interactive interface for setting up Twilio credentials

*Sending cat facts via SMS requires a Twilio account*

#### `catfacts random|r [options]`

Get a random cat fact.

**Options:**
`-t, --text <number|name>` Send cat fact via SMS

#### `catfacts phonebook|p <cmd>`

Perform actions on the phonebook

**Commands:**

`read` Show all phonebook entries

`add` Interactively add a new phonebook entry

## Using `catfacts` Programmatically

`catfacts` can also be used programmitically.

```js
var chalk = require('chalk');
var Catfacts = require('../catfacts');

Catfacts.random(5, function (facts) {
    facts.forEach(function (fact) {
        console.log(chalk.inverse(fact));
    });
});
```
