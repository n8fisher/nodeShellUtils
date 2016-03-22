#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise
let co = require('co')




let touch =  co.wrap(function*  (){
 	//If file exists update mtime
  	let file = process.argv[2]
  	let exists = false
  	try{
		exists = yield fs.access(path, fs.F_OK)	
	}catch(ex){
		exists=false
	}
	let fd = 0
  	if(exists){
  		let stat =  yield fs.stat(file)
  		if(stat.isDirectory){
  			return 
  		}else{
  			fd  = yield fs.open(file,'r')
  		}
  	}else{
  		fd  = yield fs.open(file,'w')
  	}
	
	fs.futimes(fd, new Date().getTime(), new Date().getTime(), (err)=>{
		if(err){
			console.log(err)
		}
	})
	fs.close(fd,(err) =>{
		if(err){
			console.log(err)
		}
	})
	
})
	
touch = co.wrap(touch)
function * main(){
	let touched = yield touch()
}

module.exports = main
