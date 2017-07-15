	// console.log('process.env.NODE_ENV',process.env.NODE_ENV );
	// console.log('process.env',process.env);
	// console.log('process',process);
	
	const apiurl = function() {
		if( process.env.NODE_ENV == 'development') {
			// console.log(process.env.NODE_ENV );
		  	return 'http://127.0.0.1:8000/services/'
		 } else {
			// console.log(process.env.NODE_ENV );
		  	return '/services/'
		 }
	 }

	const configs = {
		API : apiurl()
	}

	// console.log(configs);

	export default configs;