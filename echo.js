#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise


function* echo() {
		//Let's get only the third element to the end of the array
		//...then print with space seperators
		//As a note, this has several issue. For example whitespace is not preserved
		//http://stackoverflow.com/questions/24874084/getting-raw-command-line-arguments-in-node-js
       console.log(process.argv.slice(2,process.argv.length).join(' '))
}

module.exports = echo
