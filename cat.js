#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise

function* cat (){
		fs.readFile(process.argv[2], (err, contents) => {	
  			console.log(contents);	
		});
}

module.exports = cat
