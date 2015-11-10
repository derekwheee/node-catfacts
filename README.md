# catfacts

Catfacts is a command line tool for retrieving and sending cat facts.

> While many cats enjoy milk, it will give some cats diarrhea.

## Installation

Install catfacts as a global module via npm

```bash
npm install catfacts -g
```

## Usage

You can get help with the CLI at any time by running `catfacts -h`.

#### `catfacts setup|s`

Interactive interface for setting up Twilio credentials

#### `catfacts random|r [options]`

Get a random cat fact.

**Options:**
`t, --text <number>` Send cat fact via SMS
