#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise
let co = require('co')

let cat = co.wrap( function* () {
		let contents = yield  fs.readFile(process.argv[2], "UTF8",function (err, contents)  {	
			if (err){
				console.log(err)
			}else {
				return contents
			}
		})
		console.log(contents)
})

co = co.wrap(cat)
function* main(){
	let noop = yield cat() 
}

module.exports = main
