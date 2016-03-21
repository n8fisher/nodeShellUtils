#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise
let co = require('co')


let touch =  co.wrap(function*  (){
 	//If file exists update mtime
  	let file = process.argv[2]
  	let exists =  yield fs.access(file,fs.F_OK, function* (err,stats){
  				if(err){
  					fs.writeFile(process.argv[2],'', function* (err) {
  						console.log(err)
					})
  				}else
  				{
  					let f  = yield fs.open(file,'r', (err,fd) =>{
			   			if (!Date.now) {
		  					Date.now = function() { return new Date().getTime(); }
			 			}
						fs.futimes(fd, Date.now, Date.now, (err)=>{
							console.log(err)
						})
						fs.close(fd,(err) =>{
							console.log(err)
						})
					})
  				}
	})
})
	
touch = co.wrap(touch)
function * main(){
	let touched = yield touch()
}

module.exports = main
