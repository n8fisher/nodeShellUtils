#!/usr/bin/env node --use_strict

require('./helper')
let fs = require('fs').promise

function* touch (){
 	//If file exists update mtime
  	let file = process.argv[2]
  	let exists =  yield fs.access(file,fs.F_OK, (err,stats)=>{
  				if(err){
  					fs.writeFile(process.argv[2],'', (err) => {
  						console.log(err)
					});
  				}else
  				{
  					fs.open(file,'r', (err,fd) =>{
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
	
}

module.exports = touch