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


let ls = co.wrap(function*  (rootPath) {
 	let fileNames = yield fs.readdir(rootPath)  

 	let lsPromises = []
	for (let fileName of fileNames) {	
    	let filePath = path.join(rootPath, fileName)  
    	let stat = yield fs.stat(filePath)
  		lsPromises.push(filePath)
  		if(stat.isDirectory()==true && recursive){
  			let promise = ls(filePath)
  			lsPromises.push(promise)	
  		}
  	}
  	return yield Promise.all(lsPromises)
  })

function printDirs(filePaths){
	for ( let el of _.flattenDeep(filePaths)){
		console.log(el)
	}
}

ls = co.wrap(ls)
function* main(){
	let filePaths = yield ls(dir)
	printDirs(filePaths)
}

module.exports = main


