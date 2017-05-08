#!/usr/bin/env node
const rotation = require('./rotation')
const argv = require('minimist')(process.argv.slice(2))
console.log(rotation(argv))
