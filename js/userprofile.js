app.controller('UserProfileController', function($scope,$http,$routeParams){
	this.player = null;
  
	this.getPlayer = function(){
		var url = API_URL + "/user/" + $routeParams['userID'];
		$http.get(url)
	    	.success(function(data, status, headers, config) {
	    		this.player = data['user'];
	    	}.bind(this))
	    	.error(function(data, status, headers, config) {
	    		console.log(config);
	    	}.bind(this));  
	}
  
  	this.getPlayer();
  });