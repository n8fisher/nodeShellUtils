#!/usr/bin/env node

require('./helper')
//let ls = require('./ls')

let _ = require('lodash');
let fs = require('fs').promise
let path = require('path')
let co = require('co')
let recursive =false
let dir = process.argv[2]

if (process.argv[2] == '-r'){
	recursive=true
	dir=process.argv[3]
}

var deleteFolderRecursive = function(path) {
  
};

let rm = co.wrap(function*  (rootPath) {
	let stat = yield fs.stat(rootPath)
	 if (stat) {
		let fileNames = yield fs.readdir(rootPath)  
    	for (let file of fileNames ) {
        	let filePath = path.join(rootPath, file) 
        	let stat = yield fs.stat(filePath)
        	if(stat.isDirectory()) { 
             	rm(filePath);
          	} else { 
            	fs.unlink(filePath);
        	}
       	}
       	fs.rmdir(rootPath)
    } 
     
 })

rm = co.wrap(rm)
function* main(){
	rm(dir)
}

module.exports = main