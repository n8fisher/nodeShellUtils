#!/usr/bin/env node

require('./helper')

let _ = require('lodash');
let fs = require('fs').promise
let path = require('path')
let co = require('co')
let recursive =false
let dir = process.argv[2]

if (process.argv[2] == '-R'){
	recursive=true
	dir=process.argv[3]
}

let startDir =process.cwd()

let mkdir = co.wrap(function*  (paths) {
	for (let curToken of paths){
		if(curToken=="." && curToken =="/"){
			continue	
		}
		let dir = yield fs.mkdir(curToken)
		process.chdir(curToken)
	}	
	process.chdir(startDir)
  })


mkdir = co.wrap(mkdir)
function* main(){
	//Split input into an array
	//pass array to the function
	let paths = dir.split("/")
	mkdir(paths)
}

module.exports = main