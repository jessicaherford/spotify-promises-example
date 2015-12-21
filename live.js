var request = require('request');
var promise1 = new Promise(promiseExec);

function promiseExec(resolve, reject) {
	setTimeout(function(){
		resolve("This is some data. :)");
	}, 1000);

	reject("BOOOOO rejected");
}

promise1.then(resolvedYay, rejectedBOO);
promise1.catch(function(data) {
	console.log("CAAAAATCH!!!!!");
	console.log(data);
})

function resolvedYay(data) {
	console.log("resolved: ", data);
}

function rejectedBOO(data) {
	console.log("rejected: ", data);
}

var promise2 = promisifyGet('http://www.etsy.com');
var promise3 = promise2.then(function(data) {
	console.log(data.body);
})
promise3.catch(function(error) {
	console.log(error);
	console.log("BAD BAD BAD");
});

function promisifyGet(url) {
	return new Promise(function(resolve, reject) {
		
		request(url, function(error, response, body){

			if(error) {
				reject(error);
			}
			else if(response.statusCode !== 200) {
				reject(response);
			}
			else {
				resolve(response);
			}
		}); // END OF THE CALLBACK FOR REQUEST
	}); // END OF THE PROMISE CONSTRUCTOR
}



// setTimeout(function(){
// 	console.log("THis is some data :)");
// }, 1000); 