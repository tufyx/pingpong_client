app.controller('FixturesController', function($scope,$http,$routeParams){
	this.rounds = null;
  
	this.getMatches = function(stage){
		var url = API_URL + "/matches"
		if (stage) {
			url += "&stage=" + stage; 
		}
		this.rounds = new Array();
		$http.get(url)
	    	.success(function(data, status, headers, config) {
	    		this.rounds = data['response']
	    	}.bind(this))
	    	.error(function(data, status, headers, config) {
	    		console.log(config);
	    	}.bind(this));  
	}
  
  	this.getMatches();
  });