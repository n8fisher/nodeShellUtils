#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise


function* echo() {
       //console.log(yield fs.readFile(__filename, console.log))
       console.log(process.argv.slice(2,process.argv.length).join(' '))
}

module.exports = echo
